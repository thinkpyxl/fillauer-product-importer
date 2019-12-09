import { findSpecBounds, findSpecIcons, buildSpec } from './filters';
import { f } from './fields';

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
    product.warranty = {};
    product.indications = [];
    product.downloads = [];
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

    // TODO: ONLY FOR TESTING ONE PRODUCT
    // if ('2051' !== product[f.pic] /* || !product[f.type] */) return undefined;
    // if ('2076' !== product[f.pic] || !product[f.type]) return undefined;

    // Taxonomies
    product.terms.product_cat = [product[f.cat]];
    product.terms.product_tag = product[f.tag] ? product[f.tag]
      .split(',').map(term => term.trim()) : [];

    // Warranty pieces into one
    product.warranty.body = product[f.warrantyBody];
    product.warranty.list = product[f.warrantyList] ? product[f.warrantyList]
      .split('\n').map(line => line.trim()) : [];

    // Gallery
    product.gallery = product[f.image] ? product[f.image]
      .split(',').map(item => item.trim()) : [];

    // Features
    product.features = product[f.feats] ? product[f.feats]
      .split('\n').map(line => line.trim()) : [];

    // Indications
    product.indications = product[f.indict] ? product[f.indict]
      .split('\n').map(line => line.trim()) : [];

    // Related Products
    product.related = product[f.related] ? product[f.related]
      .split(',').map(val => val.trim()) : [];

    // Downloads
    product[f.downs] = product[f.downs] ? product[f.downs]
      .split(',').map(val => val.trim()) : [];

    // Parse downloads
    for (let i = 0; i < product[f.downs].length; i += 2) {
      product.downloads.push({
        title: product[f.downs][i],
        url: product[f.downs][i + 1],
      });
    }

    // Ignore blank rows or incomplete products
    if (product !== undefined && product[f.name] && product[f.pic]) {
      return product;
    }
  });
  return products.filter(prod => prod !== undefined);
}

function optimizeVariations(parent) {
  // Since variations are built the same way as products,
  //   we must use trim away unused data from variations for slimmer POSTs
  if (undefined === parent.variations) {
    return parent;
  }

  const specLabels = [];
  parent.variations = parent.variations.map((vary) => {
    const specValues = {};
    Object.keys(vary.specs).forEach(specLabel => {
      let specIndex = specLabels.indexOf(specLabel);
      specIndex = -1 === specIndex ? specLabels.push(specLabel) - 1 : specIndex;
      specValues[specIndex] = vary.specs[specLabel].val;
      // vary.specs[specLabel] = vary.specs[specLabel].val;
    });
    vary.specs = specValues; // Wipe out specs and replace with the diet program
    return vary;
  });

  const varyPacks = [];
  while (0 < parent.variations.length) {
    varyPacks.push(
      parent.variations.splice(0, 40),
    );
  }

  parent.variations = {
    varies: varyPacks,
    labels: specLabels,
  };

  // Break up varies

  return parent;
}

function dependantVariations(parent) {
  /*
  specComp = {
    size: {
      22: {
        min: 40, 50, 60,
        max: 49, 59, 69,
        maxK:19, 29, 39,
      }
      23: {
        min:  40, 50, 60,
        max:  49, 59, 69,
        maxK: 19, 29, 39,
      }
    }
    min: {
      40: {
        size: 22, 23, 24, 25, 26, 27, 28, 29, 30,
        max:  49  // If there is only one possible, link min-max-maxK
        maxK: 19
      }
    }
    max: {
      49: {
        size: 22, 23, 24, 25, 26, 27, 28, 29, 30,
        min:  40,
        maxK: 19,
      }
    }
    maxK
    minK
  }
  */
  const specCompare = {};
  parent.variations.labels.forEach((label, ind, arr) => {
    console.log(label);
    specCompare[label] = {};

    for (let i = (ind + 1) % arr.length; i !== ind; i = (i + 1) % arr.length) {
      console.log(`   ${arr[i]}`);
    }
  });
  // varies = [values] and the corresponding label sharing index
  // parent.variations.varies.forEach((values, ind, arr) => {
  //   values.forEach((val, ind) => {

  //   });
  // });
  return parent;
}

function optimizeProducts(parents) {
  // Reformat variation object for lighter specs overhead
  Object.keys(parents).forEach(key => {
    parents[key] = optimizeVariations(parents[key]);
    parents[key] = dependantVariations(parents[key]);
  });
  return parents;
}

export { buildProductObjs, optimizeProducts };
