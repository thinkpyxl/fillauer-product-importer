
import { variationSlice } from './filters';
import { fetcher, incrementProgress } from './utils.js';
import { f } from './fields';

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

async function POSTproduct(val) {
  // val = verifyFields(val);   // Until this is used... If this is used...
  const payload = JSON.stringify({
    title: val[f.name],
    content: val[f.desc],
    excerpt: val[f.short_desc],
    status: 'visible' === val[f.visibility] ? 'publish' : 'draft',
    terms: val.terms,
    meta: {
      SKU: 'simple' === val[f.type] ? val[f.sku] : '',
      PIC: val[f.pic],
      order_info: val[f.orderInfo] ? val[f.orderInfo] : '',
      product_type: val[f.type],
      product_hash: val.checksum, // Used for finding changes between new imports and wp posts
      main_model: val[f.main_model] ? val[f.main_model] : 'E',
      pnf: val[f.pnf] ? '1' === val[f.pnf] : false,
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
  });
  // console.log('product payload', payload);
  return fetcher(`${wpApiSettings.root}wp/v2/product`, {
    method: 'post',
    headers: {
      'X-WP-Nonce': wpApiSettings.nonce,
      'Content-Type': 'application/json',
    },
    body: payload,
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

async function POSTproducts(prods, toDelete, toIgnore, toIgnoreBtn) {
  // return console.log(Object.values(prods))
  const Nprod = Object.keys(prods).length - toIgnore.length;

  //  Traverse through variations and build product series object
  if (0 === Nprod) {
    // statusElm.textContent = 'A new product has not been detected. Nothing to upload.';
  } else if (0 < toDelete.length) {
    // statusElm.textContent = `Product collisions found. Deleting ${toDelete.length} products...`;
  }

  await Promise.all(deleteProducts(toDelete)).then(
    status => {
      console.log('finished deleting', status);
    },
  );

  //   statusElm.textContent = `Uploading products: 0 of ${Nprod} received`;
  console.log('toIgnore', toIgnore, toIgnore.includes(Object.values(prods)[0][f.pic]));
  console.log('toPOST products', Object.values(prods));

  let toPOST;
  if (toIgnoreBtn.checked) {
    toPOST = Object.values(prods).filter(prod => !toIgnore.includes(prod[f.pic]));
  } else {
    toPOST = Object.values(prods); // Debug line
  }
  console.log('toPOST filtered', toPOST);

  //  POST loop
  while (0 < toPOST.length) {
    console.log('posting...');
    await POSTproduct(toPOST.splice(0, 1)[0]);
  }
}

export { POSTproduct, POSTproducts }
;
