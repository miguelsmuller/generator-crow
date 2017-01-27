<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Criação dos menus, Configuração dos Thumbnails e dos ativação dos formatos de posts
 */
add_filter( 'class_dashboard', '__return_true');
add_filter( 'class_maintenance', '__return_true');

/**
 * Criação dos menus, Configuração dos Thumbnails e dos ativação dos formatos de posts
 */
add_action( 'after_setup_theme', 'after_setup_theme' );
function after_setup_theme() {
	register_nav_menus(array(
		'menu-navigation' => 'Menu Navagação',
		'menu-footer'     => 'Menu Rodapé',
		'menu-copyright'  => 'Menu Copyright'
	));

	add_theme_support('post-thumbnails', array( 'post' ));
}


/**
 * Criação dos menus, Configuração dos Thumbnails e dos ativação dos formatos de posts
 */
add_action( 'after_switch_theme', 'update_image_size' );
function update_image_size() {
	update_option('thumbnail_size_w', 250);
	update_option('thumbnail_size_h', 250);
	update_option('thumbnail_crop', 1 );
	add_image_size( 'medium', 500, 500, true );
	add_image_size( 'large', 1024, 1024, true );
}


/**
 * Registra uma área de widgets e desabilita alguns widgets padrões
 */
add_action( 'widgets_init', 'widgets_init' );
function widgets_init() {
	register_sidebar( array(
		'name'          => 'Sidebar Blog',
		'id'            => 'sidebar-blog',
		'description'   => 'Sidebar blog',
		'before_widget' => '<section class="sidebar-panel">',
		'before_title'  => '<h3 class="title-theme title-theme-sidebar">',
		'after_title'   => '</h3>',
		'after_widget'  => '</section>'
	));

	register_sidebar( array(
		'name'          => 'Sidebar Contato',
		'id'            => 'sidebar-contato',
		'description'   => 'Sidebar contato',
		'before_widget' => '<section class="sidebar-panel">',
		'before_title'  => '<h3 class="title-theme title-theme-sidebar">',
		'after_title'   => '</h3>',
		'after_widget'  => '</section>'
	));

	unregister_widget( 'WP_Widget_Pages' );
	unregister_widget( 'WP_Widget_Calendar' );
	unregister_widget( 'WP_Widget_Archives' );
	unregister_widget( 'WP_Widget_Links' );
	unregister_widget( 'WP_Widget_Meta' );
	unregister_widget( 'WP_Widget_Categories' );
	unregister_widget( 'WP_Widget_Recent_Posts' );
	unregister_widget( 'WP_Widget_Recent_Comments' );
	unregister_widget( 'WP_Widget_RSS' );
	unregister_widget( 'WP_Widget_Tag_Cloud' );
}


/**
 * Carrega os arquivos JS's e CSS's do tema
 */
add_action('wp_enqueue_scripts', 'enqueue_scripts' );
function enqueue_scripts(){
	$template_dir = get_bloginfo('template_directory');

	// COMMON STYLE AND SCRIPT
	wp_register_script( 'common-js', $template_dir .'/assets/scripts/javascript.min.js', array('jquery', 'waypoints', 'particleground'), null, true );
	wp_localize_script(
		'common-js',
		'common_params',
		array(
			'site_url'  => esc_url( site_url() )
		)
	);
	wp_enqueue_script( 'common-js' );
	wp_enqueue_style( 'common-css', $template_dir .'/assets/styles/style.css' );
}


/**
 * Função quer permite a página infinita
 */
add_action('wp_ajax_infinite_scroll', 'wp_infinite_scroll');
add_action('wp_ajax_nopriv_infinite_scroll', 'wp_infinite_scroll');
function wp_infinite_scroll(){
	$template        = $_POST['template'];
	$post_type       = $_POST['post_type'];
	$posts_per_page  = $_POST['posts_per_page'];
	$paged           = $_POST['paged'];

	query_posts(array('post_type' => $post_type, 'posts_per_page' => $posts_per_page, 'paged' => $paged,));
	get_template_part( $template );

	exit;
}


