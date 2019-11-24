/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { f } from './fields.js';
import { findSpecBounds, findSpecIcons, findCollisionsWithProducts, keyByPIC, linkVariations, verifyFields } from './filters.js';
import { fetcher, deleteProducts, readFilePromise } from './utils.js';

console.log('client-side script executed');

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

function buildProductObjs(attrRow, rows, verbose = false) {
  // This will go through a CSV and create an array
  //   of product objects keyed to the attribute name
  const [start, end] = findSpecBounds(attrRow);
  const icons = findSpecIcons(attrRow, rows[1]);

  // Splice to avoid first two rows of attribute names and icons
  const products = rows.splice(1).map(row => {
    const product = {};
    product.specs = {};
    row.map((val, ind) => {
      if ('' !== val) {
        // Specification or generic product information
        if (start < ind && ind < end) {
          product.specs[attrRow[ind]] = [];
          // Value
          product.specs[attrRow[ind]].push(val);

          // Icon
          product.specs[attrRow[ind]].push(icons[attrRow[ind]]);

          // Featured or Additional
          // if (val.include('*')) {
          //   product.specs[attrRow[ind]].push(true);
          // } else {
          //   product.specs[attrRow[ind]].push(false);
          // }
        } else {
          product[attrRow[ind]] = val;
        }
      }
    });

    // TODO: remove this debug line for production
    if (verbose) console.log(product);

    // Ignore blank rows or incomplete products
    if (product !== undefined && product[f.name] && product[f.pic]) {
      return product;
    }
  });
  return products.filter(prod => prod !== undefined);
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
  await Promise.all(deleteProducts(collidingProducts)).then(
    status => {
      console.log('finished deleting');
    },
  );

  statusElm.textContent = `Uploading products: ${cnt} of ${Nprod} received`;

  Object.values(prods)
    .map(val => {
      verifyFields(val);
      fetcher(`${wpApiSettings.root}wp/v2/product`, {
        method: 'post',
        headers: {
          'X-WP-Nonce': wpApiSettings.nonce,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: val[f.name],
          content: val[f.desc],
          excerpt: val[f.short_desc],
          status: 'visible' === val[f.visibility] ? 'publish' : 'draft',
          terms: { // TODO: endpoint for taxonomies
            product_cat: [val[f.cat]],
            product_tag: [val[f.tag]],
          },
          meta: {
            SKU: val[f.sku],
            PIC: val[f.pic],
            product_type: val[f.type],
          },
          specs: val.specs,
          variations: val.variations,
          /* packages: [
            {
              label: 'Fitting Tools',
              model: 'A',
              pic: 5012,
              skus: ['123-AD', '243-BC'],
              headers: ['color', 'size'],
              product_info: [
                'description', '
                image'
              ]
            },
          ],  */
        }),
      })
        .then(res => {
          console.log(res);
          statusElm.textContent = `Uploading products: ${++cnt} of ${Nprod} received`;
        })
        .catch(console.error);
    });
}

// Find the specs that vary across variations
// TODO: Finish
// function findVariationSpecs(variations) {

function processCSV(parentCSV, variationCSV) {
  // The first row containing attribute names will CONSTantly be referenced
  const parentAttr = parentCSV[0];
  const variationAttr = variationCSV[0];

  if (!parentAttr.includes(f.pic) || !variationAttr.includes(f.pic)) {
    window.alert(
      `Make sure your spreadsheet's "Parent ID" ie "PIC" attribute is using the name "${f.pic}" VERBATIM`,
    );
    return false;
  }

  const importedProducts = buildProductObjs(parentAttr, parentCSV);
  const importedVariations = buildProductObjs(variationAttr, variationCSV);
  console.log('imported', importedProducts, importedVariations);

  const productsByPIC = keyByPIC(importedProducts);

  const products = linkVariations(productsByPIC, importedVariations);
  console.log('assembled ', products);

  statusElm.textContent = `Products have been processed. ${
    Object.keys(products).length
  } unique PICs found`;

  return products;
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

  await fetcher(`${wpApiSettings.root}wp/v2/product?per_page=100`).then(
    data => (existingProducts = data),
  );

  console.log(
    `${existingProducts.length} products have been found in the WP database.`,
  );
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
        meta: { sku: 'asdf', product_type: 'simple', pic: '12452364' },
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
}

document.addEventListener('DOMContentLoaded', init);
