<?php
require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  require_auth();
  $jobId = $_GET['job_id'] ?? ($_GET['jobId'] ?? null);
  $general = $_GET['general'] ?? null;

  $sql = 'SELECT a.*, j.title AS job_title FROM applicants a LEFT JOIN job_postings j ON a.job_id = j.id';
  $params = [];

  if ($general === '1') {
    $sql .= ' WHERE a.job_id IS NULL';
  } elseif ($jobId) {
    $sql .= ' WHERE a.job_id = ?';
    $params[] = $jobId;
  }

  $sql .= ' ORDER BY a.applied_at DESC';

  $stmt = db()->prepare($sql);
  $stmt->execute($params);
  json_response($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method === 'POST') {
  $body = get_json_body();

  $jobId = $body['job_id'] ?? ($body['jobId'] ?? null);
  $stmt = db()->prepare('INSERT INTO applicants (job_id, name, email, phone, resume_url, cover_letter, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
  $stmt->execute([
    $jobId ?: null,
    $body['name'] ?? '',
    $body['email'] ?? '',
    $body['phone'] ?? '',
    $body['resume_url'] ?? ($body['resumeUrl'] ?? ''),
    $body['cover_letter'] ?? ($body['coverLetter'] ?? ''),
    $body['status'] ?? 'Applied',
  ]);

  // Sanitize input for email
  $name = htmlspecialchars(trim($body['name'] ?? ''), ENT_QUOTES, 'UTF-8');
  $email = filter_var(trim($body['email'] ?? ''), FILTER_SANITIZE_EMAIL);
  $phone = htmlspecialchars(trim($body['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
  $resume = htmlspecialchars(trim($body['resume_url'] ?? ($body['resumeUrl'] ?? '')), ENT_QUOTES, 'UTF-8');
  $isGeneral = empty($jobId);
  $jobTitle = '';
  if (!$isGeneral) {
    try {
      $jobStmt = db()->prepare('SELECT title FROM job_postings WHERE id = ?');
      $jobStmt->execute([$jobId]);
      $jobRow = $jobStmt->fetch(PDO::FETCH_ASSOC);
      $jobTitle = $jobRow ? htmlspecialchars($jobRow['title'], ENT_QUOTES, 'UTF-8') : '';
    } catch (Exception $e) {
      $jobTitle = '';
    }
  }

  // Validate email if provided
  if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Invalid email format'], 400);
  }

  $to = $config['mail_to'];
  $subject = $isGeneral
    ? 'Resume Drop - New Candidate Application (MangosOrange)'
    : 'Job Application - New Candidate (MangosOrange)';

  $message = "You received a new application on MangosOrange:\n\n";
  $message .= "Name: $name\n";
  $message .= "Email: $email\n";
  $message .= "Phone: $phone\n";
  $message .= "Resume: $resume\n";
  if (!$isGeneral && $jobTitle) {
    $message .= "Job Title: $jobTitle\n";
  }
  $message .= "Application Type: " . ($isGeneral ? 'General Interest / Resume Drop' : 'Job Application') . "\n";

  // Email headers
  $headers = "From: {$config['mail_from']}\r\n";
  if ($email) {
    $headers .= "Reply-To: $email\r\n";
  }

  @mail($to, $subject, $message, $headers);

  json_response(['success' => true]);
}

if ($method === 'PUT') {
  require_auth();
  $body = get_json_body();
  $id = $body['id'] ?? null;
  if (!$id) json_response(['error' => 'ID required'], 400);

  $stmt = db()->prepare('UPDATE applicants SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?');
  $stmt->execute([
    $body['status'] ?? 'Applied',
    $body['notes'] ?? '',
    $id,
  ]);

  json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
