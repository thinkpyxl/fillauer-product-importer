/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { f } from './fields.js';
import { computeChecksum, compareHashesForPayload, keyByPIC, linkVariations, linkPackages, verifyFields, verifyFiles } from './filters.js';
import { fetcher, readFilePromise } from './utils.js';
import { POSTproducts } from './rest.js';
import { buildProductObjs } from './products';

console.log('client-side script executed');

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

//
// TODO: Find the specs that vary across variations; Product Number Generator
// function findVariationSpecs(variations)

function processCSV(parentCSV, variationCSV, packageCSV, statusElm) {
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

  const productsWithPackages = linkPackages(productsWithVariations, packageCSV);
  console.log('packaged ', productsWithPackages);

  statusElm.textContent = `Products have been processed. ${
    Object.keys(productsWithPackages).length
  } unique PICs found`;

  // LAST STEP: Once all products are COMPLETELY assembled, save hash for checksum
  const products = computeChecksum(productsWithPackages);

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

  // Status is updated in several functions.
  //    Is it okay to be global is the name is long enough to avoid collisions?
  //    Obviously here it isn't, but I want to get around passing to every function.
  const importerStatusElement = document.querySelector('.import_status');

  //* //////////////////////////////////////////////////////////////////////
  //    Pull existing products, continue
  console.log('Fetching for existing products...');

  // Using the '&page' query parameter, build a pagination functionality that
  //    GETs until there are no more products left.
  //    another shout-out: https://dev.to/jackedwardlyons/how-to-get-all-wordpress-posts-from-the-wp-api-with-javascript-3j48

  importerStatusElement.textContent = 'Reading existing products...';
  await fetcher(`${wpApiSettings.root}wp/v2/product?per_page=100`).then(
    data => {
      existingProducts = data;
      importerStatusElement.textContent = `${existingProducts.length} products have been found in the WP database.`;
      console.log(
        `${existingProducts.length} products have been found in the WP database.`, existingProducts,
      );
    },
  );

  //* //////////////////////////////////////////////////////////////////////
  //    Test POST Call
  testBtn.addEventListener('mouseup', () => {
    importerStatusElement.textContent = 'Reading existing products...';
    fetcher(`${wpApiSettings.root}wp/v2/product?per_page=100`).then(
      data => {
        existingProducts = data;
        importerStatusElement.textContent = `${existingProducts.length} products have been found in the WP database.`;
        console.log(
          `${existingProducts.length} products have been found in the WP database.`, existingProducts,
        );
      });
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
      newProducts = processCSV(...CSVs, importerStatusElement);
      console.log('finished processing');
    });
  });

  createBtn.addEventListener('mouseup', ev => {
    if (!newProducts) {
      window.alert('Import a product sheet first');
      return false;
    }
    const [toDelete, toIgnore] = compareHashesForPayload(newProducts, existingProducts);
    POSTproducts(newProducts, toDelete, toIgnore);
  });
}

document.addEventListener('DOMContentLoaded', init);
