<?php

require('lib/utilities.php');
jsonHeader();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exitWith(400, "Bad request");
}
$input = json_decode(file_get_contents('php://input'), true);
$team = $input['team'] ?? null;
$email = $input['email'] ?? null;
if (!isNonEmptyString($team) || !isValidEmail($email)) {
    exitWith(400, "Invalid content");
}
$token = bin2hex(random_bytes(16));
$config = require('lib/config.php');
try {
    $dbconn = require('lib/dbconnect.php');
    $sql = "INSERT INTO teams (name, email, token) VALUES (?,?,?)";
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$team, $email, $token]);
} catch (Exception $e) {
    error_log($e);
    exitWith(500, "Internal server error");
}
http_response_code(200);
echo json_encode(["team" => $team, "email" => $email]);
