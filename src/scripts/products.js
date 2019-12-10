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
      parent.variations.splice(0, 600),
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
        max:  49             // If there is only one possible, link min-max-maxK
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
  const labels = parent.variations.labels;
  const variationValues = parent.variations.varies[0];
  // TODO: Add support for multiple variation packs. Only [0] at the moment
  // I Know, a bigO(n^2), but it could be worse...

  labels.forEach((label, ind, arr) => {
    specCompare[label] = {};
  });

  // varies = [values] and the corresponding label sharing index
  console.log(parent.variations);

  Object.values(variationValues).forEach((values, pairIndex) => {
    // console.log('values', values, values.specs, Object.values(values.specs));
    // values = Object.values(values.specs);
    Object.values(values.specs).forEach((val, ind, arr) => {
      if (undefined === specCompare[labels[ind]][val]) specCompare[labels[ind]][val] = {};
      // A loop for going through all the OTHER spec values
      for (let i = (ind + 1) % arr.length; i !== ind; i = (i + 1) % arr.length) {
        // Create new arrays at spec: val : spec level
        if (undefined === specCompare[labels[ind]][val][labels[i]]) {
          specCompare[labels[ind]][val][labels[i]] = [];
        }
        // Only add unique values to the matrix
        if (!specCompare[labels[ind]][val][labels[i]].includes(arr[i])) {
          // Different spec values at the same variation
          specCompare[labels[ind]][val][labels[i]].push(arr[i]);
        }
      }
    });
  });
  console.log('Dependant Specifications', specCompare);
  return parent;
}

/*
Either combining minimum/maximums with dash '-'
  or appending different units into one
*/
function includesAny(subject, arr) {
  let mod = false;
  let base = '';
  arr.forEach(val => {
    if (subject.includes(val) && !mod) {
      mod = val;
      base = subject.replace(mod, '').trim();
    }
  });
  return [mod, base];
}

// Spec labels are pulled from just the first variation.
function combineSpecs(parent) {
  const combos = {};
  const searchFor = ['Minimum', 'Maximum', 'Min', 'Max', 'min', 'max'];

  // Min/Max combos ->  min - max
  if (parent.variations[0] === undefined) { return parent; }
  Object.keys(parent.variations[0].specs).forEach((label, ind, arr) => {
    const [mod, base] = includesAny(label, searchFor);
    if (mod) {
      // Attach to base pair which I check to see exists first
      if (!combos[base]) combos[base] = [];
      combos[base].push(label);
    }
  });

  // console.log('combine specifications:', combos);

  // Apply min/max combinations
  //   For every variations... on each combo... the value of combined fields
  parent.variations.forEach((vary, ind) => {
    vary = vary.specs;
    Object.keys(combos).forEach(base => {
      // Otherwise, this was a product with a single Min OR Max
      if (2 === combos[base].length && vary[combos[base][0]]) {
        const newVal = {
          featured: false,
          icon: '',
          val: `${vary[combos[base][0]].val} - ${vary[combos[base][1]].val}`,
        };
        // Set other variations to delete
        vary[combos[base][0]].val = '';
        vary[combos[base][1]].val = '';
        vary[base] = newVal;
        parent.variations[ind].specs = vary; // Remember vary was set to specs
      }
    });
  });

  // TODO: Unit combinations

  return parent;
}

function optimizeProducts(parents) {
  // Reformat variation object for lighter specs overhead
  Object.keys(parents).forEach(key => {
    parents[key] = combineSpecs(parents[key]);
    // console.log(parents[key]);
    parents[key] = optimizeVariations(parents[key]);
    // console.log(parents[key]);
    parents[key] = dependantVariations(parents[key]);
  });
  return parents;
}

export { buildProductObjs, optimizeProducts };
