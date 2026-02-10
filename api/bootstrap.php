<?php
$config = require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'], true)) {
  header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit;
}

function json_response($data, $status = 200) {
  http_response_code($status);
  echo json_encode($data);
  exit;
}

function get_json_body() {
  $raw = file_get_contents('php://input');
  return $raw ? json_decode($raw, true) : [];
}

function db() {
  global $config;
  static $pdo = null;
  if ($pdo) return $pdo;

  $dsn = "mysql:host={$config['db']['host']};dbname={$config['db']['name']};charset={$config['db']['charset']}";
  $pdo = new PDO($dsn, $config['db']['user'], $config['db']['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  ]);
  return $pdo;
}

function base64url_encode($data) {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
  return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_encode($payload, $secret) {
  $header = ['alg' => 'HS256', 'typ' => 'JWT'];
  $segments = [
    base64url_encode(json_encode($header)),
    base64url_encode(json_encode($payload)),
  ];
  $signing_input = implode('.', $segments);
  $signature = hash_hmac('sha256', $signing_input, $secret, true);
  $segments[] = base64url_encode($signature);
  return implode('.', $segments);
}

function jwt_decode($token, $secret) {
  $parts = explode('.', $token);
  if (count($parts) !== 3) return null;

  [$h, $p, $s] = $parts;
  $signature = base64url_decode($s);
  $valid = hash_hmac('sha256', "$h.$p", $secret, true);

  if (!hash_equals($valid, $signature)) return null;

  $payload = json_decode(base64url_decode($p), true);
  if (!$payload) return null;

  if (isset($payload['exp']) && time() > $payload['exp']) return null;
  return $payload;
}

function get_bearer_token() {
  $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  if (preg_match('/Bearer\s(\S+)/', $auth, $matches)) {
    return $matches[1];
  }
  return null;
}

function require_auth() {
  global $config;
  $token = get_bearer_token();
  if (!$token) json_response(['error' => 'Unauthorized'], 401);

  $payload = jwt_decode($token, $config['jwt_secret']);
  if (!$payload) json_response(['error' => 'Invalid token'], 401);

  return $payload;
}
