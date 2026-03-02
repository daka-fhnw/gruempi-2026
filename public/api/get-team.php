<?php

require('lib/utilities.php');
header_json();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    exit_with(400, 'Bad request');
}
[$id, $token] = split_id_token($_GET['token'] ?? null);
if ($id === null || $token === null) {
    exit_with(400, 'Bad request');
}
try {
    $dbconn = db_connect();
    $data = load_team($dbconn, $id, $token);
    if (!$data) {
        exit_with(400, 'Bad request');
    }
    handle_verified($data);
    handle_waiting_list($dbconn, $id, $data);
    json_response($data);
} catch (Exception $e) {
    log_app_error('ERROR', 'get-team', $e);
    exit_with(500, 'Internal server error');
}

function load_team($dbconn, $id, $token)
{
    $sql = 'SELECT `team`, `email`, `firstname`, `lastname`, `mobile`, `verified_at` FROM `teams` WHERE `id`=? AND `token`=? LIMIT 1';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$id, $token]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function handle_verified(&$data)
{
    $data['verified'] = ($data['verified_at'] !== null);
    unset($data['verified_at']);
    return $data['verified'];
}

function handle_waiting_list($dbconn, $id, &$data)
{
    $sql = 'SELECT `id` FROM `teams` WHERE `id`=? AND `verified_at` IS NOT NULL ORDER BY `verified_at` ASC';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$id]);
    $ids = $stmt->fetchAll(PDO::FETCH_COLUMN);
    $index = array_search($id, $ids);
    if ($index === false) {
        $index = 0;
    }
    $data['waitinglist'] = is_in_waiting_list($index);
}
