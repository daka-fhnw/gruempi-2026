<?php

require('lib/utilities.php');
header_json();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit_with(400, 'Bad request');
}
$data = extract_data();
if ($data['id'] === null || $data['token'] === null) {
    exit_with(400, 'Bad request');
}
try {
    $dbconn = db_connect();
    remove_expired_teams($dbconn);
    if (!check_team_exists($dbconn, $data)) {
        exit_with(400, 'Bad request');
    }
    delete_team($dbconn, $data);
    add_team_log_entry($dbconn, $data['id'], 'deleted');
    http_response_code(200);
    echo json_encode_unescaped(['message' => 'Team deleted']);
} catch (Exception $err) {
    error_log($err);
    exit_with(500, 'Internal server error');
}

function extract_data()
{
    $input = json_decode(file_get_contents('php://input'), true);
    [$id, $token] = split_id_token($input['token'] ?? null);
    return ['id' => $id, 'token' => $token];
}

function check_team_exists($dbconn, $data)
{
    $sql = 'SELECT COUNT(*) FROM `teams` WHERE `id`=? AND `token`=? LIMIT 1';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['id'], $data['token']]);
    return $stmt->fetchColumn() !== 0;
}

function delete_team($dbconn, $data)
{
    $sql = 'DELETE FROM `teams` WHERE `id`=? AND `token`=?';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['id'], $data['token']]);
}
