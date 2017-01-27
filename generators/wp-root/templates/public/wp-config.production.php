<?php
$table_prefix  = '<%= prefix %>_';
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
define('DB_HOST', 'localhost');
define('DB_NAME', '<%= dataBaseNameProduction %>');
define('DB_USER', '');
define('DB_PASSWORD', '');

define('WP_CACHE', TRUE);

define('WP_AUTO_UPDATE_CORE', FALSE);
define('FORCE_SSL_ADMIN', FALSE);
define('FORCE_SSL_LOGIN', FALSE);
define('WP_ALLOW_REPAIR', FALSE);
define('DISALLOW_FILE_MODS', TRUE);

define('WP_POST_REVISIONS', TRUE);
define('EMPTY_TRASH_DAYS', 7 );

define('WP_DEBUG', FALSE);

if (!defined('WP_SITEURL')) {
    define('WP_SITEURL', 'http://<%= productionURL %>');
}
if (!defined('WP_HOME')) {
    define('WP_HOME', 'http://<%= productionURL %>');
}
