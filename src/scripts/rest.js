
import { variationSlice } from './filters';
import { fetcher, incrementProgress } from './utils.js';
import { f } from './fields';

async function getExistingProducts() {
  const pages = [];
  let crntPage, pagesN;
  crntPage = 1;
  pagesN = 20;

  // Fetch first page to find total pages
  console.log(`Nonce: ${wpApiSettings.nonce}`);

  pages.push(
    ...await fetch(`${wpApiSettings.root}wp/v2/product?per_page=100&page=1&status=draft,publish`,
      {
        method: 'get',
        headers: {
          'X-WP-Nonce': wpApiSettings.nonce,
          'Content-Type': 'application/json',
        },
      },
    )
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
      ...await fetch(`${wpApiSettings.root}wp/v2/product?per_page=100&page=${crntPage}&status=draft,publish`,
        {
          method: 'get',
          headers: {
            'X-WP-Nonce': wpApiSettings.nonce,
            'Content-Type': 'application/json',
          },
        })
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

async function deleteProducts(prods, statuseElm) {
  const responses = [];
  let lastDelete;
  while (0 < prods.length) {
    statuseElm.textContent = `Deleting products. ${prods.length} remain...`;
    lastDelete = await deleteProduct(prods.splice(0, 1)[0], true);
    responses.push(lastDelete);
  }
  return responses;
}

async function POSTproduct(val, updateID = false) {
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
      ordering_info: val[f.orderInfo],
      product_type: val[f.type],
      product_hash: val.checksum, // Used for finding changes between new imports and wp posts
      main_model: val[f.main_model],
      part_number_finder: val[f.pnf],
      search_weight: val[f.searchWeight],
	  documentation_shortcode: val[f.shortCode],
    },
    specs: val.specs,
    gallery: val.gallery,
    variations: val.variations ? variationSlice(val.variations, 0) : [], // .splice(0, 40) : [],
    packages: Object.values(val.packages ? val.packages : {}), // Keys only used for construction
    warranty: val.warranty,
    features: val.features,
    suggested_l_codes: val[f.suggested_l_codes],
    indications: val.indications,
    downloads: val.downloads,
    related: val.related,
    region: val[f.region],
  };


  // console.log('product payload', payload);
  let url = `${wpApiSettings.root}wp/v2/product`;
  if (updateID) {
    url = `${wpApiSettings.root}wp/v2/product/${updateID}`;
  }
  return fetcher(url, {
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

async function POSTproducts(prods, toCreate, toUpdate, statusElm) {
  const Nprod = toCreate.length + toUpdate.length;
  let currentProduct, prodData, prodID;
  let finished = 0;

  statusElm.textContent = `Uploading products: 0 of ${Nprod} received`;

  console.log('POSTing...', toCreate, toUpdate);

  //  POST loop
  while (0 < toCreate.length) {
    console.log('posting new product...');
    statusElm.textContent = `Uploading products: ${finished++} of ${Nprod} received`;
    prodData = prods[toCreate.splice(0, 1)];
    await POSTproduct(prodData);
  }
  while (0 < toUpdate.length) {
    console.log('posting updates...');
    statusElm.textContent = `Uploading products: ${finished++} of ${Nprod} received`;
    currentProduct = toUpdate.splice(0, 1)[0];
    prodData = prods[currentProduct.pic];
    prodID = currentProduct.id;
    await POSTproduct(prodData, prodID);
  }
  return Nprod;
}

export { deleteProducts, POSTproducts, getExistingProducts };
