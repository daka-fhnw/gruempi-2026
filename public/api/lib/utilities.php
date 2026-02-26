<?php

function header_json()
{
    header('Content-Type: application/json');
}

function json_encode_unescaped($data)
{
    return json_encode($data, JSON_UNESCAPED_UNICODE);
}

function exit_with($code, $message, $error_id = null)
{
    http_response_code($code);
    echo json_encode_unescaped(
        isset($error_id)
        ? ['message' => $message, 'errorId' => $error_id]
        : ['message' => $message]
    );
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

function join_id_token($id, $token)
{
    return "$id-$token";
}

function split_id_token($data)
{
    $split = explode('-', $data);
    if (count($split) === 2) {
        return $split;
    }
    return [null, null];
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

function remove_expired_teams($dbconn)
{
    $sql = 'DELETE FROM `teams` WHERE `verified_at` IS NULL AND TIMESTAMPDIFF(HOUR, `created_at`, CURRENT_TIMESTAMP) > 24';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute();
}
