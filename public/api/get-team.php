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
    $team = load_team($dbconn, $id, $token);
    if (!$team) {
        exit_with(400, 'Bad request');
    }
    if ($team['verified_at'] === null) {
        verify_team($dbconn, $id);
        add_team_log_entry($dbconn, $id, 'verified');
    }
    unset($team['verified_at']);
    http_response_code(200);
    echo json_encode_unescaped($team);
} catch (Exception $err) {
    error_log($err);
    exit_with(500, 'Internal server error');
}
function load_team($dbconn, $id, $token)
{
    $sql = 'SELECT `team`, `email`, `firstname`, `lastname`, `mobile`, `verified_at` FROM teams WHERE `id`=? AND `token`=? LIMIT 1';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$id, $token]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function verify_team($dbconn, $id)
{
    $sql = 'UPDATE teams SET `verified_at`=CURRENT_TIMESTAMP WHERE `id`=? AND `verified_at` IS NULL';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$id]);
}
