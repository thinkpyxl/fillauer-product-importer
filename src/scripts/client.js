console.log('client-side script executed')
// Utitlity Functions
function range2array(start, end) {
    if(start === end) return [start];
    return [start, ...range2array(start + 1, end)];
}

function removeVal(arr, toRemove){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === toRemove){
            arr.splice(i,1)
            return arr
        }
    }
}
//* ////////////////////////////////////////////////////

function run(){
    const statusElm = document.querySelector('.import_status');
    try{
        const products = JSON.parse(php_product_data.product_data)
    }
    catch{
        return false;
    }
    const productValues = Object.values(products)
    
    // Create attribute to index lookup object
    let attributes = {}
    let attributeValues = Object.values(products[0])
    for(let i = 0; i < attributeValues.length; i++){
        attributes[products[0][i]] = i
    }
    console.log(attributes)
    
    
    
    // Keyed on parent id
    let productSeries = {}
    
    // Prod will be a single product's row
    function attachAttributes(attrRow, prod){
        let prodObj = {}
        prod = Object.values(prod)
        for(let i = 0; i < prod.length; i++){
            // Specified cells only
            if(prod[i] !== ""){
                prodObj[attrRow[i]] = prod[i]
            }
        }
        return prodObj
    }
    
    
    // Traverse through products and build product series object
    for(let i = 1; i < productValues.length; i++){
        let crntRow = products[i]
        let prod = attachAttributes(attributeValues, products[i])
    
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
    
    let seriesArray = Object.keys(productSeries)
    for(let i = 0; i < seriesArray.length; i++){
        let series = productSeries[seriesArray[i]]
        let variationAttrs = []
        let suspectAttr = range2array(0, attributeValues.length)
    
        let prevElem = series[0]
        // Traverse products within a series
        for(let j = 1; j < series.length; j++){
            // Traverse attributes
            for(let a = 0; a < series[j].length; a++){
                // if()
                if(series[j][a] !== prevElem[a]){
                    confirmedVariationsIndices.append(a)
                    suspectAttr = removeVal(suspectAttr, a)
                }
           }
           prevElem = series[j]
    
        }
    }
}

// run()
function parsecsv(RAW){
    // Analyze first row
    console.log(RAW)
    let c = ''
    let value = ''
    let valueN = 0
    let rowsN = 0
    let prod = {}
    let rows = {}
    let ignoreComma = false
    // cols
    for(let i = 0; i < RAW.length; i++){
        try {
            c = RAW[i]
        } catch { return rows }

        if(c === '"'){
            ignoreComma = !ignoreComma
        }
        else if(!ignoreComma & c === ','){
            prod[valueN++] = value
            value = ''
        }
        else if(c === '\n'){
            prod[valueN++] = value
            value = ''
            rows[rowsN++] = prod
            prod = {}
        }
        // Building onto the same value
        else{
            value += c
        }
    }
    return rows
}
document.addEventListener('DOMContentLoaded', ()=>{
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
            console.log(reader.result);
            const products = parsecsv(reader.result)
            console.log(products)
        };

    })

})