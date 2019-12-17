<?php
/**
 * Plugin Name: Fillauer Product Importer
 * Description: Import a CSV file to update products on the database
 * Version: 1.6.2
 */


//  Create menu
function importer_menu() {
	add_menu_page( 'Product Importer', 'Product Importer', 'manage_options', 'product-options', 'product_import_page' );
	add_submenu_page( 'Product Importer', 'Product Importer', 'Product Importer', 'Product Importer', 'Product Importer' );
}

function register_processor() {
	wp_register_script( 'product-import-processor', plugins_url( 'dist/scripts/client.js', __FILE__ ), '1.0.0', true );
	wp_register_style( 'product-import-styles', plugins_url( 'dist/styles/global.css', __FILE__ ), '1.0.0', true );

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
	wp_enqueue_style( 'product-import-styles');
}

function update_variations( $value, $prod, $field_name ){

	// New JSON
	/*
		variations = [
			{
				sku: 143-342-AC
				name: 'asdf'
				image: false
				indent: ''
				specs: {
					color: 'blue',
					weight: '10 g'
				}
			},
			{
				sku: 143-342-DF
				name: 'fdsa'
				image: 424
				indent: ''
				specs: {
					color: 'red',
					weight: '8 g'
				}
			}
		]
	*/

	// error_log('Variation global dump: '.print_r($value,true));
	$spec_labels = $value['labels'];
  $json = array();
	foreach ( $value['varies'] as $key => $varies ) {
		// Create Variation
		
		if( !array_key_exists('sku', $varies) ){
			error_log('sku not found');
			continue;
		}
		$group = array(
			'sku'  => $varies['sku'],
			'name' => $varies['name'],
			'image' => array_key_exists('image', $varies) ? $varies['image'] : false,
			'indention' => array_key_exists('indent', $varies) ? $varies['indent'] : '',
			'specs' => [],
		);

		// Add Specifications for each variation entry
		if(array_key_exists('specs', $varies)){

			foreach ( $varies['specs'] as $index => $val ) {
				// return true;
				if($val === '') continue;
				$spec = [
					'spec_label' => $spec_labels[$index],
					'spec_value' => $val
				];
				array_push($group['specs'], $spec);
			}
		}
		else{
			error_log('Variation update fail: '.print_r($varies, true));
		}
		array_push( $json, $group );
	}
	update_field( 'variation_json', json_encode($json), $prod->ID );
	return true;
};

function update_gallery( $value, $prod, $field_name ) {
	$featured = true;
	foreach( $value as $item ){ 
		if ( $featured && ! strpos( $item, 'http' ) ) {
			set_post_thumbnail( $prod->ID, $item );
		}
		add_row('gallery_list', ['asset_id' => $item], $prod->ID );

		$featured = false;
	}
}

function update_warranty( $value, $prod, $field_name ) {
	if(array_key_exists('body', $value)){
		update_field('warranty_body', $value['body'], $prod->ID);
	}
	if(array_key_exists('list', $value)){
		foreach( $value['list'] as $item ){ 
			add_row('warranty_list', ['warranty_item' => $item], $prod->ID );
		}
	}
}

function update_features( $value, $prod, $field_name ) {
	foreach( $value as $item ){ 
		add_row('product_feats', ['product_feat' => $item], $prod->ID );
	}
}

function update_related_products( $value, $prod, $field_name ) {
	foreach( $value as $item ){ 
		add_row('related_products', ['related_product' => $item], $prod->ID );
	}
}

function update_indications( $value, $prod, $field_name ) {
	foreach( $value as $item ){ 
		add_row('indication_list', ['indication_item' => $item], $prod->ID );
	}
}

function update_downloads( $value, $prod, $field_name ) {
	foreach( $value as $item ){ 
		if( array_key_exists('title', $item) && array_key_exists('url', $item)){
			add_row('download_list', [
				'download' => [
					'title' => $item['title'], 
					'url' => $item['url']
				]
			], $prod->ID );
		}
	}
}


