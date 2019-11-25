<?php
/**
 * Plugin Name: Fillauer Product Importer
 * Description: Import a CSV file to update products on the database
 */


//  Create menu
function importer_menu() {
	add_menu_page( 'Product Importer', 'Product Importer', 'manage_options', 'product-options', 'product_import_page' );
	add_submenu_page( 'Product Importer', 'Product Importer', 'Product Importer', 'Product Importer', 'Product Importer' );
}

function register_processor() {
	wp_register_script( 'product-import-processor', plugins_url( 'dist/scripts/client.js', __FILE__ ), '1.0.0', true );

	// Pass nounce for WP API Authentication
	wp_localize_script(
		'product-import-processor',
		'wpApiSettings',
		[
			'root'  => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' ),
		]
	);
	wp_enqueue_script( 'product-import-processor' );
}

// TODO: endpoint for taxonomies

add_action(
	'rest_api_init',
	function () {
		register_rest_field(
			'product',
			'meta',
			[
				'get_callback'    => function( $data ) {
					$listing_obj = get_post_meta( $data['id'], '', false );
					return $listing_obj;
				},
				'update_callback' => function( $value, $listing_obj, $field_name ) {
					// error_log('meta '.print_r($value, TRUE));
					foreach ( $value as $key => $value ) {
						update_post_meta( $listing_obj->ID, $key, $value );
					}
					return true;
				},
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'specs',
			[
				'update_callback' => function( $value, $prod, $field_name ) {
					// error_log( 'specs ' . print_r( $value, true ) );
					foreach ( $value as $key => $val ) {

						// error_log( 'specs key' . print_r( $key, true ) );
						// error_log( 'specs val' . print_r( $val, true ) );
						
						$group[] = [
							'spec_label' => $key,
							'spec_value' => $val['val'],
							'logo'       => $val['icon'],
							'featured'   => $val['featured'],
						];
						update_field( 'specifications', $group, $prod->ID );
					}
					return true;
				},
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'packages',
			[
				'update_callback' => function( $value, $prod, $field_name ) {

					$package_index = 1;
					foreach ( $value as $key => $value ) {
						error_log( 'package key ' . print_r( $key, true ) );
						error_log( 'package value ' . print_r( $value, true ) );
						// Read product_info to find which fields to toggle
						$descOn = false;
						$featsOn = false;
						$imageOn = false;
						foreach ( $value['product_info'] as $val ) {
							switch($val){
								case 'description': 
									$descOn = true;
								break;
								case 'features': 
									$featsOn = true;
								break;
								case 'image': 
									$imageOn = true;
								break;
							}	
						}
						// Create Package
						$group[] = [
							'title'                    => $value['label'],
							'package_pic'              => $value['pic'], 
							'model'                    => $value['model'], 
							'product_info_description' => $descOn,
							'product_info_features'    => $featsOn,
							'product_info_image'       => $imageOn,
						];
						update_field( 'packages', $group, $prod->ID );

						// Add SKUs
						foreach ( $value['skus'] as $val ) {
							add_sub_row(
								[ 'packages', $package_index, 'skus' ],
								[ 'sku' => $val ],
								$prod->ID
							);
						}

						// Add Headers (for model B accessory tables)
						foreach ( $value['specs'] as $val ) {
							add_sub_row(
								[ 'packages', $package_index, 'headers' ],
								[ 'header' => $val ],
								$prod->ID
							);
						}
						$package_index += 1;
					}
					return true;
				},
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'variations',
			[
				'update_callback' => function( $value, $prod, $field_name ) {

					$variation_index = 1;
					foreach ( $value as $key => $value ) {
						// Create Variation
						$group[] = [
							'variation_sku'  => $value['sku'],
							'variation_name' => $value['name'],
						];
						update_field( 'variations', $group, $prod->ID );

						// Add Specifications for each variation entry
						foreach ( $value['specs'] as $label => $val ) {
							add_sub_row(
								[ 'variations', $variation_index, 'variation_specs' ],
								[
									'spec_label' => $label,
									'spec_value' => $val['val'],
									// 'spec_icon'  => $val['icon']   // Not used unless varying specs use an icon
								],
								$prod->ID
							);
						}
						$variation_index += 1;
					}
					return true;
				},
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'terms',
			[
				'update_callback' => function( $value, $prod, $field_name ) {

					foreach ( $value as $key => $value ) {
						if( taxonomy_exists($key) ){
							wp_set_object_terms($prod->ID, $value, $key);
						}
					}
					return true;
				},
				'schema'          => null,
			]
		);

	}
);


add_action( 'admin_menu', 'importer_menu' );
add_action( 'importer_enqueue_scripts', 'register_processor' );
//          ^^^ is creating a new action like this ok?
//                     Just to call it on plugin page, like below


function product_import_page() {
	do_action( 'importer_enqueue_scripts' );
	echo '<h2>Welcome to my plugin. Snacks are in the back</h2>';
	include 'plugin-page.php';
}
