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

async function fetcher(url, obj){
    // Some boilerplate for fetch calls
    return await fetch(url, obj)
    .then( res => {
        return res.json()
    })
    .catch(console.error)
}

function buildProductObjs(attrRow, rows, verbose=false){
    // This will go through a CSV and create an array
    //   of product objects keyed to the attribute name

    // Splice to avoid first row of attribute names
    const products = rows.splice(1).map((row) => {
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
    })
    return products.filter(prod => prod !== undefined)
}


// I need to use a linter...
function keyByPIC( prods ){
    const ProdByPIC = {}
    prods.map(val => {
        if(!val){
            return false
        }

        if( !ProdByPIC[val[f_pic]] ){
            ProdByPIC[val[f_pic]] = []
        }

        ProdByPIC[val[f_pic]] = val

        return val 
    })

    return ProdByPIC
}


function findCollisionsWithProducts(newProds, existing){
    return false
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
function linkVariations(parents, varies){

    varies.map((val) => {
        if(!parents[val[f_pic]].variations) {
            parents[val[f_pic]].variations = []
        }

        parents[val[f_pic]].variations.push(val)

    })

    return parents

}

function POSTproducts(prods){
    // return console.log(Object.values(prods))
    Object.values(prods).map(val => { 
        fetcher(
            `${wpApiSettings.root}wp/v2/product`,
            {
                method: 'post',
                headers: {
                    'X-WP-Nonce': wpApiSettings.nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title: val[f_name], 
                    content: '', 
                    excerpt: '' , 
                    status: 'publish', 
                    meta: {pic: val[f_pic] , product_type:val[f_type], Quantity:'1'}
                })
            }
        )
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
    
    console.log('importedProducts', importedProducts)
    console.log('importedVariations', importedVariations)

    const productsByPIC = keyByPIC(importedProducts)
    console.log('parent productsByPIC ', productsByPIC)

    const products = linkVariations(productsByPIC, importedVariations)
    console.log('complete products with variations', products)


    //! Question !!!!
    //  Do we want to save all the parent data inside of each variation post?
    //    updateVariations(products)

    //  Traverse through variations and build product series object
    const collidingProducts = findCollisionsWithProducts(products, existingProducts)

    POSTproducts(products)

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


document.addEventListener('DOMContentLoaded', init)

    //* /////////////////////////////////////
    //         Testing WP API calls
    //* /////////////////////////////////////
    // Log possible routes
    // fetcher('https://fillauer.test/wp-json')
    //     .then(data=>console.log(data))