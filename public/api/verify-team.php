<?php

require('lib/utilities.php');
header_json();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit_with(400, 'Bad request');
}
$input = json_decode_request_data();
[$id, $token] = split_id_token($input['token'] ?? null);
if ($id === null || $token === null) {
    exit_with(400, 'Bad request');
}
try {
    $dbconn = db_connect();
    if (!check_team_exists($dbconn, $id, $token)) {
        exit_with(400, 'Bad request');
    }
    verify_team($dbconn, $id);
    add_team_log_entry($dbconn, $id, 'verified');
    json_response(['message' => 'Team verified']);
} catch (Exception $e) {
    log_app_error('ERROR', 'get-team', $e);
    exit_with(500, 'Internal server error');
}

function verify_team($dbconn, $id)
{
    $sql = 'UPDATE `teams` SET `verified_at`=CURRENT_TIMESTAMP WHERE `id`=? AND `verified_at` IS NULl';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$id]);
}
