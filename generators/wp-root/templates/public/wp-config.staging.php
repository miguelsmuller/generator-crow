<?php
$table_prefix  = '<%= prefix %>_';
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
define('DB_HOST', 'localhost');
define('DB_NAME', '<%= dataBaseNameStaging %>');
define('DB_USER', '');
define('DB_PASSWORD', '');

define('WP_CACHE', FALSE);

define('WP_AUTO_UPDATE_CORE', FALSE);
define('FORCE_SSL_ADMIN', FALSE);
define('FORCE_SSL_LOGIN', FALSE);
define('WP_ALLOW_REPAIR', FALSE);
define('DISALLOW_FILE_MODS', TRUE);

define('WP_POST_REVISIONS', FALSE);
define('EMPTY_TRASH_DAYS', 0 );

define('WP_DEBUG', FALSE);

if (!defined('WP_SITEURL')) {
    define('WP_SITEURL', 'http://<%= stagingURL %>');
}
if (!defined('WP_HOME')) {
    define('WP_HOME', 'http://<%= stagingURL %>');
}
