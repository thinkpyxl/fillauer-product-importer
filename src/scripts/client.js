import csv from 'csv-parse'
console.log('client-side script executed')

// Globals to define spreadsheet column names, 
//     in case something is changed later.
const f_type = "Type"
const f_name = 'Name'
const f_sku = 'SKU'
const f_pic = "PIC"


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

async function fetcher(url){
    // Some boilerplate for fetch calls
    return await fetch(url)
    .then( res => {
        return res.json()
    })
    .catch(console.error)
}

function buildProductObjs(attrRow, rows, verbose=false){
    // This will go through a CSV and create an array
    //   of product objects keyed to the attribute name
    return rows.filter((row) => {
        const product = {}
        row.map((val, ind) => {
            if(val !== '')
                product[attrRow[ind]] = val
        })

        // TODO: remove this debug line for production
        if(verbose) console.log(product)

        // Ignore blank rows or incomplete products
        if(product !== undefined && product[f_name] && product[f_pic]){
            return product
        } 
        return false
    })
}


function buildProductSeries(attrRow, prods){
    const ProdBySKU = {}

    return prods.map(val => {

        if( !ProdBySKU[val[f_pic]] ){
            ProdBySKU[val[f_pic]] = []
        }
        ProdBySKU[val[f_pic]] = val
        return val 
    })


    inputCSV.splice(1).map((val) => {
        const prod = buildProductObj(attrRow, val)
        if(!prod){
            console.log(val)
        }

        
        
        // New keys for new series introduced
        if(!productSeries[prod[f_pic]]){
            productSeries[prod[f_pic]] = []
            productSeries[prod[f_pic]].push(prod)
        } 
        else{
            productSeries[prod[f_pic]].push(prod)
        }
    })

    if(Object.values(productSeries).length < 1){
        console.error("No products series were created :(")
    }
    return productSeries
}
function findProductChanges(updates){
    return updates
}

function updateProducts(newProducts){
    return true
}

// Parent Product functions

// Variations to parents functions

// By linking variations to parent product objects, 
//      am I making the compare process (wp vs csv) easier?

//  Necessary as I will make whole products to POST with 
//      information from both parent and variation
function linkVariations(prods, varies){
    return prods.map((val) => {
        
    })
}

function processCSV(parentCSV, variationCSV, existingProducts){

    // The first row containing attribute names will CONSTantly be referenced
    const parentAttr = parentCSV[0]
    const variationAttr = variationCSV[0]

    if(!parentAttr.includes(f_pic) || !variationAttr.includes(f_pic)){
        window.alert(`Make sure your spreadsheet's "Parent ID" ie "PIC" attribute is using the name "${f_pic}" VERBATIM`)
        return false
    }
    const importedProducts = buildProductObjs(parentAttr, parentCSV)
    const importedVariations = buildProductObjs(variationAttr, variationCSV)
    
    console.log(importedProducts)
    console.log(importedVariations)
    const productsByPIC = buildProductSeries(parentAttr, importedProducts)
    // console.log(pr)

    // const products = linkVariations(importedProducts, importedVariations)

    return false
    // Traverse through variations and build product series object
    const productSeries = buildProductSeries(attributes, variationCSV)
    console.log(productSeries)
    const productUpdates = findProductChanges(productSeries, existingProducts)

    updateProducts(productUpdates)

}



//  Main loop, async to allow blocking
async function init(){
    const statusElm = document.querySelector('.import_status');
    const importBtn = document.querySelector('#import_button');
    const parentFileInput = document.querySelector('#parent_file_input');
    const variationFileInput = document.querySelector('#variation_file_input');
    const testBtn = document.querySelector("#test_button")
    let existingProducts = null


    //* //////////////////////////////////////////////////////////////////////
    //    Pull existing products, continue
    console.log("Fetching for existing products...")

    await fetcher('https://fillauer.test/wp-json/wp/v2/product')
        .then(data => existingProducts = data)


    console.log(`${existingProducts.length} products have been found in the WP database.`) 
    console.log(existingProducts)


    //* //////////////////////////////////////////////////////////////////////
    //    Test POST Call
    testBtn.addEventListener('mouseup', ev => {
        ev.preventDefault();
        // Lance magic
        fetch(
            `${wpApiSettings.root}wp/v2/product`,
            {
                method: 'post',
                headers: {
                    'X-WP-Nonce': wpApiSettings.nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title: 'Hello Moon', 
                    content: '', 
                    excerpt: '' , 
                    status: 'publish', 
                    meta: {sku: 'asdf', product_type:'simple', pid:'12452364'}
                })
            }
        ).then(response => response.json().then(console.log)).catch(console.log)
    })

    //* //////////////////////////////////////////////////////////////////////
    //    IMPORT EVENT

    console.log("Waiting for input file with product updates...")

    importBtn.addEventListener('mouseup', ev => {
        ev.preventDefault();

        // props to https://javascript.info/file#filereader
        const parentFileHandler = parentFileInput.files[0];
        const variationFileHandler = variationFileInput.files[0];

        if(parentFileHandler == undefined){
            window.alert("Specify a parent product file first")
            return false
        }
        if(variationFileHandler == undefined){
            window.alert("Specify a variations file first")
            return false
        }

        // Order matters for the sake of passing to processCSV 7 lines below
        const readPromises = [
            readFilePromise(parentFileHandler), 
            readFilePromise(variationFileHandler)
        ]

        Promise.all(readPromises).then(CSVs=>{
            processCSV(...CSVs, existingProducts)
        })


    })


}

async function readFilePromise(fileHandler){
    // And another shoutout to this link https://blog.shovonhasan.com/using-promises-with-filereader/
        let reader = new FileReader();
        reader.readAsText(fileHandler);
        
        return new Promise((resolve, reject)=>{
            reader.onerror = function(){
                reader.abort();
                reject(new DOMException('Problem parsing input file.'))
            }
            reader.onload = function() {
                csv(reader.result, {}, function(err, output){
                    if(err) console.err("CSV parser failed: ",err)
                    else resolve(output)
                })
            };

        })

}

document.addEventListener('DOMContentLoaded', init)

    //* /////////////////////////////////////
    //         Testing WP API calls
    //* /////////////////////////////////////
    // Log possible routes
    // fetcher('https://fillauer.test/wp-json')
    //     .then(data=>console.log(data))