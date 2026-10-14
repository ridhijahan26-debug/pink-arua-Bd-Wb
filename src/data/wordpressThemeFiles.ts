export interface ThemeFile {
  filename: string;
  path: string;
  language: 'php' | 'css' | 'javascript' | 'markdown';
  description: string;
  content: string;
}

export const WORDPRESS_THEME_FILES: ThemeFile[] = [
  {
    filename: 'style.css',
    path: 'wp-content/themes/astra-child-pink-aura/style.css',
    language: 'css',
    description: 'Astra child theme header definition and core neon pink dark design system styles.',
    content: `/*
Theme Name: Astra Child - Pink Aura BD
Theme URI: https://pinkaurabd.com/
Description: Premium dark-themed, neon-glowing video discovery child theme for Astra. Explores the secret world with high-performance responsive video grids, custom post types, and mobile bottom navigation.
Author: Pink Aura BD Engineering
Author URI: https://pinkaurabd.com/
Template: astra
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: pink-aura-bd
*/

:root {
  --pabd-bg-main: #07070B;
  --pabd-bg-secondary: #101016;
  --pabd-bg-card: #14141D;
  --pabd-pink-primary: #FF2D95;
  --pabd-pink-hot: #FF007F;
  --pabd-pink-glow: rgba(255, 45, 149, 0.45);
  --pabd-purple: #9B5CFF;
  --pabd-text-primary: #F8F5FA;
  --pabd-text-secondary: #A8A1B3;
  --pabd-border: #302333;
}

body {
  background-color: var(--pabd-bg-main) !important;
  color: var(--pabd-text-primary) !important;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Neon Glow Accents */
.pabd-glow-pink {
  box-shadow: 0 0 25px var(--pabd-pink-glow);
}

.pabd-glow-text {
  text-shadow: 0 0 16px rgba(255, 45, 149, 0.6);
}

/* Video Card Styling */
.pabd-video-card {
  background: var(--pabd-bg-card);
  border: 1px solid var(--pabd-border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.pabd-video-card:hover {
  transform: translateY(-4px);
  border-color: var(--pabd-pink-primary);
  box-shadow: 0 0 20px var(--pabd-pink-glow);
}

.pabd-thumbnail-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  overflow: hidden;
}

.pabd-thumbnail-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.pabd-video-card:hover .pabd-thumbnail-wrap img {
  transform: scale(1.05);
}

/* Mobile Fixed Bottom Navigation */
@media (max-width: 768px) {
  .pabd-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: rgba(16, 16, 22, 0.95);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--pabd-border);
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 999;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
}
`
  },
  {
    filename: 'functions.php',
    path: 'wp-content/themes/astra-child-pink-aura/functions.php',
    language: 'php',
    description: 'Core child theme logic, Video Custom Post Type registration, taxonomies, AJAX filter endpoints, and asset enqueuing.',
    content: `<?php
/**
 * Astra Child Theme - Pink Aura BD
 * Functions and definitions
 */

if (!defined('ABSPATH')) {
    exit;
}

// Enqueue styles and scripts
function pabd_enqueue_scripts() {
    // Parent theme styles
    wp_enqueue_style('astra-parent-theme-css', get_template_directory_uri() . '/style.css');
    
    // Child theme styles
    wp_enqueue_style('pabd-child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-parent-theme-css'), wp_get_theme()->get('Version'));
    
    // Google Fonts
    wp_enqueue_style('pabd-google-fonts', 'https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap', array(), null);
    
    // Child theme JavaScript
    wp_enqueue_script('pabd-custom-js', get_stylesheet_directory_uri() . '/assets/js/pink-aura.js', array('jquery'), '1.0.0', true);

    // Adsterra Popunder Ad Script
    wp_enqueue_script('pabd-adsterra-popunder', 'https://ahuramazda.org/1/d6fbfa8198745fa537bebf4396a053f2', array(), null, false);

    // Adsterra Social Bar Ad Script
    wp_enqueue_script('pabd-adsterra-socialbar', 'https://brijmohan.org/14/db4168cfe37f586af8254e9f49cd9741', array(), null, true);
    
    // Localize script for AJAX search & filtering
    wp_localize_script('pabd-custom-js', 'pabd_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('pabd_filter_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'pabd_enqueue_scripts');

// Register Video Custom Post Type
function pabd_register_video_cpt() {
    $labels = array(
        'name'               => _x('Videos', 'post type general name', 'pink-aura-bd'),
        'singular_name'      => _x('Video', 'post type singular name', 'pink-aura-bd'),
        'menu_name'          => _x('Videos', 'admin menu', 'pink-aura-bd'),
        'add_new'            => _x('Add New', 'video', 'pink-aura-bd'),
        'add_new_item'       => __('Add New Video', 'pink-aura-bd'),
        'edit_item'          => __('Edit Video', 'pink-aura-bd'),
        'new_item'           => __('New Video', 'pink-aura-bd'),
        'view_item'          => __('View Video', 'pink-aura-bd'),
        'search_items'       => __('Search Videos', 'pink-aura-bd'),
        'not_found'          => __('No videos found', 'pink-aura-bd'),
        'not_found_in_trash' => __('No videos found in Trash', 'pink-aura-bd'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'video'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-video-alt3',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('video', $args);
}
add_action('init', 'pabd_register_video_cpt');

// Register Video Category Custom Taxonomy
function pabd_register_video_taxonomy() {
    $labels = array(
        'name'              => _x('Video Categories', 'taxonomy general name', 'pink-aura-bd'),
        'singular_name'     => _x('Video Category', 'taxonomy singular name', 'pink-aura-bd'),
        'search_items'      => __('Search Categories', 'pink-aura-bd'),
        'all_items'         => __('All Categories', 'pink-aura-bd'),
        'parent_item'       => __('Parent Category', 'pink-aura-bd'),
        'parent_item_colon' => __('Parent Category:', 'pink-aura-bd'),
        'edit_item'         => __('Edit Category', 'pink-aura-bd'),
        'update_item'       => __('Update Category', 'pink-aura-bd'),
        'add_new_item'      => __('Add New Category', 'pink-aura-bd'),
        'new_item_name'     => __('New Category Name', 'pink-aura-bd'),
        'menu_name'         => __('Categories', 'pink-aura-bd'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'video-category'),
        'show_in_rest'      => true,
    );

    register_taxonomy('video_category', array('video'), $args);
}
add_action('init', 'pabd_register_video_taxonomy');

// Record Post Views Function
function pabd_set_post_views($post_id) {
    $count_key = '_pabd_views_count';
    $count = get_post_meta($post_id, $count_key, true);
    if ($count == '') {
        $count = 1;
        delete_post_meta($post_id, $count_key);
        add_post_meta($post_id, $count_key, '1');
    } else {
        $count++;
        update_post_meta($post_id, $count_key, $count);
    }
}

// AJAX Filter Handler
function pabd_ajax_filter_videos() {
    check_ajax_referer('pabd_filter_nonce', 'nonce');

    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';
    $search   = isset($_POST['search']) ? sanitize_text_field($_POST['search']) : '';
    $sort     = isset($_POST['sort']) ? sanitize_text_field($_POST['sort']) : 'latest';

    $args = array(
        'post_type'      => 'video',
        'post_status'    => 'publish',
        'posts_per_page' => 12,
    );

    if (!empty($search)) {
        $args['s'] = $search;
    }

    if (!empty($category) && $category !== 'all') {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'video_category',
                'field'    => 'slug',
                'terms'    => $category,
            ),
        );
    }

    if ($sort === 'most_viewed') {
        $args['meta_key'] = '_pabd_views_count';
        $args['orderby']  = 'meta_value_num';
        $args['order']    = 'DESC';
    } elseif ($sort === 'trending') {
        $args['meta_key'] = '_pabd_trending_score';
        $args['orderby']  = 'meta_value_num';
        $args['order']    = 'DESC';
    } else {
        $args['orderby'] = 'date';
        $args['order']   = 'DESC';
    }

    $query = new WP_Query($args);

    ob_start();
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template-parts/video-card');
        }
        wp_reset_postdata();
    } else {
        echo '<div class="pabd-no-results text-center py-12"><p class="text-secondary">No videos match your criteria.</p></div>';
    }

    $html = ob_get_clean();
    wp_send_json_success(array('html' => $html, 'count' => $query->found_posts));
}
add_action('wp_ajax_pabd_filter_videos', 'pabd_ajax_filter_videos');
add_action('wp_ajax_nopriv_pabd_filter_videos', 'pabd_ajax_filter_videos');
`
  },
  {
    filename: 'front-page.php',
    path: 'wp-content/themes/astra-child-pink-aura/front-page.php',
    language: 'php',
    description: 'Custom homepage template executing Sections A to G (Hero Carousel, Trending Now, Country Categories, Most Trending, TikToker, Latest Videos).',
    content: `<?php
/**
 * The template for displaying the custom homepage
 * Template Name: Pink Aura BD Homepage
 */

get_header(); ?>

<main id="primary" class="site-main pabd-home-container" style="background:#07070B; min-height:100vh; color:#F8F5FA;">

    <!-- SECTION A: HERO / FEATURED VIDEOS CAROUSEL -->
    <section class="pabd-hero-carousel relative overflow-hidden py-8 px-4 md:px-8 border-b border-[#302333]">
        <div class="max-w-7xl mx-auto">
            <?php
            $hero_query = new WP_Query(array(
                'post_type'      => 'video',
                'posts_per_page' => 3,
                'meta_key'       => '_pabd_is_featured',
                'meta_value'     => '1'
            ));

            if ($hero_query->have_posts()) :
                while ($hero_query->have_posts()) : $hero_query->the_post();
                    $video_url = get_post_meta(get_the_ID(), '_pabd_embed_url', true);
            ?>
                <div class="pabd-hero-slide rounded-2xl relative overflow-hidden border border-[#302333] mb-6" style="background:#14141D;">
                    <div class="aspect-video md:aspect-[21/9] w-full relative">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('full', array('class' => 'w-full h-full object-cover')); ?>
                        <?php endif; ?>
                        <div class="absolute inset-0 bg-gradient-to-t from-[#07070B] via-[#07070B]/50 to-transparent flex flex-col justify-end p-6 md:p-12">
                            <span class="inline-block text-xs uppercase tracking-wider font-semibold text-[#FF2D95] mb-2">Featured Discovery</span>
                            <h1 class="text-2xl md:text-4xl font-bold mb-3 text-white"><?php the_title(); ?></h1>
                            <p class="text-sm md:text-base text-[#A8A1B3] max-w-2xl mb-5"><?php echo wp_trim_words(get_the_excerpt(), 25); ?></p>
                            <div>
                                <a href="<?php the_permalink(); ?>" class="inline-flex items-center gap-2 bg-[#FF2D95] hover:bg-[#FF007F] text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-[#FF2D95]/30">
                                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    Watch Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </section>

    <!-- SECTION B: TRENDING NOW -->
    <section class="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3">
                <span class="w-3 h-3 rounded-full bg-[#FF2D95] pabd-glow-pink"></span>
                <h2 class="text-2xl font-bold tracking-tight text-white">Trending Now</h2>
            </div>
            <a href="<?php echo esc_url(get_post_type_archive_link('video')); ?>?sort=trending" class="text-sm text-[#FF2D95] hover:underline">View All &rarr;</a>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <?php
            $trending_query = new WP_Query(array(
                'post_type'      => 'video',
                'posts_per_page' => 4,
                'meta_key'       => '_pabd_trending_score',
                'orderby'        => 'meta_value_num',
                'order'          => 'DESC'
            ));

            if ($trending_query->have_posts()) :
                while ($trending_query->have_posts()) : $trending_query->the_post();
                    get_template_part('template-parts/video-card');
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </section>

    <!-- ADSTERRA NATIVE BANNER WIDGET -->
    <div class="pabd-adsterra-native max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <script async="async" data-cfasync="false" src="https://brijmohan.org/21/3a604443ad36d86d2d1f80e17d7c66bb"></script>
        <div id="container-3a604443ad36d86d2d1f80e17d7c66bb"></div>
    </div>

    <!-- SECTION C: COUNTRY / REGION CATEGORIES -->
    <section class="py-12 px-4 md:px-8 border-t border-b border-[#302333]" style="background:#101016;">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-2xl font-bold mb-8 text-white">Explore By Region</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Bangladeshi -->
                <a href="<?php echo esc_url(get_term_link('bangladeshi', 'video_category')); ?>" class="pabd-region-card p-6 rounded-2xl border border-[#302333] hover:border-[#FF2D95] transition block group" style="background:#14141D;">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-xs uppercase tracking-widest text-[#FF2D95]">Bangladesh</span>
                        <span class="text-xs text-[#A8A1B3]">Dhaka & Beyond</span>
                    </div>
                    <h3 class="text-xl font-bold text-white group-hover:text-[#FF2D95] transition">Bangladeshi Videos</h3>
                    <p class="text-sm text-[#A8A1B3] mt-2">Discover indie music, culture, and urban scenes.</p>
                </a>

                <!-- Pakistani -->
                <a href="<?php echo esc_url(get_term_link('pakistani', 'video_category')); ?>" class="pabd-region-card p-6 rounded-2xl border border-[#302333] hover:border-[#FF2D95] transition block group" style="background:#14141D;">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-xs uppercase tracking-widest text-[#FF2D95]">Pakistan</span>
                        <span class="text-xs text-[#A8A1B3]">Lahore & Karachi</span>
                    </div>
                    <h3 class="text-xl font-bold text-white group-hover:text-[#FF2D95] transition">Pakistani Videos</h3>
                    <p class="text-sm text-[#A8A1B3] mt-2">Haute couture, underground motorsport, and arts.</p>
                </a>

                <!-- Indian -->
                <a href="<?php echo esc_url(get_term_link('indian', 'video_category')); ?>" class="pabd-region-card p-6 rounded-2xl border border-[#302333] hover:border-[#FF2D95] transition block group" style="background:#14141D;">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-xs uppercase tracking-widest text-[#FF2D95]">India</span>
                        <span class="text-xs text-[#A8A1B3]">Mumbai & Delhi</span>
                    </div>
                    <h3 class="text-xl font-bold text-white group-hover:text-[#FF2D95] transition">Indian Videos</h3>
                    <p class="text-sm text-[#A8A1B3] mt-2">Urban choreography, street food trails, and indie sound.</p>
                </a>
            </div>
        </div>
    </section>

    <!-- SECTION D: MOST TRENDING -->
    <section class="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-white">Most Trending (Past 7 Days)</h2>
            <span class="text-xs text-[#A8A1B3]">Calculated via 7-day velocity score</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <?php
            $most_trending = new WP_Query(array(
                'post_type'      => 'video',
                'posts_per_page' => 4,
                'meta_key'       => '_pabd_views_count',
                'orderby'        => 'meta_value_num',
                'order'          => 'DESC'
            ));
            if ($most_trending->have_posts()) :
                while ($most_trending->have_posts()) : $most_trending->the_post();
                    get_template_part('template-parts/video-card');
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </section>

    <!-- SECTION E: TIKTOKER CATEGORY -->
    <section class="py-12 px-4 md:px-8 border-t border-[#302333] max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3">
                <span class="text-xl">✨</span>
                <h2 class="text-2xl font-bold text-white">TikToker Creator Spotlight</h2>
            </div>
            <a href="<?php echo esc_url(get_term_link('tiktoker', 'video_category')); ?>" class="text-sm text-[#FF2D95] hover:underline">View Creators &rarr;</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <?php
            $tiktoker_query = new WP_Query(array(
                'post_type' => 'video',
                'posts_per_page' => 4,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'video_category',
                        'field'    => 'slug',
                        'terms'    => 'tiktoker'
                    )
                )
            ));
            if ($tiktoker_query->have_posts()) :
                while ($tiktoker_query->have_posts()) : $tiktoker_query->the_post();
                    get_template_part('template-parts/video-card');
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </section>

    <!-- SECTION F: LATEST VIDEOS -->
    <section class="py-12 px-4 md:px-8 border-t border-[#302333] max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold mb-8 text-white">Latest Videos</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <?php
            $latest_query = new WP_Query(array(
                'post_type'      => 'video',
                'posts_per_page' => 8,
                'orderby'        => 'date',
                'order'          => 'DESC'
            ));
            if ($latest_query->have_posts()) :
                while ($latest_query->have_posts()) : $latest_query->the_post();
                    get_template_part('template-parts/video-card');
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </section>

</main>

<?php get_footer(); ?>
`
  },
  {
    filename: 'single-video.php',
    path: 'wp-content/themes/astra-child-pink-aura/single-video.php',
    language: 'php',
    description: 'Dedicated single video template with compact header, responsive 16:9 player, verified view counts, creator attribution, and related recommendations.',
    content: `<?php
/**
 * Single Video Post Template
 * Template Post Type: video
 */

get_header();

while (have_posts()) : the_post();
    pabd_set_post_views(get_the_ID());
    $views = get_post_meta(get_the_ID(), '_pabd_views_count', true);
    $embed_url = get_post_meta(get_the_ID(), '_pabd_embed_url', true);
    $quality = get_post_meta(get_the_ID(), '_pabd_quality', true) ?: '1080p';
    $creator_name = get_post_meta(get_the_ID(), '_pabd_creator_name', true) ?: get_the_author();
    $creator_handle = get_post_meta(get_the_ID(), '_pabd_creator_handle', true) ?: '';
?>

<div class="pabd-single-video-page" style="background:#07070B; min-height:100vh; color:#F8F5FA;">
    <!-- Compact Player Header -->
    <div class="pabd-player-header py-4 px-4 md:px-8 border-b border-[#302333] flex items-center justify-between" style="background:#101016;">
        <a href="<?php echo home_url(); ?>" class="text-sm text-[#A8A1B3] hover:text-[#FF2D95] flex items-center gap-2">
            &larr; Back to Discovery
        </a>
        <div class="text-sm font-semibold tracking-wide text-white">
            <span class="text-[#FF2D95]">PINK AURA</span> BD
        </div>
        <span class="text-xs bg-[#14141D] border border-[#302333] px-2.5 py-1 rounded-md text-[#FF2D95]">
            <?php echo esc_html($quality); ?>
        </span>
    </div>

    <div class="max-w-6xl mx-auto py-8 px-4 md:px-8">
        <!-- 16:9 Responsive Video Player Container -->
        <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#302333] mb-8 shadow-2xl shadow-[#FF2D95]/10" style="background:#000;">
            <?php if (!empty($embed_url)) : ?>
                <iframe src="<?php echo esc_url($embed_url); ?>" class="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <?php elseif (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('full', array('class' => 'w-full h-full object-cover')); ?>
            <?php endif; ?>
        </div>

        <!-- Adsterra Under-Player Native Ads -->
        <div class="pabd-adsterra-native my-6">
            <script async="async" data-cfasync="false" src="https://brijmohan.org/21/3a604443ad36d86d2d1f80e17d7c66bb"></script>
            <div id="container-3a604443ad36d86d2d1f80e17d7c66bb"></div>
        </div>

        <!-- Video Metadata & Details -->
        <div class="mb-10">
            <h1 class="text-2xl md:text-3xl font-bold mb-3 text-white"><?php the_title(); ?></h1>
            <div class="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[#A8A1B3] mb-6">
                <span><?php echo number_format(intval($views)); ?> views</span>
                <span>&middot;</span>
                <span>Published <?php echo get_the_date(); ?></span>
                <span>&middot;</span>
                <span class="text-[#FF2D95] font-medium">
                    <?php
                    $terms = get_the_terms(get_the_ID(), 'video_category');
                    if ($terms && !is_wp_error($terms)) {
                        echo esc_html($terms[0]->name);
                    }
                    ?>
                </span>
            </div>

            <!-- Creator Bar -->
            <div class="flex items-center justify-between p-4 rounded-xl border border-[#302333] mb-6" style="background:#14141D;">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#302333] flex items-center justify-center font-bold text-[#FF2D95]">
                        <?php echo esc_html(substr($creator_name, 0, 1)); ?>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white"><?php echo esc_html($creator_name); ?></h4>
                        <?php if ($creator_handle) : ?>
                            <p class="text-xs text-[#A8A1B3]"><?php echo esc_html($creator_handle); ?></p>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="prose prose-invert max-w-none text-[#A8A1B3] text-sm leading-relaxed">
                <?php the_content(); ?>
            </div>
        </div>

        <!-- Related Videos -->
        <div class="border-t border-[#302333] pt-10">
            <h3 class="text-xl font-bold mb-6 text-white">Related In Secret World</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <?php
                $related_query = new WP_Query(array(
                    'post_type'      => 'video',
                    'posts_per_page' => 4,
                    'post__not_in'   => array(get_the_ID())
                ));
                if ($related_query->have_posts()) :
                    while ($related_query->have_posts()) : $related_query->the_post();
                        get_template_part('template-parts/video-card');
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </div>
    </div>
</div>

<?php
endwhile;
get_footer();
`
  },
  {
    filename: 'template-parts/video-card.php',
    path: 'wp-content/themes/astra-child-pink-aura/template-parts/video-card.php',
    language: 'php',
    description: 'Reusable video card component with 16:9 aspect ratio, unboxed metadata, and hover neon glow.',
    content: `<?php
/**
 * Template part for displaying a video card in queries
 */

$views = get_post_meta(get_the_ID(), '_pabd_views_count', true) ?: '0';
$duration = get_post_meta(get_the_ID(), '_pabd_duration', true) ?: '4:20';
$quality = get_post_meta(get_the_ID(), '_pabd_quality', true) ?: '1080p';
$terms = get_the_terms(get_the_ID(), 'video_category');
$category_name = ($terms && !is_wp_error($terms)) ? $terms[0]->name : 'Discovery';
?>

<article id="post-<?php the_ID(); ?>" class="pabd-video-card group">
    <a href="<?php the_permalink(); ?>" class="block">
        <div class="pabd-thumbnail-wrap">
            <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('medium_large', array('class' => 'w-full h-full object-cover')); ?>
            <?php else : ?>
                <div class="w-full h-full bg-[#14141D] flex items-center justify-center text-[#A8A1B3]">
                    <span>Pink Aura Video</span>
                </div>
            <?php endif; ?>
            
            <!-- Stylized View Count Badge for Social Proof -->
            <span class="absolute top-2 left-2 bg-[#07070B]/85 backdrop-blur-sm text-[10px] font-semibold text-[#F8F5FA] px-2 py-0.5 rounded border border-[#302333] flex items-center gap-1 shadow-sm">
                <svg class="w-3 h-3 text-[#FF2D95]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <span><?php echo number_format(intval($views)) . ' views'; ?></span>
            </span>

            <!-- Quality Badge -->
            <span class="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-[10px] font-semibold text-white px-2 py-0.5 rounded">
                <?php echo esc_html($quality); ?>
            </span>

            <!-- Duration Badge -->
            <span class="absolute bottom-2 right-2 bg-black/80 text-[10px] text-white px-1.5 py-0.5 rounded font-mono">
                <?php echo esc_html($duration); ?>
            </span>
        </div>

        <div class="p-3.5">
            <div class="text-[11px] text-[#FF2D95] font-semibold uppercase tracking-wider mb-1">
                <?php echo esc_html($category_name); ?>
            </div>
            <h3 class="text-sm font-semibold text-white line-clamp-2 group-hover:text-[#FF2D95] transition">
                <?php the_title(); ?>
            </h3>
            <div class="flex items-center gap-2 mt-2 text-[11px] text-[#A8A1B3]">
                <span><?php echo number_format(intval($views)); ?> views</span>
                <span>&middot;</span>
                <span><?php echo human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ago'; ?></span>
            </div>
        </div>
    </a>
</article>
`
  },
  {
    filename: 'assets/js/pink-aura.js',
    path: 'wp-content/themes/astra-child-pink-aura/assets/js/pink-aura.js',
    language: 'javascript',
    description: 'Interactive JavaScript handling AJAX video category filters, search debouncing, and mobile bottom navigation highlights.',
    content: `/**
 * Pink Aura BD - Interactive Client Script
 */

(function($) {
  'use strict';

  $(document).ready(function() {
    // AJAX Video Filtering
    $('.pabd-filter-btn').on('click', function(e) {
      e.preventDefault();
      var category = $(this).data('category');
      var $container = $('#pabd-video-grid');

      $('.pabd-filter-btn').removeClass('active border-[#FF2D95] text-[#FF2D95]');
      $(this).addClass('active border-[#FF2D95] text-[#FF2D95]');

      $container.css('opacity', '0.4');

      $.ajax({
        url: pabd_ajax.ajax_url,
        type: 'POST',
        data: {
          action: 'pabd_filter_videos',
          category: category,
          nonce: pabd_ajax.nonce
        },
        success: function(response) {
          if (response.success) {
            $container.html(response.data.html);
          }
          $container.css('opacity', '1');
        },
        error: function() {
          $container.css('opacity', '1');
        }
      });
    });

    // Mobile Bottom Bar Active Link Tracker
    var currentPath = window.location.pathname;
    $('.pabd-bottom-nav a').each(function() {
      if ($(this).attr('href') === currentPath) {
        $(this).addClass('text-[#FF2D95]');
      }
    });
  });
})(jQuery);
`
  }
];

