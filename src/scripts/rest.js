
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
        order_info: val[f.orderInfo] ? val[f.orderInfo] : '',
        product_type: val[f.type],
        product_hash: val.checksum, // Used for finding changes between new imports and wp posts
        main_model: val[f.main_model] ? val[f.main_model] : 'E',
      },
      specs: val.specs,
      gallery: val.gallery,
      variations: val.variations ? val.variations.splice(0, 40) : [],
      warranty: val.warranty,
      features: val.features,
      indications: val.indications,
      downloads: val.downloads,
      related: val.related,
      packages: Object.values(val.packages), // Keys only used for construction
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
    variations: varies.splice(0, 24), // The best value for preventing large variation POST crashes
  });
  console.log('variations payload: ', payload);
  await fetcher(`${wpApiSettings.root}wp/v2/product/${POSTid}`, {
    method: 'post',
    headers: {
      'X-WP-Nonce': wpApiSettings.nonce,
      'Content-Type': 'application/json',
    },
    body: payload,

  }).then(res => {
    if (res && 0 !== varies.length && 30 > depth) {
      return POSTvariations(POSTid, varies, depth + 1);
    }
  });
}

async function POSTproducts(prods, toDelete, toIgnore) {
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
  console.log('toPOST products', Object.values(prods));
  const toPOST = Object.values(prods).filter(prod => !toIgnore.includes(prod[f.pic]));
  console.log('toPOST filtered', toPOST);

  // if (toIgnore.includes(val[f.pic])) {
  //   console.log('This product should not be uploaded');
  //   return false;
  // }

  toPOST
    .map(POSTproduct);
}

export { POSTproduct, POSTproducts }
;
