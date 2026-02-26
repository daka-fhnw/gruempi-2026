<?php

require('lib/utilities.php');
header_json();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    exit_with(400, 'Bad request');
}
try {
    $dbconn = db_connect();
    $data = load_teams($dbconn);
    http_response_code(200);
    echo json_encode_unescaped($data);
} catch (Exception $e) {
    error_log($e);
    exit_with(500, 'Internal server error');
}

function load_teams($dbconn)
{
    $sql = 'SELECT `team` FROM teams WHERE `verified_at` IS NOT NULL ORDER BY `verified_at` ASC';
    $stmt = $dbconn->query($sql);
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
}
