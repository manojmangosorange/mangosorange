<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

if (!isset($_FILES['file'])) {
  json_response(['error' => 'No file uploaded'], 400);
}

$file = $_FILES['file'];
if ($file['size'] > 5 * 1024 * 1024) {
  json_response(['error' => 'File too large'], 400);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowed = ['pdf', 'doc', 'docx'];
if (!in_array($ext, $allowed, true)) {
  json_response(['error' => 'Invalid file type'], 400);
}

if (!is_dir($config['uploads_dir'])) {
  mkdir($config['uploads_dir'], 0755, true);
}

$filename = time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
$dest = rtrim($config['uploads_dir'], '/') . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
  json_response(['error' => 'Upload failed'], 500);
}

$url = rtrim($config['uploads_url'], '/') . '/' . $filename;
json_response(['url' => $url]);
