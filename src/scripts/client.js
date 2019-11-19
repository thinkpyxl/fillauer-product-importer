/* eslint-disable camelcase */
/* eslint-disable no-undef */
import csv from 'csv-parse';
console.log('client-side script executed');

// Globals to define spreadsheet column names,
//     in case something is changed later.
const f_type = 'Type';
const f_name = 'Name';
const f_sku = 'SKU';
const f_pic = 'PIC';
const f_cat = 'tax:product_cat';
const f_desc = 'Description';
const f_short_desc = 'Short Description';

//   The attribute column right before specifications start
const b_SpecsStart = 'Specification Start';
const b_SpecsEnd = 'Specification End';

// Status is updated in several functions
const statusElm = document.querySelector('.import_status');

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

async function fetcher(url, obj) {
  // Some boilerplate for fetch calls
  return await fetch(url, obj)
    .then(res => {
      return res.json();
    })
    .catch(console.error);
}

function buildSpecs(attrRow) {
  let startIndex = -1;
  let endIndex = -1;

  return attrRow
    .map((val, ind) => {
      // Search for beginning
      if (val === b_SpecsStart) {
        startIndex = ind;
        return false;
      }
      // We haven't started or we have already ended
      if (-1 === startIndex || -1 !== endIndex) {
        return false;
      }

      // If inside of loop, return every value until the end (b_SpecsEnd) is found
      if (val === b_SpecsEnd) {
        endIndex = ind;
        return false;
      }
      // If nothing worthy is found and we're still inside, we're tracking all Specification labels
      return val;
    })
    .filter(val => {
      if (val) return true;
    });
  // .push([startIndex, endIndex]);     // Do we want these indices?
}

function buildProductObjs(attrRow, rows, verbose = false) {
  // This will go through a CSV and create an array
  //   of product objects keyed to the attribute name

  // Splice to avoid first row of attribute names
  const products = rows.splice(1).map(row => {
    const product = {};
    row.map((val, ind) => {
      if ('' !== val) product[attrRow[ind]] = val;
    });

    // TODO: remove this debug line for production
    if (verbose) console.log(product);

    // Ignore blank rows or incomplete products
    if (product !== undefined && product[f_name] && product[f_pic]) {
      return product;
    }
  });
  return products.filter(prod => prod !== undefined);
}

// I need to use a linter...
function keyByPIC(prods) {
  const ProdByPIC = {};
  prods.map(val => {
    if (!val) {
      return false;
    }

    if (!ProdByPIC[val[f_pic]]) {
      ProdByPIC[val[f_pic]] = [];
    }

    ProdByPIC[val[f_pic]] = val;

    return val;
  });

  return ProdByPIC;
}

function findCollisionsWithProducts(newProds, existing) {
  if (!existing) return [];
  const rv = existing
    .map(val => {
      if (newProds[val.acf.PIC]) return val.id;
      else return false;
    })
    .filter(val => {
      if (val) return true;
    });
  console.log(rv);
  return rv;
}

function linkVariations(parents, varies) {
  varies.map(val => {
    if (!parents[val[f_pic]].variations) {
      parents[val[f_pic]].variations = [];
    }

    parents[val[f_pic]].variations.push(val);
  });

  return parents;
}

// Used for creating meta object with grouped specifications
function filterMeta(prod) {
  return prod;
  // TODO pull out specification values
  // Object.keys(prod).map((attr, ind) => {});
}

function deleteProduct(postID, verbose = false) {
  return new Promise((resolve, reject) => {
    if (!postID) {
      reject(postID);
    }
    fetch(`${wpApiSettings.root}wp/v2/product/${postID}`, {
      method: 'delete',
      headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        resolve(res);
        if (verbose) console.log(res);
      })
      .catch(console.error);
  });
}

function deleteProducts(prods) {
  return prods.map(id => {
    return deleteProduct(id, true);
  });
}

async function POSTproducts(prods, existingProducts) {
  // return console.log(Object.values(prods))
  const Nprod = Object.keys(prods).length;
  let cnt = 0;

  //  Traverse through variations and build product series object
  const collidingProducts = findCollisionsWithProducts(prods, existingProducts);
  if (0 < collidingProducts.length) {
    statusElm.textContent = `Product collisions found. Deleting ${collidingProducts.length} products...`;
  }
  await Promise.all(deleteProducts(collidingProducts)).then(status => {
    console.log('finished deleting');
  });

  statusElm.textContent = `Uploading products: ${cnt} of ${Nprod} received`;

  Object.values(prods).map(val => {
    const metaPack = filterMeta(val);

    fetcher(`${wpApiSettings.root}wp/v2/product`, {
      method: 'post',
      headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: val[f_name],
        content: val[f_desc],
        excerpt: val[f_short_desc],
        status: 'publish',
        meta: metaPack,
      }),
    })
      .then(res => {
        console.log(res);
        statusElm.textContent = `Uploading products: ${++cnt} of ${Nprod} received`;
      })
      .catch(console.error);
  });
}

