<?php
return [
  'db' => [
    'host' => 'localhost',
    'name' => 'DB_NAME',
    'user' => 'DB_USER',
    'pass' => 'DB_PASS',
    'charset' => 'utf8mb4',
  ],
  'jwt_secret' => 'CHANGE_ME_TO_A_LONG_RANDOM_SECRET',
  'jwt_ttl' => 60 * 60 * 24 * 7,
  'base_url' => 'https://mangosorange.com',
  'uploads_dir' => __DIR__ . '/../uploads/resumes',
  'uploads_url' => 'https://mangosorange.com/uploads/resumes',
  'mail_to' => 'hr@mangosorange.com, recruiter@mangosorange.com',
  'mail_from' => 'no-reply@mangosorange.com',
  'allowed_origins' => [
    'https://mangosorange.com',
    'https://www.mangosorange.com',
  ],
];
