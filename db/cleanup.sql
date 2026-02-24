DELETE FROM `teams`
WHERE
    `verified_at` IS NULL
    AND TIMESTAMPDIFF (HOUR, `created_at`, CURRENT_TIMESTAMP) > 24;