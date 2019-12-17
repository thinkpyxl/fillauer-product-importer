/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { f } from './fields.js';
import { computeChecksum, filterExisting, compareHashesForPayload, keyByPIC, linkVariations, linkPackages, verifyFields, verifyFiles } from './filters.js';
import { fetcher, readFilePromise } from './utils.js';
import { deleteProducts, POSTproducts, getExistingProducts } from './rest.js';
import { buildProductObjs, optimizeProducts } from './products';

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

  const productsOptimized = optimizeProducts(productsWithPackages);

  statusElm.textContent = `Products have been processed. ${
    Object.keys(productsOptimized).length
  } unique PICs found`;

  // LAST STEP: Once all products are COMPLETELY assembled, save hash for checksum
  const products = computeChecksum(productsOptimized);

  return products;
}

//  Main loop, async to allow blocking
async function init() {
  const importBtn = document.querySelector('#import_button');
  const parentFileInput = document.querySelector('#parent_file_input');
  const variationFileInput = document.querySelector('#variation_file_input');
  const packageFileInput = document.querySelector('#package_file_input');
  const testBtn = document.querySelector('#test_button');
  const ignoreBtn = document.querySelector('#ignore_button');
  const PICspecifier = document.querySelector('#specific_product');
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
  await getExistingProducts().then(
    data => {
      existingProducts = filterExisting(data);
      importBtn.disabled = false;
      importerStatusElement.textContent = `${Object.keys(existingProducts).length} products have been found in the WP database.`;
      console.log(
        `${Object.keys(existingProducts).length} products have been found in the WP database.`, existingProducts,
      );
    },
  );

  //* //////////////////////////////////////////////////////////////////////
  //    Test POST Call
  testBtn.addEventListener('mouseup', () => {
    importerStatusElement.textContent = 'Reading existing products...';
    getExistingProducts().then(
      data => {
        existingProducts = filterExisting(data);
        importBtn.disabled = false;
        importerStatusElement.textContent = `${Object.keys(existingProducts).length} products have been found in the WP database.`;
        console.log(
            `${Object.keys(existingProducts).length} products have been found in the WP database.`, existingProducts,
        );
      },
    );
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

    // Prevent additional imports. Enable once the new products have been uploaded and DB has been re-fetched.
    importBtn.disabled = true;

    Promise.all(readPromises).then(CSVs => {
      newProducts = processCSV(...CSVs, importerStatusElement);
      console.log('finished processing', Object.keys(newProducts));
      const [toDelete, toPost] = compareHashesForPayload(newProducts, existingProducts, ignoreBtn.checked, PICspecifier.value);
      console.log('toDelete and toPost', toDelete, toPost);

      deleteProducts(toDelete)
        .then(status => {
          console.log('finished deleting', status);
          POSTproducts(newProducts, toPost, importerStatusElement).then((savedN) => {
            if (0 === savedN) {
              importerStatusElement.textContent = 'New products were not detected.';
            } else {
              importerStatusElement.textContent = `${savedN} have finished uploading.`;
            }
            importBtn.disabled = false;
          });
        });
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
