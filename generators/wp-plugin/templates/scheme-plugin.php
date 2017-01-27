<?php
/*
 * Plugin Name: <%= pluginName %>
 * Plugin URI:
 * Description:
 * Version: 0.1.0
 * Author: <%= authorName %>
 * Author URI: <%= authorURL %>
 * License: GPLv3 License
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: <%= uniqueIdentifier %>
 * Domain Path: /languages/
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit;

register_activation_hook( __FILE__, array( '<%= mainClass %>', 'plugin_activate' ) );
register_deactivation_hook( __FILE__, array( '<%= mainClass %>', 'plugin_deactivate' ) );

if ( ! class_exists( '<%= mainClass %>' ) ) :

class <%= mainClass %>
{
	/**
	 * @var object
	 */
	private static $instance = null;

	/**
	 * @return object A single instance of this class.
	 */
	public static function get_instance() {

		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * Initialize the plugin public actions.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'load_textdomain' ) );

		if ( is_admin() ) {
			$this->admin_includes();
		}
		$this->includes();
	}

	/**
	 * Run when the plugin is activated
	 */
	static function plugin_activate() {

	}

	/**
	 * Run when the plugin is deactivated
	 */
	static function plugin_deactivate() {

	}

	/**
	 * Load the plugin text domain for translation.
	 */
	public function load_textdomain() {
		load_plugin_textdomain( '<%= uniqueIdentifier %>', FALSE, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}

	/**
	 * Admin includes.
	 */
	private function admin_includes() {
		//include_once 'FILE';
	}

	/**
	 * Includes.
	 */
	private function includes() {
		//include_once 'FILE';
	}
}
add_action( 'plugins_loaded', array( '<%= mainClass %>', 'get_instance' ), 0 );

endif;
