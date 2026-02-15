<?php

require('lib/utilities.php');
jsonHeader();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    exitWith(400, "Bad request");
}
$config = require('lib/config.php');
try {
    $dbconn = require('lib/dbconnect.php');
    $sql = "SELECT name FROM teams";
    $result = $dbconn->query($sql);
    $data = [];
    while ($row = $result->fetch()) {
        array_push($data, ['name' => $row['name']]);
    }
} catch (Exception $e) {
    error_log($e);
    exitWith(500, "Internal server error");
}
echo json_encode($data);
