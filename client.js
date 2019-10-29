const shorthandsJSON = document.getElementById('shorthand-data').textContent
const productsJSON = document.getElementById('product-data').textContent

let shorthands = JSON.parse(shorthandsJSON)
let products = JSON.parse(productsJSON)

// If this operation is done more than 3 times, consider making new object keyed
function findAttrColPos(haystack, needle){
    haystack = Object.values(haystack[0])
    console.log(haystack)
    for(let i = 0; i < haystack.length; i++){
        if(haystack[i] === needle)
            return i
    }
    return -1
}

let parentIdPos = findAttrColPos(products, "Parent ID")

// Keyed on parent id
let productSeries = {}

function attachAttributes(attrRow, product){
    for(let i = 0; i < prod.length; i++){
        // Specified cells only
        if(product[i] !== ""){

        }
    }
}

// Traverse through products and build product series
for(let i = 1; i < products.length; i++){
    let crntProd = products[i]
    let prod = attachAttributes(products[0], crntProd)
    if(productSeries[prod['Parent ID']] !== undefined){
        // Existing product series

    }
    else{
        // New product series
        productSeries[prod['Parent ID']] = []
        let prodObj = {}
        productSeries[prod['Parent ID']].append()

    }
}

// With seperated product series and complete product objects, 
//     go by a specific series and find varying attributes.
let seriesArray = Object.keys(productSeries)
for(let i = 0; i < seriesArray.length; i++){
    let series = productSeries[seriesArray[i]]
    let variationAttrs = []
    let prevElem = series[0]
    // Traverse products
    for(let j = 1; j < series.length; j++){
        // Traverse attributes
       for(let a = 0; a < series[j].length; a++){

       }

    }
}

console.log(Object.values(products))
