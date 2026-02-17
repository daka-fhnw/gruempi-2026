<?php

return new PDO(
    "mysql:host={$config['db.host']};dbname={$config['db.name']};charset=utf8mb4",
    $config['db.user'],
    $config['db.pass']
);
