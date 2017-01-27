<?php
/** Wordpress multi Environment system */
switch ($_SERVER['SERVER_NAME']) {
	case '<%= productionURL %>':
		include 'wp-config.production.php';
		break;

	case '<%= stagingURL %>':
		include 'wp-config.staging.php';
		break;

	default:
		include 'wp-config.development.php';
		break;
}

/** Defaults options  */
define('UPLOADS', ''.'public-files' );

define('WP_MEMORY_LIMIT', '512M');
define('WP_MAX_MEMORY_LIMIT', '512M');
define('DISABLE_WP_CRON', true);
define('DISALLOW_FILE_EDIT', true );

define('AUTH_KEY',         'P5skg-w*g?W1hGET$zEP6!jL[UMZak z0BYM(B4.Atk>gT(^~@4)*o7|!^Wr}:Je');
define('SECURE_AUTH_KEY',  '&2un.+R`.9aSle+?k+vAFjt!iQt*up~(>>+|+;8o4~3}P>N5Vp,g3,:vxx9%UtH6');
define('LOGGED_IN_KEY',    'R+d+{}]_cx~D(7Ru] 1PSxCCoJnr>~+^RM?5h`=?K[>r31^|_&|J8Qk3S;pyFO@v');
define('NONCE_KEY',        'SMo~c{8vH}^PI7/DI!{6t}V2BCqvB5?U?_:AiO43U2S=|bDnVsWT<:JKAC!Sv?l|');
define('AUTH_SALT',        'uP(taw9ZJ`zU`,$44]NWZ2f9@A{<X!-*//^SwB(}4Xrw5OBSG3mW0&MPm.2,7mB$');
define('SECURE_AUTH_SALT', 'sdn,k81i>qo&i %nE[rYw23UP(oc~-*Z/;Q-]1jHY@tQ]7`Nm:G|G@8[70d>){bf');
define('LOGGED_IN_SALT',   '(3DR+q`t9p.aYQy!-[;#k@n ]p}PrGbDKh[}BulGwRXc>91M-%0vU+a#~+X+`-7/');
define('NONCE_SALT',       '&<:^;*g|f#!/|C3jj(U%K]dlZoh=s}lJ)gawE!`*jnD,#[qBhKznwg&/Z c+wU|X');

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