function processCSV(parentCSV, variationCSV) {
  // The first row containing attribute names will CONSTantly be referenced
  const parentAttr = parentCSV[0];
  const variationAttr = variationCSV[0];

  if (!parentAttr.includes(f_pic) || !variationAttr.includes(f_pic)) {
    window.alert(`Make sure your spreadsheet's "Parent ID" ie "PIC" attribute is using the name "${f_pic}" VERBATIM`);
    return false;
  }

  const specLabels = buildSpecs(parentAttr);
  console.log('Specification Labels', specLabels);

  const importedProducts = buildProductObjs(parentAttr, parentCSV);
  const importedVariations = buildProductObjs(variationAttr, variationCSV);

  const productsByPIC = keyByPIC(importedProducts);

  const products = linkVariations(
    productsByPIC,
    importedVariations,
  );

  statusElm.textContent = `Products have been processed. ${
    Object.keys(products).length
  } unique PICs found`;

  return products;
}

async function readFilePromise(fileHandler) {
  // And another shoutout to this link https://blog.shovonhasan.com/using-promises-with-filereader/
  const reader = new FileReader();
  reader.readAsText(fileHandler);

  return new Promise((resolve, reject) => {
    reader.onerror = function() {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    reader.onload = function() {
      csv(reader.result, {}, function(err, output) {
        if (err) console.err('CSV parser failed: ', err);
        else resolve(output);
      });
    };
  });
}

//  Main loop, async to allow blocking
async function init() {
  const importBtn = document.querySelector('#import_button');
  const createBtn = document.querySelector('#create_button');
  const parentFileInput = document.querySelector('#parent_file_input');
  const variationFileInput = document.querySelector('#variation_file_input');
  const testBtn = document.querySelector('#test_button');
  let existingProducts = null;
  let newProducts = null;

  //* //////////////////////////////////////////////////////////////////////
  //    Pull existing products, continue
  console.log('Fetching for existing products...');

  // Using the '&page' query parameter, build a pagination functionality that
  //    GETs until there are no more products left.
  //    another shoutout: https://dev.to/jackedwardlyons/how-to-get-all-wordpress-posts-from-the-wp-api-with-javascript-3j48
  // headers:{
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Expose-Headers': 'x-wp-total'
  // }
  await fetcher(`${wpApiSettings.root}wp/v2/product?per_page=100`).then(
    data => (existingProducts = data),
  );

  console.log(`${existingProducts.length} products have been found in the WP database.`);
  console.log(existingProducts);

  //* //////////////////////////////////////////////////////////////////////
  //    Test POST Call
  testBtn.addEventListener('mouseup', ev => {
    ev.preventDefault();
    // Lance magic
    fetch(`${wpApiSettings.root}wp/v2/product`, {
      method: 'post',
      headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Hello Moon',
        content: '',
        excerpt: '',
        status: 'publish',
        meta: { sku: 'asdf', product_type: 'simple', pid: '12452364' },
      }),
    })
      .then(response => response.json().then(console.log))
      .catch(console.log);
  });

  //* //////////////////////////////////////////////////////////////////////
  //    IMPORT EVENT

  // TODO: Call this event once all the files are specified, removing need for btn
  console.log('Waiting for input file with product updates...');

  importBtn.addEventListener('mouseup', ev => {
    ev.preventDefault();

    // props to https://javascript.info/file#filereader
    const parentFileHandler = parentFileInput.files[0];
    const variationFileHandler = variationFileInput.files[0];

    if (parentFileHandler === undefined) {
      window.alert('Specify a parent product file first');
      return false;
    }
    if (variationFileHandler === undefined) {
      window.alert('Specify a variations file first');
      return false;
    }

    // Order matters for the sake of passing to processCSV 7 lines below
    const readPromises = [
      readFilePromise(parentFileHandler),
      readFilePromise(variationFileHandler),
    ];

    Promise.all(readPromises).then(CSVs => {
      newProducts = processCSV(...CSVs);
    });
  });

  createBtn.addEventListener('mouseup', ev => {
    if (!newProducts) {
      window.alert('Import a product sheet first');
      return false;
    }
    POSTproducts(newProducts, existingProducts);
  });
  //* //////////////////////////////////////////////////////////////////
  //
}

document.addEventListener('DOMContentLoaded', init);

//* /////////////////////////////////////
//         Testing WP API calls
//* /////////////////////////////////////
// Log possible routes
// fetcher('https://fillauer.test/wp-json')
//     .then(data=>console.log(data))