/**
 * Evira o envio de imagem com tamanho pequeno
 */
add_filter('wp_handle_upload_prefilter','minimin_image_size');
function minimin_image_size($file)
{
	$img  =getimagesize($file['tmp_name']);
	$min_size = array('width' => '500', 'height' => '500');
	$max_size = array('width' => '2048', 'height' => '2048');
	$width = $img[0];
	$height = $img[1];

	if ($width < $min_size['width'] )
		return array("error"=>"Imagem muito pequena. Largura miníma é {$min_size['width']}px. A imagem que você enviou possui $width px de largura");

	elseif ($height <  $min_size['height'])
		return array("error"=>"Imagem muito pequena. Altura miníma é {$min_size['height']}px. A imagem que você enviou possui $height px de altura");

	elseif ($width >  $max_size['width'])
		return array("error"=>"Imagem muito grande. Altura máxima é {$max_size['width']}px. A imagem que você enviou possui $width px de altura");

	elseif ($height >  $max_size['height'])
		return array("error"=>"Imagem muito grande. Altura máxima é {$max_size['height']}px. A imagem que você enviou possui $height px de altura");

	else
		return $file;
}


add_action( 'init', 'disable_wp_emojicons' );
function disable_wp_emojicons() {

  if ( ! is_single() ) {
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  }
}


/**
 * Remove o CSS e o JS do CF7 onde não tem necessidade
 */
add_filter( 'wpcf7_load_js', '__return_false' );
add_filter( 'wpcf7_load_css', '__return_false' );
add_action( 'wp_head', 'cf_register_assets' );
function cf_register_assets() {
	if ( is_page( 'fale-conosco' ) ) {
		wpcf7_enqueue_scripts();
		wpcf7_enqueue_styles();
	}
}


/**
 * Mensagem de atualização de navegador inseguro
 */
add_filter( 'navigator_insecure', 'navigator_insecure' );
function navigator_insecure( $msg ){
	return 'Parece que está a usar uma versão não segura do <a href="%update_url%" class="alert-link">%name%</a>. Para melhor navegar no nosso site, por favor atualize o seu browser.<br/><a href="%update_url%" class="alert-link">Clique aqui para ser direcionado para atualização do %name% agora.</a>';
}


/**
 * Mensagem de atualização de navegador desatualizado
 */
add_filter( 'navigator_upgrade', 'navigator_upgrade' );
function navigator_upgrade( $msg ){
	return 'Parece que está a usar uma versão antiga do <a href="%s" class="alert-link"%name%</a>. Para melhor navegar no nosso site, por favor atualize o seu browser.<br/><a href="%update_url%" class="alert-link">Clique aqui para ser direcionado para atualização do %name% agora.</a>';
}


/**
 * Remove o widget do mandrill da dashboard
 */
add_action( 'wp_dashboard_setup', 'dashboard_setup' );
function dashboard_setup() {
    if ( in_array('wpmandrill/wpmandrill.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ))) ){
        remove_meta_box('mandrill_widget', 'dashboard', 'normal');
    }
}


/**
 * Adiciona alguns CSS na pagina de login
 */
add_action( 'login_enqueue_scripts', 'login_scripts' );
function login_scripts() {
    $login_bg = get_template_directory_uri() . '/assets/images/image-login-background.jpg';
    $login_logo = get_template_directory_uri() . '/assets/images/image-login.png'
    ?>

    <style type="text/css" media="screen">
    .login form {
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    body.login {
        background-image: url("<?php echo $login_bg; ?>");
    }
    body.login div#login h1 a {
        background-image: url("<?php echo $login_logo; ?>");
    }
    body.login {
        background-color: #F6F6F6 !important;
    }
    body.login div#login{
        padding: 30px 0 0;
    }
    body.login div#login h1{
        width:320px;
        height:250px;
        margin-bottom:30px;
    }
    body.login div#login h1 a {
        background-size: 320px 250px;
        padding-bottom: 30px;
        width:320px;
        height:250px;
    }
    .text-center {
        text-align: center;
    }
    .login form {
        border: 2px solid gainsboro;
    }
    </style>
    <?php
}
