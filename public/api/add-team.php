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
try {
    $dbconn = db_connect();
    remove_expired_teams($dbconn);
    if (!check_existing_team($dbconn, $data)) {
        exit_with(400, 'Team name already exists', 'existingTeam');
    }
    if (!check_existing_email($dbconn, $data)) {
        exit_with(400, 'E-mail address already in use', 'existingEmail');
    }
    $data['token'] = generate_token();
    $data['id'] = add_team_entry($dbconn, $data);
    $data['link'] = create_email_link($data);
    add_team_log_entry($dbconn, $data['id'], 'created', $data);
    if (!send_email($data)) {
        throw new RuntimeException("Sending email to {$data["email"]} failed");
    }
    json_response(['message' => 'Team added']);
} catch (Exception $e) {
    log_app_error('ERROR', 'add-team', $e);
    exit_with(500, 'Internal server error');
}

function extract_data()
{
    $input = json_decode_request_data();
    return [
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

function check_existing_team($dbconn, $data)
{
    $sql = 'SELECT COUNT(*) FROM `teams` WHERE `team`=?';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['team']]);
    return $stmt->fetchColumn() === 0;
}

function check_existing_email($dbconn, $data)
{
    $sql = 'SELECT COUNT(*) FROM `teams` WHERE `email`=?';
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
    $sql = 'INSERT INTO `teams` (`team`, `firstname`, `lastname`, `email`, `mobile`, `token`) VALUES (?,?,?,?,?,?)';
    $stmt = $dbconn->prepare($sql);
    $stmt->execute([$data['team'], $data['firstname'], $data['lastname'], $data['email'], $data['mobile'], $data['token']]);
    return $dbconn->lastInsertId();
}

function create_email_link($data)
{
    $id_token = join_id_token($data['id'], $data['token']);
    return "https://grümpi.ch/team/$id_token";
}

function send_email($data)
{
    $to = $data['email'];
    $subject = mime_encode('Anmeldung FHNW Grümpi 2026');
    $message = replace_placeholders(
        file_get_contents('lib/email.html'),
        $data
    );
    $headers = [
        'From' => mime_encode('FHNW Grümpi 2026') . ' <info@xn--grmpi-lva.ch>',
        'Reply-To' => 'info@grümpi.ch',
        'X-Mailer' => 'PHP/' . phpversion(),
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/html; charset=utf-8',
    ];
    $params = '-finfo@xn--grmpi-lva.ch';
    return mail($to, $subject, $message, $headers, $params);
}

function replace_placeholders($message, $data)
{
    $variables = [];
    foreach ($data as $key => $value) {
        $variables['{{' . $key . '}}'] = $value;
    }
    return strtr($message, $variables);
}

function mime_encode($text)
{
    return mb_encode_mimeheader($text, 'UTF-8', 'Q');
}
