<?php

function jsonHeader()
{
    header("Content-Type: application/json");
}

function jsonEncodeUTF8($data)
{
    return json_encode($data, JSON_UNESCAPED_UNICODE);
}

function exitWith($code, $message, $errorId = null)
{
    http_response_code($code);
    echo jsonEncodeUTF8(["message" => $message, "errorId" => $errorId]);
    exit();
}

function isNonEmptyString($value)
{
    return isset($value) && is_string($value) && $value !== '';
}

function isValidEmail($value)
{
    return isNonEmptyString($value) && filter_var($value, FILTER_VALIDATE_EMAIL);
}
