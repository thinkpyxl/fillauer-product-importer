# fillauer-product-importer
## Gameplan
This will be an interface within the WP-admin panel
A CSV file will be imported and recieved by the server. Once PHP has the file for parsing, PHP will need to serve the following information back to client-side JS 
  1. A JSON of the CSV files.
        * Parent and variation files
  2. Any existing parent products. A quick parse will find if any existing parent ID's are being used.
        * If new variations are added or a parent product is being updated, the corresponding parent will be needed. 
  3. The list of shorthands


JS will go through the JSON of new products
   1. follow variation products under scope of parent products
   2. find varying attributes, look-up shorthands or mark where new short hands are needed (temporary value to come back to).
   3. construct individual products for each variation
   4. POST all new products through WP API


## Testing
`php -S localhost:8000` will serve `index.php` where the JSON dump of the CSVs lie in the DOM. The JS simply reads from the DOM now, but will be converted to an API fetch later in development. 