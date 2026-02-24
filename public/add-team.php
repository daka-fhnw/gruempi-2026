<?php

require('lib/utilities.php');
header_json();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit_with(400, 'Bad request');
}
$data = extract_data();
if (!check_data($data)) {
    exit_with(400, 'Invalid content', 'invalid');
}
$data['token'] = generate_token();
try {
    $dbconn = db_connect();
    remove_expired($dbconn);
    if (!check_existing_team($dbconn, $data)) {
        exit_with(400, 'Team name already exists', 'existingTeam');
    }
    if (!check_existing_email($dbconn, $data)) {
        exit_with(400, 'E-mail address already in use', 'existingEmail');
    }
    $data['id'] = add_team_entry($dbconn, $data);
    $data['link'] = "https://grümpi.ch/team/{$data['id']}-{$data['token']}";
    add_team_log_entry($dbconn, $data, 'created');
    if (!send_registered_email($data)) {
        throw new RuntimeException("Sending email to {$data["email"]} failed");
    }
} catch (Exception $err) {
    error_log($err);
    exit_with(500, 'Internal server error');
}
http_response_code(200);
echo json_encode_unescaped(['message' => 'Team successfully added']);

function extract_data()
{
    $input = json_decode(file_get_contents('php://input'), true);
    return [
        'team' => $input['team'] ?? null,
        'firstname' => $input['firstname'] ?? null,
        'lastname' => $input['lastname'] ?? null,
        'email' => $input['email'] ?? null,
        'mobile' => $input['mobile'] ?? null,
    ];
}
function check_data($data)
{
    return is_non_empty_string($data['team'])
        && is_non_empty_string($data['firstname'])
        && is_non_empty_string($data['lastname'])
        && is_valid_email($data['email']);
}

function remove_expired($dbconn)
{
    $sql = 'DELETE FROM `teams` WHERE `verified_at` IS NULL AND TIMESTAMPDIFF(HOUR, `created_at`, CURRENT_TIMESTAMP) > 24';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute();
}

function check_existing_team($dbconn, $data)
{
    $sql = 'SELECT COUNT(*) FROM teams WHERE `team` = ?';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['team']]);
    return $stmt->fetchColumn() === 0;
}

function check_existing_email($dbconn, $data)
{
    $sql = 'SELECT COUNT(*) FROM teams WHERE `email` = ?';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['email']]);
    return $stmt->fetchColumn() === 0;
}

function generate_token()
{
    $chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    $charCount = strlen($chars);
    $token = '';
    for ($i = 0; $i < 32; $i++) {
        $token .= $chars[random_int(0, $charCount - 1)];
    }
    return $token;
}

function add_team_entry($dbconn, $data)
{
    $sql = 'INSERT INTO teams (`team`, `firstname`, `lastname`, `email`, `mobile`, `token`) VALUES (?,?,?,?,?,?)';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['team'], $data['firstname'], $data['lastname'], $data['email'], $data['mobile'], $data['token']]);
    return $dbconn->lastInsertId();
}

function add_team_log_entry($dbconn, $data, $action)
{
    $sql = 'INSERT INTO teams_log (`team_id`, `action`, `team`, `firstname`, `lastname`, `email`, `mobile`) VALUES (?,?,?,?,?,?,?)';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['id'], $action, $data['team'], $data['firstname'], $data['lastname'], $data['email'], $data['mobile']]);
}

function send_registered_email($data)
{
    $to = $data['email'];
    $subject = 'Anmeldung FHNW Grümpi 2026';
    $message = replace_placeholders(
        file_get_contents('lib/templates/registered.html'),
        $data
    );
    $headers = [
        'From: "FHNW Grümpi 2026" <info@grümpi.ch>',
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
    ];
    return mail($to, $subject, $message, implode("\r\n", $headers));
}

function replace_placeholders($message, $data)
{
    $variables = [];
    foreach ($data as $key => $value) {
        $variables['{{' . $key . '}}'] = $value;
    }
    return strtr($message, $variables);
}
