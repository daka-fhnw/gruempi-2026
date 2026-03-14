<?php

function header_json()
{
    header('Content-Type: application/json');
}

function json_decode_request_data()
{
    return json_decode(file_get_contents('php://input'), true);
}

function json_response($data, $code = 200)
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

function exit_with($code, $message, $error_id = null)
{
    json_response($error_id !== null
        ? ['message' => $message, 'errorId' => $error_id]
        : ['message' => $message], $code);
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
    if (is_string($data)) {
        $split = explode('-', $data);
        if (
            count($split) === 2
            && strlen($split[0]) !== 0
            && strlen($split[1]) !== 0
        ) {
            return $split;
        }
    }
    return [null, null];
}

function trim_to_null($data)
{
    if (is_string($data)) {
        $trimmed = trim($data);
        if (strlen($trimmed) === 0) {
            return null;
        }
        return $trimmed;
    }
    return $data;
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

function check_team_exists($dbconn, $id, $token)
{
    $sql = 'SELECT COUNT(*) FROM `teams` WHERE `id`=? AND `token`=? LIMIT 1';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$id, $token]);
    return $stmt->fetchColumn() !== 0;
}

function add_team_log_entry($dbconn, $id, $action, $data = [])
{
    $sql = 'INSERT INTO teams_log (`team_id`, `action`, `team`, `firstname`, `lastname`, `email`, `mobile`) VALUES (?,?,?,?,?,?,?)';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([
        $id,
        $action,
        $data['team'] ?? null,
        $data['firstname'] ?? null,
        $data['lastname'] ?? null,
        $data['email'] ?? null,
        $data['mobile'] ?? null
    ]);
}

function log_app_error($severity, $context, $message)
{
    $timestamp = new DateTime();
    $timestamp = $timestamp->format("Y-m-d H:i:s");
    $text = "$timestamp $severity [$context]: $message\n";
    $path = '../../logs/app_error.log';
    error_log($text, 3, $path);
}

function is_in_waiting_list($index)
{
    return ($index + 1) > 20;
}
