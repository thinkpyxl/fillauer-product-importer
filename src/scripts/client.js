import csv from 'csv-parse'
console.log('client-side script executed')
//* ////////////////////////////////////////////////////

function run(){
    const statusElm = document.querySelector('.import_status');
    const importBtn = document.querySelector('#import_button');
    const fileInput = document.querySelector('#file_input');
    console.log(fileInput)

    importBtn.addEventListener('mouseup', ev => {
        ev.preventDefault();
        // props to https://javascript.info/file#filereader
        let fileHandler = fileInput.files[0];
        let reader = new FileReader();
      
        reader.readAsText(fileHandler);
        
        reader.onload = function() {
            csv(reader.result, {}, function(err, output){
                if(err) console.err("CSV parser failed: ",err)
                else processCSV(output)
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

function processCSV(csv){

    const attributes = csv[0]

    if(!attributes.includes(PICname)){
        window.alert(`Make sure your spreadsheet Parent ID ie PIC attribute is using the name "${PICname}" VERBATIM`)
        return false
    }
    
    console.log(attributes)
    
    // Keyed on parent id
    

    
    // Traverse through products and build product series object

    // const productObjs
    const productSeries = buildProductSeries(attributes, csv)
    console.log(productSeries)
    return false

    // 
    //    Product Number Generation
    //
    // With seperated product series and complete product objects, 
    //     go by a specific series and find varying attributes.
    
    let seriesArray = Object.keys(productSeries)
    for(let i = 0; i < seriesArray.length; i++){
        let series = Object.values(productSeries[seriesArray[i]])
        console.log(series)
        let seriesVariations = []
        let prevElem = Object.values(series[0])

        // Traverse products within a series
        for(let j = 1; j < series.length; j++){
            let prod = Object.values(series[j])
            // Traverse attributes
            for(let a = 0; a < prod.length; a++){
                if(a === 0){
                    console.log(`comparing ${prod[a]} and ${prevElem[a]}`)
                }
                if(prod[a] !== prevElem[a]){
                    // confirmedVariationsIndices.push(a)
                    seriesVariations.push(attributes[a])
                }
           }
           prevElem = prod
        }
        console.log(seriesArray[i], seriesVariations)
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    run()
})