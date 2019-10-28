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


console.log(Object.values(products))
