/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { f } from './fields.js';
import { findSpecBounds, findSpecIcons, findCollisionsWithProducts, keyByPIC, linkVariations, linkPackages, verifyFields, verifyFiles, buildSpec } from './filters.js';
import { fetcher, deleteProducts, readFilePromise, testCall } from './utils.js';
import hash from 'object-hash';

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

function buildProductObjs(attrRow, rows) {
  // This will go through a CSV and create an array
  //   of product objects keyed to the attribute name
  const [start, end] = findSpecBounds(attrRow);
  const icons = findSpecIcons(attrRow, rows[1]);

  // Splice to avoid first two rows of attribute names and icons
  const products = rows.splice(1).map(row => {
    const product = {};
    product.specs = {};
    product.terms = {};
    product.packages = [];
    row.map((val, ind) => {
      const specLabel = attrRow[ind];
      if ('' !== val) {
        // Specification or generic product information
        const spec = buildSpec(start, end, ind, val, icons[specLabel]);
        if (spec) {
          product.specs[specLabel] = spec;
        } else {
          // Generic product info
          product[specLabel] = val;
        }
      }
    });
    product.terms.product_cat = [product[f.cat]];
    product.terms.product_tag = product[f.tag] ? product[f.tag] : ''
      .split(',').map(term => term.trim());

    // Ignore blank rows or incomplete products
    if (product !== undefined && product[f.name] && product[f.pic]) {
      return product;
    }
  });
  return products.filter(prod => prod !== undefined);
}

async function POSTvariations(POSTid, varies, depth = 1) {
  console.log(`Posting more variations at a depth of ${depth}`);
  await fetcher(`${wpApiSettings.root}wp/v2/product/${POSTid}`, {
    method: 'post',
    headers: {
      'X-WP-Nonce': wpApiSettings.nonce,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variations: varies.splice(0, 24), // The best value for preventing large variation POST crashes
    }),

  }).then(res => {
    if (res && 0 !== varies.length && 20 > depth) {
      return POSTvariations(POSTid, varies, depth + 1);
    }
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
  await Promise.all(deleteProducts(collidingProducts)).then(
    status => {
      console.log('finished deleting');
    },
  );

  statusElm.textContent = `Uploading products: ${cnt} of ${Nprod} received`;

  Object.values(prods)
    .map(val => {
      // val = verifyFields(val);   // Until this is used...
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
          terms: val.terms,
          meta: {
            SKU: 'simple' === val[f.type] ? val[f.sku] : '',
            PIC: val[f.pic],
            product_type: val[f.type],
          },
          specs: val.specs,
          variations: val.variations ? val.variations.splice(0, 40) : [],
          // warranty: val[f.warranty] ,
          packages: Object.values(val.packages), // Keys only used for construction
          // checksum: hash(val), // Used for finding changes between new imports and wp posts
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
          // Confirm that the POST was ok before adding variations
          if (undefined !== res &&
              val.variations &&
              0 !== val.variations.length
          ) {
            POSTvariations(res.id, val.variations, 1).then(() => {
              statusElm.textContent = `Uploading products: ${++cnt} of ${Nprod} received`;
            });
          } else {
            statusElm.textContent = `Uploading products: ${++cnt} of ${Nprod} received`;
          }
        })
        .catch(console.error);
    });
}

//
// TODO: Find the specs that vary across variations; Product Number Generator
// function findVariationSpecs(variations)

function processCSV(parentCSV, variationCSV, packageCSV) {
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

  const productsWithVariations = linkVariations(productsByPIC, importedVariations);

  const products = linkPackages(productsWithVariations, packageCSV);
  console.log('packaged ', products);

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
  const packageFileInput = document.querySelector('#package_file_input');
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
  testBtn.addEventListener('mouseup', testCall);

  //* //////////////////////////////////////////////////////////////////////
  //    IMPORT EVENT

  // TODO: Call this event once all the files are specified, removing need for btn
  console.log('Waiting for input file with product updates...');

  importBtn.addEventListener('mouseup', ev => {
    ev.preventDefault();

    // props to https://javascript.info/file#filereader
    const parentFileHandler = parentFileInput.files[0];
    const variationFileHandler = variationFileInput.files[0];
    const packageFileHandler = packageFileInput.files[0];

    if (!verifyFiles(parentFileHandler, variationFileHandler, packageFileHandler)) {
      return false;
    }

    // Order matters for the sake of passing to processCSV 7 lines below
    const readPromises = [
      readFilePromise(parentFileHandler),
      readFilePromise(variationFileHandler),
      readFilePromise(packageFileHandler),
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
