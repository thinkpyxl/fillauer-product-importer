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

// function theme_options_panel(){
//     add_menu_page('Theme page title', 'Theme menu label', 'manage_options', 'theme-options', 'wps_theme_func');
//     add_submenu_page( 'theme-options', 'Settings page title', 'Settings menu label', 'manage_options', 'theme-op-settings', 'wps_theme_func_settings');
//     add_submenu_page( 'theme-options', 'FAQ page title', 'FAQ menu label', 'manage_options', 'theme-op-faq', 'wps_theme_func_faq');
//   }
//   add_action('admin_menu', 'theme_options_panel');
   
function uploadfile(){
    include 'upload-file.php';
}
function product_import_page(){
    echo '<h2>welcome to my plugin. Snacks are in the back</h2>';
    uploadfile();
}
//   function wps_theme_func(){
//           echo '<div class="wrap"><div id="icon-options-general" class="icon32"><br></div>
//           <h2>Theme</h2></div>';
//   }
//   function wps_theme_func_settings(){
//           echo '<div class="wrap"><div id="icon-options-general" class="icon32"><br></div>
//           <h2>Settings</h2></div>';
//   }
//   function wps_theme_func_faq(){
//           echo '<div class="wrap"><div id="icon-options-general" class="icon32"><br></div>
//           <h2>FAQ</h2></div>';
//   }