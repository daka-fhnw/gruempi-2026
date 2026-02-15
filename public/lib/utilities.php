<?php

function jsonHeader()
{
    header("Content-Type: application/json");
}

function exitWith($code, $message)
{
    http_response_code($code);
    echo json_encode(["message" => $message]);
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