function update_specs( $value, $prod, $field_name ) {
	// error_log( 'specs ' . print_r( $value, true ) );
	foreach ( $value as $key => $val ) {

		// error_log( 'specs key' . print_r( $key, true ) );
		// error_log( 'specs val' . print_r( $val, true ) );
		
		$group[] = [
			'spec_label' => $key,
			'spec_value' => $val['val'],
			'logo'       => array_key_exists('icon', $val) ? $val['icon'] : 'cog',
			'featured'   => array_key_exists('featured', $val) ? $val['featured'] : false,
		];
		update_field( 'specifications', $group, $prod->ID );
	}
	return true;
}

function update_packages( $value, $prod, $field_name ) {

	// error_log( 'package ' . print_r( $value, true ) );
	$package_index = 1;
	foreach ( $value as $key => $value ) {
		// error_log( 'package key ' . print_r( $key, true ) );
		// error_log( 'package value ' . print_r( $value, true ) );
		// Read product_info to find which fields to toggle
		$descOn = false;
		$featsOn = false;
		$imageOn = false;
		$table_image = false;
		if( key_exists( 'image', $value )){
			$table_image = $value['image'];
		}
		foreach ( $value['product_info'] as $val ) {
			switch($val){
				case 'name': 
					$descOn = true;
				break;
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
			'product_info_name'        => $descOn,
			'product_info_description' => $descOn,
			'product_info_features'    => $featsOn,
			'product_info_image'       => $imageOn,
			'table_image'              => $table_image,
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
}

function update_taxonomies( $value, $prod, $field_name ) {

	foreach ( $value as $key => $val ) {
		if ( taxonomy_exists( $key ) ) {

			// Checks that hierarchal terms exist before associating with product.
			if ( 'product_cat' === $key ) {
				foreach ($val as $cat){
					$terms = explode( '>', $cat );
					if ( ! empty( $terms ) ) {
						$parent_term = '';
						$insert = [];
						foreach ( $terms as $term ) {
							$term = trim( $term );
							if ( ! term_exists( $term, 'product_cat' ) ) {
								$args = [];
								// If parent is not empty creates this term as a child of the parent.
								if ( ! empty( $parent_term ) ) {
									$parent_term = get_term_by( 'name', $parent_term, 'product_cat' );
									$args = [
										'parent' => $parent_term->term_id,
									];
								}

								// Inserts the term.
								wp_insert_term( $term, 'product_cat', $args );
							}
							$term_object = get_term_by( 'name', $term, 'product_cat' );

							$insert[]    = $term_object->term_id;
							$parent_term = $term;
						}
						// Attaches all terms at once.
						wp_set_object_terms( $prod->ID, $insert, $key, true);
					}
				}
			} else {
				// Just attach it to this product.
				wp_set_object_terms( $prod->ID, $val, $key );
			}
		} else {
			if ( function_exists( '_log' ) ) {
				_log( 'Line Number: ' . __LINE__ . ' - Taxonomy ' . $key . ' does not exist.' );
			}
		}
	}
	return true;
}


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
					error_log('Receiving product: '.print_r($value['PIC'], TRUE));
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
			'gallery',
			[
				'update_callback' => 'update_gallery',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'specs',
			[
				'update_callback' => 'update_specs',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'packages',
			[
				'update_callback' => 'update_packages',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'variations',
			[
				'update_callback' => 'update_variations',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'warranty',
			[
				'update_callback' => 'update_warranty',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'related',
			[
				'update_callback' => 'update_related_products',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'features',
			[
				'update_callback' => 'update_features',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'indications',
			[
				'update_callback' => 'update_indications',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'downloads',
			[
				'update_callback' => 'update_downloads',
				'schema'          => null,
			]
		);
		register_rest_field(
			'product',
			'terms',
			[
				'update_callback' => 'update_taxonomies',
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
	include 'plugin-page.php';
}
