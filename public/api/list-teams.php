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
    return prepare_lists($names);
}

function prepare_lists($teams)
{
    $confirmed = [];
    $waitinglist = [];
    $count = count($teams);
    for ($index = 0; $index < $count; $index++) {
        $rank = $index + 1;
        $team = $teams[$index];
        if (is_in_waiting_list($rank)) {
            array_push($waitinglist, $team);
        } else {
            array_push($confirmed, $team);
        }
    }
    return ['confirmed' => $confirmed, 'waitinglist' => $waitinglist];
}
