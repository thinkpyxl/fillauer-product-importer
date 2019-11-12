import csv from 'csv-parse'
console.log('client-side script executed')
//* ////////////////////////////////////////////////////


function run(existingProducts){
    const statusElm = document.querySelector('.import_status');
    const importBtn = document.querySelector('#import_button');
    const fileInput = document.querySelector('#file_input');

    console.log(`${existingProducts.length} products have been found in the WP database.`) 
    console.log(existingProducts)
    console.log("Waiting for input file with product updates...")

    importBtn.addEventListener('mouseup', ev => {
        ev.preventDefault();
        // props to https://javascript.info/file#filereader
        let fileHandler = fileInput.files[0];
        let reader = new FileReader();
      
        reader.readAsText(fileHandler);
        
        reader.onload = function() {
            csv(reader.result, {}, function(err, output){
                if(err) console.err("CSV parser failed: ",err)
                else processCSV(output, existingProducts)
            })
        };

    })
}
//   Mizner notes
//                  https://wordpress.org/plugins/acf-to-rest-api/
        // Testing:
        // 1. Define static object with anticipated schema
        // 2. Send XHR/Ajax/fetch (consider axios or similar) POST request to WP REST API 
        // 3. Handle errors

        // Ultimately:
        // 1. Get all data to iterate through
        // 2. Iterate
        // 2.1 Format data in current iteration
        // 2.2 Send XHR/Ajax/fetch (consider axios or similar) POST request to WP REST API
        // 2.2 Handle errors.


function buildProductObj(attrRow, productRow){
    const productObj = {}    

    // no returns for map since I'm building a new object
    productRow.map((val, ind) => {
        if(val !== '')
            productObj[attrRow[ind]] = val
    })
    return productObj
}

const PICname = "Parent ID"

function buildProductSeries(attrRow, inputCSV){
    const productSeries = {}

    inputCSV.splice(1).map((val) => {
        const prod = buildProductObj(attrRow, val)
        if(!prod){
            console.log(val)
        }

        // Ignore blank rows or fake products
        if(prod === {} || prod[PICname] == undefined ) return false
        
        
        // New keys for new series introduced
        if(!productSeries[prod[PICname]]){
            productSeries[prod[PICname]] = []
            productSeries[prod[PICname]].push(prod)
        } 
        else{
            productSeries[prod[PICname]].push(prod)
        }
    })

    if(Object.values(productSeries).length < 1){
        console.error("No products series were created :(")
    }
    return productSeries
}
function findProductChanges(updates){
    return true
}

function updateProducts(newProducts){
    return true
}

function processCSV(csv, existingProducts){

    const attributes = csv[0]

    if(!attributes.includes(PICname)){
        window.alert(`Make sure your spreadsheet Parent ID ie PIC attribute is using the name "${PICname}" VERBATIM`)
        return false
    }
    
    
    // Traverse through products and build product series object
    const productSeries = buildProductSeries(attributes, csv)
    console.log(productSeries)
    const productUpdates = findProductChanges(productSeries, existingProducts)

    updateProducts(productUpdates)

}

async function fetcher(url){
    return await fetch(url)
    .then( res => {
        return res.json()
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    // Run once the data as been fetched.
    console.log("Fetching for existing products...")
    fetcher('https://fillauer.test/wp-json/acf/v3/product')
        .then(data=>run(data))
})