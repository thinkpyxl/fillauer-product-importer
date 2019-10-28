<?php
$csv_shorthand = array_map('str_getcsv', file('shorthand.csv'));

$csv_product = array_map('str_getcsv', file('lower-extreme-variations.csv'));
?>
<body style='background-color: #13ce66;'>
<main style='opacity: 0;'>
<p id='shorthand-data'>
    <?php echo json_encode($csv_shorthand, JSON_FORCE_OBJECT); ?>
</p>
<?php
?>
<p id='product-data'>
    <?php echo json_encode($csv_product, JSON_FORCE_OBJECT); ?>
</p>
<script src='client.js'></script>
</main>
</body>
<?php
//* // // // // // // // // //
//    PHP CSV Parsing loops
// foreach($csv_array as $row){
//     foreach($row as $val){
//         echo $val;
//     }
// };
//* // // // // // // // // //
?>