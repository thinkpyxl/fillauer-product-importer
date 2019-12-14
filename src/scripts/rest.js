
import { variationSlice } from './filters';
import { fetcher, incrementProgress } from './utils.js';
import { f } from './fields';

async function getExistingProducts() {
  const pages = [];
  let crntPage, pagesN;
  crntPage = 1;
  pagesN = 20;

  // Fetch first page to find total pages
  pages.push(
    ...await fetch(`${wpApiSettings.root}wp/v2/product?per_page=100&page=1`)
      .then(res => {
        pagesN = res.headers.get('x-wp-totalpages');
        console.log(`Total Pages: ${pagesN}`);
        return res.json();
      })
      .catch(console.error),
  );

  // Fetch the rest of pages
  while (crntPage++ < pagesN) {
    pages.push(
      ...await fetch(`${wpApiSettings.root}wp/v2/product?per_page=100&page=${crntPage}`)
        .then(res => res.json())
        .catch(err => console.error(err, pages)),
    );
  }
  return pages;
}

// Delete a product, ?force to ensure permanent deletion
function deleteProduct(postID, verbose = false) {
  return new Promise((resolve, reject) => {
    if (!postID) {
      reject(postID);
    }
    fetch(`${wpApiSettings.root}wp/v2/product/${postID}?force=true`, {
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

async function POSTproduct(val) {
  // val = verifyFields(val);   // Until this is used... If this is used...
  const payload = {
    title: val[f.name],
    content: val[f.desc],
    excerpt: val[f.short_desc],
    status: val[f.visibility],
    terms: val.terms,
    meta: {
      SKU: val[f.sku],
      PIC: val[f.pic],
      order_info: val[f.orderInfo],
      product_type: val[f.type],
      product_hash: val.checksum, // Used for finding changes between new imports and wp posts
      main_model: val[f.main_model],
      part_number_finder: val[f.pnf],
    },
    specs: val.specs,
    gallery: val.gallery,
    variations: val.variations ? variationSlice(val.variations, 0) : [], // .splice(0, 40) : [],
    warranty: val.warranty,
    features: val.features,
    indications: val.indications,
    downloads: val.downloads,
    related: val.related,
    packages: Object.values(val.packages ? val.packages : {}), // Keys only used for construction
  };

  // console.log('product payload', payload);
  return fetcher(`${wpApiSettings.root}wp/v2/product`, {
    method: 'post',
    headers: {
      'X-WP-Nonce': wpApiSettings.nonce,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(res => {
      console.log(res);
      // Confirm that the POST was ok before adding variations
      if (undefined !== res &&
              val.variations &&
              1 < val.variations.varies.length
      ) {
        return POSTvariations(res.id, val.variations, 1).then(() => {
          incrementProgress();
        });
      } else {
        incrementProgress();
      }
    })
    .catch(console.error);
}

async function POSTvariations(POSTid, varies, depth = 1) {
  console.log(`Posting more variations at a depth of ${depth}`);
  const payload = JSON.stringify({
    variations: variationSlice(varies, depth),
  });
  // console.log('variations payload: ', payload);
  return fetcher(`${wpApiSettings.root}wp/v2/product/${POSTid}`, {
    method: 'post',
    headers: {
      'X-WP-Nonce': wpApiSettings.nonce,
      'Content-Type': 'application/json',
    },
    body: payload,

  }).then(res => {
    if (res && depth + 1 !== varies.varies.length && 16 > depth) {
      return POSTvariations(POSTid, varies, depth + 1);
    }
  });
}

async function POSTproducts(prods, toPost, statusElm) {
  const Nprod = toPost.length;
  let currentProduct;

  statusElm.textContent = `Uploading products: 0 of ${Nprod} received`;

  console.log('toPOST filtered', toPost);

  //  POST loop
  while (0 < toPost.length) {
    console.log('posting...');
    statusElm.textContent = `Uploading products: ${toPost.length} of ${Nprod} received`;
    currentProduct = prods[toPost.splice(0, 1)];
    await POSTproduct(currentProduct);
  }
  return Nprod;
}

export { deleteProducts, POSTproducts, getExistingProducts };
