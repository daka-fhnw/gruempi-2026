<?php

require('lib/utilities.php');
header_json();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    exit_with(400, 'Bad request');
}
try {
    $dbconn = db_connect();
    $teams = load_teams($dbconn);
    json_response($teams);
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

function prepare_lists($names)
{
    $confirmed = [];
    $waitinglist = [];
    $count = count($names);
    for ($index = 0; $index < $count; $index++) {
        $name = $names[$index];
        if (is_in_waiting_list($index)) {
            array_push($waitinglist, $name);
        } else {
            array_push($confirmed, $name);
        }
    }
    return ['confirmed' => $confirmed, 'waitinglist' => $waitinglist];
}
