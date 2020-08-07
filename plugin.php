<?php
/**
 * Plugin Name: WYSIWYG Calculator Block
 * Plugin URI: https://whalingcityweb.com/calculator-block
 * Description: 
 * Author: Matt Bevilacqua
 * Author URI: https://www.mattbev.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package WCW_calc
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
