import csv from 'csv-parse'
console.log('client-side script executed', csv)
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
function processCSV(csv){

    let attributes = csv[0]

    console.log(attributes)
    
    // Keyed on parent id
    let productSeries = {}
    
    // Prod will be a single product's row
    function keyByAttributes(attrRow, prod){
        let prodObj = {}
        for(let i = 0; i < prod.length; i++){
            // Specified cells only
            if(prod[i] !== ""){
                prodObj[attrRow[i]] = prod[i]
            }
        }
        return prodObj
    }
    
    
    // Traverse through products and build product series object
    for(let i = 1; i < csv.length; i++){
        let crntRow = csv[i]
        let prod = keyByAttributes(attributes, crntRow)
    
        // New product series
        if(productSeries[prod['Parent ID']] === undefined){
            productSeries[prod['Parent ID']] = []
        }
    
        productSeries[prod['Parent ID']].push(prod)
    }
    
    console.log(productSeries)
    
    // 
    //    Product Number Generation
    //
    // With seperated product series and complete product objects, 
    //     go by a specific series and find varying attributes.
    
    return true;
    let seriesArray = Object.keys(productSeries)
    for(let i = 0; i < seriesArray.length; i++){
        let series = productSeries[seriesArray[i]]
        let variationAttrs = []
    
        let prevElem = series[0]
        // Traverse products within a series
        for(let j = 1; j < series.length; j++){
            // Traverse attributes
            for(let a = 0; a < series[j].length; a++){
                // if()
                if(series[j][a] !== prevElem[a]){
                    confirmedVariationsIndices.append(a)
                }
           }
           prevElem = series[j]
    
        }
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    run()
})