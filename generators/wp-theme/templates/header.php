<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?php wp_title( '|', true, 'right' ); ?></title>

    <?php $icon_path = esc_url( get_template_directory_uri() ) . '/assets/icons/'; ?>
    <!-- ICON -->
    <link rel="icon" href="<?php echo $icon_path; ?>icon-16.png" sizes="16x16">
    <link rel="icon" href="<?php echo $icon_path; ?>icon-32.png" sizes="32x32">
    <!-- MOBILE -->
    <link rel="apple-touch-icon" sizes="152x152" href="<?php echo $icon_path; ?>icon-152.png">
    <link rel="apple-touch-icon" sizes="144x144" href="<?php echo $icon_path; ?>icon-144.png">
    <link rel="apple-touch-icon" sizes="120x120" href="<?php echo $icon_path; ?>icon-120.png">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php echo $icon_path; ?>icon-114.png">
    <link rel="apple-touch-icon" sizes="76x76" href="<?php echo $icon_path; ?>icon-76.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php echo $icon_path; ?>icon-72.png">
    <link rel="apple-touch-icon" href="<?php echo $icon_path; ?>icon-57.png">
    <!-- ANDROID -->
    <meta name="theme-color" content="#f0f0f0">

    <?php wp_head();?>
</head>
<body <?php body_class(); ?>>

<?php do_action( 'after_body' ); ?>

<div class="wraper">
