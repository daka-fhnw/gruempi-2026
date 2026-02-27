<?php

require('lib/utilities.php');
header_json();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit_with(400, 'Bad request');
}
$data = extract_data();
if ($data['id'] === null || $data['token'] === null) {
    exit_with(400, 'Bad request');
}
if (!check_data($data)) {
    exit_with(400, 'Invalid content', 'invalid');
}
try {
    $dbconn = db_connect();
    remove_expired_teams($dbconn);
    if (!check_team_exists($dbconn, $data)) {
        exit_with(400, 'Bad request');
    }
    if (!check_existing_team($dbconn, $data)) {
        exit_with(400, 'Team name already exists', 'existingTeam');
    }
    if (!check_existing_email($dbconn, $data)) {
        exit_with(400, 'E-mail address already in use', 'existingEmail');
    }
    update_team($dbconn, $data);
    add_team_log_entry($dbconn, $data['id'], 'edited', $data);
    http_response_code(200);
    echo json_encode_unescaped(['message' => 'Team updated']);
} catch (Exception $err) {
    error_log($err);
    exit_with(500, 'Internal server error');
}

function extract_data()
{
    $input = json_decode(file_get_contents('php://input'), true);
    [$id, $token] = split_id_token($input['token'] ?? null);
    return [
        'id' => $id,
        'token' => $token,
        'team' => trim_to_null($input['team'] ?? null),
        'firstname' => trim_to_null($input['firstname'] ?? null),
        'lastname' => trim_to_null($input['lastname'] ?? null),
        'email' => trim_to_null($input['email'] ?? null),
        'mobile' => trim_to_null($input['mobile'] ?? null),
    ];
}

function check_data($data)
{
    return is_non_empty_string($data['team'])
        && is_non_empty_string($data['firstname'])
        && is_non_empty_string($data['lastname'])
        && is_valid_email($data['email']);
}

function check_team_exists($dbconn, $data)
{
    $sql = 'SELECT COUNT(*) FROM `teams` WHERE `id`=? AND `token`=? LIMIT 1';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['id'], $data['token']]);
    return $stmt->fetchColumn() !== 0;
}

function check_existing_team($dbconn, $data)
{
    $sql = 'SELECT COUNT(*) FROM `teams` WHERE `team`=? AND `id`!=?';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['team'], $data['id']]);
    return $stmt->fetchColumn() === 0;
}

function check_existing_email($dbconn, $data)
{
    $sql = 'SELECT COUNT(*) FROM `teams` WHERE `email`=? AND `id`!=?';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['email'], $data['id']]);
    return $stmt->fetchColumn() === 0;
}

function update_team($dbconn, $data)
{
    $sql = 'UPDATE `teams` SET `team`=?, `firstname`=?, `lastname`=?, `email`=?, `mobile`=? WHERE `id`=? AND `token`=?';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['team'], $data['firstname'], $data['lastname'], $data['email'], $data['mobile'], $data['id'], $data['token']]);
}
