<h1>Upload File</h1>

<!-- Form -->
<form method='post' action='' name='myform' enctype='multipart/form-data'>
  <table>
    <tr>
      <td>Upload file</td>
      <td><input type='file' name='file'></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type='submit' name='import_button' value='Submit'></td>
    </tr>
  </table>
</form>


<?php

// File reciever
if(isset($_POST['import_button'])){

  if($_FILES['file']['name'] != ''){
    $uploadedfile = $_FILES['file'];
    echo "<p>File Received: ".$uploadedfile['name']."</p>";
    echo "<p class='dot-loading'>Processing...</p>";
  }
 
}

?>