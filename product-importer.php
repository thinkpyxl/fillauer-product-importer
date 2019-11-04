<?php 
/**
 * Plugin Name: Product Importer
 * Description: Import a CSV file to update products on the database
 */


//  Create menu
function importer_menu(){
    add_menu_page("Product Importer", "Product Importer", "manage_options", "product-options", "product_import_page");
    add_submenu_page("Product Importer", "Product Importer", "Product Importer", "Product Importer", "Product Importer");
}

add_action('admin_menu', 'importer_menu');
function register_processor(){
    wp_register_script('product-import-processor', plugins_url('dist/scripts/client.js',__FILE__), '1.0.0', true);
    // wp_localize_script('product-import-processor', 'php_vars', array(
    //     'test' => 'yay',
    // ));
    wp_enqueue_script('product-import-processor');
}

add_action('admin_enqueue_scripts', 'register_processor');
// do_action('admin_enqueue_scripts', 'register_processor');


function product_import_page(){
    echo '<h2>Welcome to my plugin. Snacks are in the back</h2>';
    include 'upload-file.php';
}