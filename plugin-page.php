<!-- Heavy help from https://makitweb.com/programmatically-file-upload-from-custom-plugin-in-wordpress/ -->

<p><b>Status: </b> <span class='import_status'>Waiting for a parent and variations CSV file.</span></p>


<div class="container">
  <div class="parent panel">
    <div class="overlay">
      <img src="https://via.placeholder.com/150" alt="">
    </div>
    <input id='parent_file_input' type='file' name='parent_file'>
    <!-- <label for='parent_file'>Parent Products CSV file</label> -->
  </input>
  </div>
  <div class="variation panel">
    <input id='variation_file_input' type='file' name='variation_file'>
  </div>
  <div class="package panel">
    <input id='package_file_input' type='file' name='package_file'>
  </div>
</div>

<div class="old">
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
</div>
