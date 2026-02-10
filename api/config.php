<?php
return [
  'db' => [
    'host' => 'localhost',
    'name' => 'ehardco1_career_db_demo_pulkit',
    'user' => 'ehardco1_demo_user_pulkit',
    'pass' => 'CHANGE_ME',
    'charset' => 'utf8mb4',
  ],
  'jwt_secret' => 'CHANGE_ME_TO_A_LONG_RANDOM_SECRET',
  'jwt_ttl' => 60 * 60 * 24 * 7,
  'base_url' => 'https://skirpl.co.in',
  'uploads_dir' => __DIR__ . '/../uploads/resumes',
  'uploads_url' => 'https://skirpl.co.in/uploads/resumes',
  'mail_to' => 'info@mangosorange.com',
  'mail_from' => 'no-reply@skirpl.co.in',
  'allowed_origins' => [
    'https://skirpl.co.in',
    'https://www.skirpl.co.in'
  ],
];
