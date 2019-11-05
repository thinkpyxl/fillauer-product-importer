<!-- Heavy help from https://makitweb.com/programmatically-file-upload-from-custom-plugin-in-wordpress/ -->

<h1>Upload File</h1>
<form name='product_file_importer' enctype='multipart/form-data'>
      <input id='file_input' type='file' name='file'>
      <br>
      <input id='import_button' type='button' name='import_button' value='Submit'>
</form>


<?php
function run_processor($file_path){
    $file_data    = json_encode(array_map('str_getcsv', file($file_path)));

    wp_register_script('product-import-processor', plugins_url('assets/client.js',__FILE__), '1.0.0', true);
    wp_localize_script('product-import-processor', 'php_product_data', array(
        'product_data' => $file_data,
    ));
    wp_enqueue_script('product-import-processor');
    
}

// File reciever
if(isset($_POST['import_button'])){

  if($_FILES['file']['name'] != ''){
    $uploadedfile = $_FILES['file'];
    echo "<p>File Received: ".$uploadedfile['name']."</p>";
    echo "<p class='import_status'>Processing...</p>";

    // run_processor($uploadedfile['tmp_name']);
    echo "<div class='results'></div>";
  }
 
}

?>