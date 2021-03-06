<!-- Heavy help from https://makitweb.com/programmatically-file-upload-from-custom-plugin-in-wordpress/ -->

<h1>Upload File</h1>
<p>Select a parent product sheet and it's corresponding variations sheet.</p>
<div>
  <b>Region Lock: </b> 
  <h2 style="display: inline;"> <?php echo ICL_LANGUAGE_CODE; ?> </h2>
  Only products in this region/language (check the WP top bar) will be imported.
</div>
<p><b>Status: </b> <span class='import_status'>Waiting for a parent and variations CSV file.</span></p>
<form name='product_file_importer' enctype='multipart/form-data'>
      <div class='form-field'>
        <input id='test_button' type='button' name='test_button' value='Refresh Existing Products'>
      </div>
      <div class='form-field'>
        <label for='force_button'>Force Update</label>
        <input id='force_button' type='checkbox' name='force_button' value=''>
      </div>
      <div class='form-field'>
        <label for='parent_file'>Parent Products CSV file</label>
        <input id='parent_file_input' type='file' name='parent_file'>
      </div>
      <div class="form-field">
        <label for='variation_file'>Variation Products CSV file</label>
        <input id='variation_file_input' type='file' name='variation_file'>
      </div>
      <div class="form-field">
        <label for='package_file'>Package Information CSV file</label>
        <input id='package_file_input' type='file' name='package_file'>
      </div>
      <div class="form-field">
        <input id='import_button' type='button' name='import_button' value='Import' disabled=true>
      </div>
</form>
