<?php
$table_prefix  = '<%= prefix %>_';
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
define('DB_HOST', '127.0.0.1');
define('DB_NAME', '<%= dataBaseNameLocal %>');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');

define('WP_CACHE', FALSE);

define('WP_AUTO_UPDATE_CORE', TRUE);
define('FORCE_SSL_ADMIN', FALSE);
define('FORCE_SSL_LOGIN', FALSE);
define('WP_ALLOW_REPAIR', TRUE);
define('DISALLOW_FILE_MODS', FALSE);

define('WP_POST_REVISIONS', FALSE);
define('EMPTY_TRASH_DAYS', 0 );

define('WP_DEBUG', TRUE);
define('WP_DEBUG_LOG', TRUE);
define('WP_DEBUG_DISPLAY', TRUE);
define('SCRIPT_DEBUG', TRUE);
define('SAVEQUERIES', TRUE);


if (isset($_SERVER['X_FORWARDED_HOST']) && !empty($_SERVER['X_FORWARDED_HOST'])) {
    $hostname = $_SERVER['X_FORWARDED_HOST'];
} else {
    $hostname = $_SERVER['HTTP_HOST'];
}

if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
    $protocol = 'https://';
} else {
    $protocol = 'http://';
}

if (!defined('WP_SITEURL')) {
    define('WP_SITEURL', $protocol . rtrim($hostname, '/'));
}
if (!defined('WP_HOME')) {
    define('WP_HOME', $protocol . rtrim($hostname, '/'));
}

unset($hostname, $protocol);
