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

function register_processor(){
    wp_register_script('product-import-processor', plugins_url('assets/client.js',__FILE__), '1.0.0', true);
    wp_enqueue_script('product-import-processor');
}

add_action('admin_menu', 'importer_menu');
add_action('admin_enqueue_scripts', 'register_processor');


function product_import_page(){
    do_action('admin_enqueue_scripts', 'register_processor');

    echo '<h2>Welcome to my plugin. Snacks are in the back</h2>';
    include 'upload-file.php';
}