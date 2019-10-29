// Utitlity Functions
function range2array(start, end) {
    if(start === end) return [start];
    return [start, ...range2array(start + 1, end)];
}

function removeAttrSuspect(arr, toRemove){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === toRemove){
            arr.splice(i,1)
            return arr
        }
    }
}


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

// Prod will be a single product's row
function attachAttributes(attrRow, prod){
    let productObj = {}
    for(let i = 0; i < prod.length; i++){
        // Specified cells only
        if(prod[i] !== ""){
            prodObj[attrRow[i]] = prod[i]
        }
    }
    return prodObj
}


// Traverse through products and build product series object
for(let i = 1; i < products.length; i++){
    let crntRow = products[i]
    let prod = attachAttributes(products[0], crntRow)

    // New product series
    if(productSeries[prod['Parent ID']] == undefined){
        productSeries[prod['Parent ID']] = []
    }

    productSeries[prod['Parent ID']].append(prod)
}

// 
//    Product Number Generation
//
// With seperated product series and complete product objects, 
//     go by a specific series and find varying attributes.
let seriesArray = Object.keys(productSeries)
for(let i = 0; i < seriesArray.length; i++){
    let series = productSeries[seriesArray[i]]
    let variationAttrs = []
    let suspectAttr = range2array(0, products[0].length)

    let prevElem = series[0]
    // Traverse products within a series
    for(let j = 1; j < series.length; j++){
        // Traverse attributes
        for(let a = 0; a < series[j].length; a++){
            // if()
            if(series[j][a] !== prevElem[a]){
                confirmedVariationsIndices.append(a)
                suspectAttr = removeAttrSuspect(suspectAttr, a)
            }
       }
       prevElem = series[j]

    }
}

console.log(range2array(1,4))

console.log(Object.values(products))