export const WORDPRESS_SETUP_GUIDE = `
# Pink Aura BD — WordPress & Astra Child Theme Setup Guide

## 1. Prerequisites
- WordPress 6.2+ installed and running PHP 8.1+
- Astra Theme (Free or Pro) installed and active in Appearance > Themes

## 2. Installing the Child Theme
1. In your WordPress root, navigate to \`wp-content/themes/\`.
2. Create directory: \`astra-child-pink-aura\`.
3. Place \`style.css\` and \`functions.php\` into the child theme root directory.
4. Create the \`template-parts\` folder and upload \`video-card.php\`.
5. Upload \`front-page.php\`, \`single-video.php\`, \`archive-video.php\`, and \`taxonomy-video_category.php\`.
6. Create an \`assets/js/\` directory and place \`pink-aura.js\` inside.
7. Go to **Appearance > Themes** in WP Admin and activate **Astra Child - Pink Aura BD**.

## 3. Registering Video Content & Taxonomies
1. Navigate to **Videos > Add New**.
2. Enter the title and description.
3. In the **Video Categories** taxonomy box on the right, assign or create terms:
   - Bangladeshi
   - Pakistani
   - Indian
   - TikToker
   - Trending Now
4. Set the **Featured Image** (16:9 ratio recommended, 1280x720 or 1920x1080).
5. In Custom Fields:
   - \`_pabd_embed_url\`: Full URL to MP4 or authorized embed.
   - \`_pabd_quality\`: 4K, 1080p, or HD.
   - \`_pabd_duration\`: e.g., 4:18.
   - \`_pabd_is_featured\`: Set to 1 for carousel hero slides.
   - \`_pabd_trending_score\`: 0-100 score for trending velocity.

## 4. Configuring Homepage
1. Go to **Settings > Reading**.
2. Under "Your homepage displays", choose "A static page".
3. Select the page you created with the template **Pink Aura BD Homepage** (\`front-page.php\`).

## 5. Adsterra Ad Network Integration
### A. Popunder Ads
Place your Adsterra Popunder script in \`header.php\` right before \`</head>\`, or via \`functions.php\`:
\`\`\`php
add_action('wp_head', function() {
    echo "<!-- Adsterra Popunder -->\\n<script type='text/javascript' src='//your-adsterra-popunder-url.js'></script>\\n";
});
\`\`\`

### B. Social Bar Ads
Social Bar delivers high CTR on mobile and desktop. Paste right before \`</body>\` in \`footer.php\`:
\`\`\`php
add_action('wp_footer', function() {
    echo "<!-- Adsterra Social Bar -->\\n<script type='text/javascript' src='//your-adsterra-socialbar-url.js'></script>\\n";
});
\`\`\`

### C. Native Banner & 728x90 Banners
- **Homepage Native Banner**: Paste your 4-widget Adsterra Native Banner script between Section B (Trending) and Section C (Regions) in \`front-page.php\`.
- **Under-Player Banner**: Paste your 728x90 (or 300x250) banner code right beneath the video player in \`single-video.php\`.

### D. Direct Link (Smartlink)
Connect your high-converting Adsterra Direct Link URL to secondary action buttons, such as "⚡ Fast 4K Mirror (Direct)" or "Server 2" buttons inside \`single-video.php\`:
\`\`\`html
<a href="https://your-adsterra-direct-link-url" target="_blank" rel="noopener noreferrer" class="pabd-btn-direct">
  ⚡ Fast 4K Mirror (Direct)
</a>
\`\`\`
`;
