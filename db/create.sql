CREATE TABLE
    teams (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `team` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `firstname` VARCHAR(255) NOT NULL,
        `lastname` VARCHAR(255) NOT NULL,
        `mobile` VARCHAR(255),
        `token` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `verified` BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (`id`),
        UNIQUE INDEX (`team`),
        UNIQUE INDEX (`email`),
        INDEX `id_token` (`id`, `token`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    teams_log (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `team_id` INT UNSIGNED NOT NULL,
        `action` VARCHAR(20) NOT NULL,
        `team` VARCHAR(255),
        `email` VARCHAR(255),
        `firstname` VARCHAR(255),
        `lastname` VARCHAR(255),
        `mobile` VARCHAR(255),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;