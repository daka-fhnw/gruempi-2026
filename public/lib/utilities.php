<?php

function header_json()
{
    header("Content-Type: application/json");
}

function json_encode_unescaped($data)
{
    return json_encode($data, JSON_UNESCAPED_UNICODE);
}

function exit_with($code, $message, $errorId = null)
{
    http_response_code($code);
    echo json_encode_unescaped(["message" => $message, "errorId" => $errorId]);
    exit();
}

function is_non_empty_string($value)
{
    return isset($value) && is_string($value) && $value !== '';
}

function is_valid_email($value)
{
    return is_non_empty_string($value) && filter_var($value, FILTER_VALIDATE_EMAIL);
}

function db_connect()
{
    $config = require('lib/config.php');
    return new PDO(
        "mysql:host={$config['db.host']};dbname={$config['db.name']};charset=utf8mb4",
        $config['db.user'],
        $config['db.pass']
    );
}
