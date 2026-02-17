<?php

require('lib/utilities.php');
jsonHeader();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exitWith(400, "Bad request");
}
$input = json_decode(file_get_contents('php://input'), true);
$team = $input['team'] ?? null;
$firstname = $input['firstname'] ?? null;
$lastname = $input['lastname'] ?? null;
$email = $input['email'] ?? null;
$mobile = $input['mobile'] ?? null;
if (!isNonEmptyString($team) || !isValidEmail($email)) {
    exitWith(400, "Invalid content", "invalid");
}
$token = bin2hex(random_bytes(16));
$config = require('lib/config.php');
try {
    $dbconn = require('lib/dbconnect.php');
    if (!checkExistingTeam($dbconn, $team)) {
        exitWith(400, "Team name already exists", "existingTeam");
    }
    if (!checkExistingEmail($dbconn, $email)) {
        exitWith(400, "E-mail address already in use", "existingEmail");
    }
    $teamId = addTeamEntry($dbconn, $team, $firstname, $lastname, $email, $mobile, $token);
    addTeamLogEntry($dbconn, $teamId, "created", $team, $firstname, $lastname, $email, $mobile);

} catch (Exception $e) {
    error_log($e);
    exitWith(500, "Internal server error");
}
http_response_code(200);
echo jsonEncodeUTF8(["message" => "success"]);

function checkExistingTeam($dbconn, $team)
{
    $sql = "SELECT COUNT(*) FROM teams WHERE `team` = ?";
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$team]);
    return $stmt->fetchColumn() === 0;
}

function checkExistingEmail($dbconn, $email)
{
    $sql = "SELECT COUNT(*) FROM teams WHERE `email` = ?";
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$email]);
    return $stmt->fetchColumn() === 0;
}

function addTeamEntry($dbconn, $team, $firstname, $lastname, $email, $mobile, $token)
{
    $sql = "INSERT INTO teams (`team`, `firstname`, `lastname`, `email`, `mobile`, `token`) VALUES (?,?,?,?,?,?)";
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$team, $firstname, $lastname, $email, $mobile, $token]);
    return $dbconn->lastInsertId();
}

function addTeamLogEntry($dbconn, $teamId, $action, $team, $email, $firstname, $lastname, $mobile)
{
    $sql = "INSERT INTO teams_log (`team_id`, `action`, `team`, `firstname`, `lastname`, `email`, `mobile`) VALUES (?,?,?,?,?,?,?)";
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$teamId, $action, $team, $firstname, $lastname, $email, $mobile]);
}