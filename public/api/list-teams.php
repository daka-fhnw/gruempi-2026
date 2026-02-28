<?php

require('lib/utilities.php');
header_json();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    exit_with(400, 'Bad request');
}
try {
    $dbconn = db_connect();
    $teams = load_teams($dbconn);
    http_response_code(200);
    echo json_encode_unescaped($teams);
} catch (Exception $e) {
    log_app_error('ERROR', 'list-teams', $e);
    exit_with(500, 'Internal server error');
}

function load_teams($dbconn)
{
    $sql = 'SELECT `team` FROM teams WHERE `verified_at` IS NOT NULL ORDER BY `verified_at` ASC';
    $stmt = $dbconn->query($sql);
    $names = $stmt->fetchAll(PDO::FETCH_COLUMN);
    return prepare_list($names);
}

function prepare_list($names)
{
    $teams = [];
    $count = count($names);
    for ($index = 0; $index < $count; $index++) {
        $rank = $index + 1;
        $team = [
            'team' => $names[$index],
            'waitinglist' => is_in_waiting_list($rank),
        ];
        array_push($teams, $team);
    }
    return $teams;
}