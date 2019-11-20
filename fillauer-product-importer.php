<?php 
/**
 * Plugin Name: Fillauer Product Importer
 * Description: Import a CSV file to update products on the database
 */


//  Create menu
function importer_menu(){
    add_menu_page("Product Importer", "Product Importer", "manage_options", "product-options", "product_import_page");
    add_submenu_page("Product Importer", "Product Importer", "Product Importer", "Product Importer", "Product Importer");
}

function register_processor(){
    wp_register_script('product-import-processor', plugins_url('dist/scripts/client.js',__FILE__), '1.0.0', true);

    // Pass nounce for WP API Authentication
    wp_localize_script( 'product-import-processor', 'wpApiSettings', array(
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' )
    ) );
    wp_enqueue_script('product-import-processor');
}

add_action( 'rest_api_init', function () {
    register_rest_field( 'product', 'meta', array(
        'get_callback' => function( $data ) {
            $listing_obj = get_post_meta( $data['id'], '', false );
            return $listing_obj;
        },
        'update_callback' => function($value, $listing_obj, $field_name ) {
            foreach ($value as $key => $value) {
                if($key == 'specs'){
                    error_log(print_r($value, TRUE));
                    // error_log(print_r(json_decode($value), TRUE));
                }
                update_post_meta($listing_obj->ID, $key, $value);
            }
            return true;
        },
         'schema' => null,
    ) );
    register_rest_field( 'product', 'terms', array(
        'get_callback' => function( $data ) {
            $prod = get_post_meta( $data['id'], '', false );
            return $prod;
        },
        'update_callback' => function($value, $prod, $field_name ) {

            foreach ($value as $key => $value) {
                error_log(print_r($key, TRUE));
                error_log(print_r($value, TRUE));
                if( !taxonomy_exists($key) ){
                    error_log('Taxonomy: '.$key.' not found');
                    // Register new taxonomy?
                }
                else {
                    error_log('Taxonomy: '.$key.' found');
                    wp_set_object_terms($prod->ID, $value, $key);
                }


                // error_log(print_r(json_decode($value), TRUE));
            }
            // update_post_meta($listing_obj->ID, $key, $value);
            return true;
        },
         'schema' => null,
    ) );
} );


add_action('admin_menu', 'importer_menu');
add_action('importer_enqueue_scripts', 'register_processor');
//          ^^^ is creating a new action like this ok?
//                     Just to call it on plugin page, like below


function product_import_page(){
    do_action('importer_enqueue_scripts');  
    echo '<h2>Welcome to my plugin. Snacks are in the back</h2>';
    include 'plugin-page.php';
}