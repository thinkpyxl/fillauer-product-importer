<?php 
/**
 * Plugin Name: Product Importer
 * Description: Import a CSV file to update products on the database
 */

//  Create menu
function importer_menu(){
    add_menu_page("Product Importer");
}

add_action('admin_menu', 'importer_menu');