import { findSpecBounds, findSpecIcons, buildSpec } from './filters';
import { f } from './fields';

function combineUnitSpecs(parent) {
  const combos = { };
  Object.keys(parent.specs).forEach(specLabel => {
    const lastBracket = specLabel.lastIndexOf(')');
    if (-1 !== lastBracket) {
      const firstBracket = specLabel.lastIndexOf('(');
      const base = specLabel.substr(0, firstBracket);
      const unit = specLabel.substr(firstBracket, lastBracket);
      if (!combos[base]) combos[base] = {};
      combos[base][unit] = parent.specs[specLabel];
      // combos[base][unit].val += unit;
    }
  });
  Object.keys(combos).forEach(combo => {
    const comboUnits = Object.keys(combos[combo]);
    // Don't create a combo unit unless there are at least 2 units to combine
    if (2 > comboUnits.length) return false;
    comboUnits.forEach((unit, i) => {
      // First value dictates the logo and featuredBool used
      const directUnit = unit.substr(1, unit.length - 2);
      delete parent.specs[(combo + unit)];
      if (0 === i) {
        parent.specs[combo.trim()] = combos[combo][unit];
        parent.specs[combo.trim()].val += ` ${directUnit}`;
      } else {
        parent.specs[combo.trim()].val += ` (${combos[combo][unit].val} ${directUnit})`;
      }
    });
  });

  // Not using includesAny() since I'm particularly looking for units in parenthesis
  return parent.specs;
}

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
    // if ('2058' !== product[f.pic] /* || !product[f.type] */) return undefined;
    // if ('2076' !== product[f.pic] /* || !product[f.type] */) return undefined;

    // Taxonomies
    product.terms.product_cat = product[f.cat] ? product[f.cat]
      .split('::').map(term => term.trim()) : [];
    product.terms.product_tag = product[f.tag] ? product[f.tag]
      .split(',').map(term => term.trim()) : [];

    // Default search weight of 3 if absent
    product[f.searchWeight] = product[f.searchWeight] ? product[f.searchWeight] : 3;

    // Warranty pieces into one
    product.warranty.body = product[f.warrantyBody];
    product.warranty.list = product[f.warrantyList] ? product[f.warrantyList]
      .split('\n').map(line => line.trim()) : [];

    // Gallery
    product.gallery = product[f.image] ? product[f.image]
      .split(',').map(item => item.trim()) : ['1005'];

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

    /// * //////////////////////////////////////////////////
    //    Field Defaults prior to checksum

    // SKU field defined regardless
    product[f.sku] = product[f.sku] ? product[f.sku] : '';

    // Order field
    product[f.orderInfo] = product[f.orderInfo] ? product[f.orderInfo] : '';

    // Main Model field
    product[f.main_model] = product[f.main_model] ? product[f.main_model] : 'E';

    // Part Number Field toggle field
    product[f.png] = product[f.pnf] ? '1' === product[f.pnf] : false;

    product[f.visibility] = 'visible' === product[f.visibility] ? 'publish' : 'draft';

    // Optimize specs by combining different units of the same spec
    product.specs = combineUnitSpecs(product);

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
  const specCompare = {};
  const labels = parent.variations.labels;
  const variationValues = parent.variations.varies[0];
  // TODO: Add support for multiple variation packs. Only [0] at the moment
  // I Know, a bigO(n^2), but it could be worse...

  labels.forEach((label, ind, arr) => {
    specCompare[label] = {};
  });

  // varies = [values] and the corresponding label sharing index

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
function combineVariationSpecs(parent) {
  const combos = {};
  const searchFor = ['Minimum', 'Maximum', 'Min', 'Max', 'min', 'max'];

  // Min/Max combos ->  min - max
  if (parent.variations[0] === undefined) { console.log('Has no variations?', parent); }
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

  return parent;
}

function addFirstSKU(product) {
  if ('variation' === product[f.type]) {
    product[f.sku] = product.variations.varies[0][0].sku;
  }
  return product;
}

function optimizeProducts(parents) {
  // Reformat variation object for lighter specs overhead
  Object.keys(parents).forEach(key => {
    parents[key] = combineVariationSpecs(parents[key]);
    // console.log(parents[key]);
    parents[key] = optimizeVariations(parents[key]);
    // console.log(parents[key]);
    parents[key] = dependantVariations(parents[key]);

    parents[key] = addFirstSKU(parents[key]);
  });

  return parents;
}

export { buildProductObjs, optimizeProducts };
