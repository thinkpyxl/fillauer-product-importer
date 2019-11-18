import csv from 'csv-parse'
console.log('client-side script executed')

// Globals to define spreadsheet column names

const PICname = "PIC"


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

function buildProductObj(attrRow, productRow){
    const productObj = {}    

    // no returns for map since I'm building a new object
    productRow.map((val, ind) => {
        if(val !== '')
            productObj[attrRow[ind]] = val
    })
    return productObj
}


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
    return updates
}

function updateProducts(newProducts){
    return true
}

// Parent Product functions

// Variations to parents functions

function processCSV(parentCSV, variationCSV, existingProducts){

    const attributes = parentCSV[0]

    if(!attributes.includes(PICname)){
        window.alert(`Make sure your spreadsheet's "Parent ID" ie "PIC" attribute is using the name "${PICname}" VERBATIM`)
        return false
    }
    const importedProducts = buildProductObj(parentCSV)
    
    // Traverse through variations and build product series object
    const productSeries = buildProductSeries(attributes, variationCSV)
    console.log(productSeries)
    const productUpdates = findProductChanges(productSeries, existingProducts)

    updateProducts(productUpdates)

}



//  Main loop
async function init(){
    const statusElm = document.querySelector('.import_status');
    const importBtn = document.querySelector('#import_button');
    const parentFileInput = document.querySelector('#parent_file_input');
    const variationFileInput = document.querySelector('#variation_file_input');
    const testBtn = document.querySelector("#test_button")
    let existingProducts = null

    // Block, Pull existing products, continue
    console.log("Fetching for existing products...")
    await fetcher('https://fillauer.test/wp-json/acf/v3/product')
        .then(data => existingProducts = data)

    console.log(`${existingProducts.length} products have been found in the WP database.`) 
    console.log(existingProducts)
    console.log("Waiting for input file with product updates...")

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
                body: JSON.stringify({ title: 'Hello Moon', content: '', excerpt:'' })
            }
        ).then(response => response.json().then(console.log)).catch(console.log)
    })

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