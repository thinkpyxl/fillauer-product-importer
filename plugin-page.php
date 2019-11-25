<!-- Heavy help from https://makitweb.com/programmatically-file-upload-from-custom-plugin-in-wordpress/ -->

<h1>Upload File</h1>
<p>Select a parent product sheet and it's corresponding variations sheet.</p>
<p><b>Status: </b> <span class='import_status'>Waiting for a parent and variations CSV file.</span></p>
<form name='product_file_importer' enctype='multipart/form-data'>
      <input id='test_button' type='button' name='test_button' value='Test POST'>
      <br>
      <label for='parent_file'>Parent Products</label>
      <input id='parent_file_input' type='file' name='parent_file'>
      <br>
      <label for='variation_file'>Variation Products</label>
      <input id='variation_file_input' type='file' name='variation_file'>
      <br>
      <label for='package_file'>Package Information</label>
      <input id='package_file_input' type='file' name='package_file'>
      <br>
      <input id='import_button' type='button' name='import_button' value='Import'>
      <input id='create_button' type='button' name='create_button' value='Create Products'>
</form>
