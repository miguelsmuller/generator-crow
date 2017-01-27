<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>

<form action="<?php echo esc_url( site_url() ); ?>" method="get" accept-charset="utf-8" role="search" class="search-form" >
    <div class="form-group">
        <input type="text" name="s" id="search" class="form-control" value="<?php the_search_query(); ?>" placeholder="Critério de pesquisa" />
        <button type="submit"><span class="icon-search"></span></button>
    </div>
    <input type="hidden" name="post_type[]" value="page" />
    <input type="hidden" name="post_type[]" value="post" />
</form>