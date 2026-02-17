<?php

require('lib/utilities.php');
jsonHeader();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    exitWith(400, "Bad request");
}
$config = require('lib/config.php');
try {
    $dbconn = require('lib/dbconnect.php');
    $sql = "SELECT `team` FROM teams";
    $data = $dbconn->query($sql)->fetchAll(PDO::FETCH_COLUMN);
} catch (Exception $e) {
    error_log($e);
    exitWith(500, "Internal server error");
}
echo jsonEncodeUTF8($data);
