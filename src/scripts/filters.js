import { f } from './fields.js';

//   The attribute column right before specifications start
const b_SpecsStart = 'Specification Start';
const b_SpecsEnd = 'Specification End';

function findSpecBounds(attrRow) {
  let started = false;

  return attrRow
    .map((val, ind) => {
      if (val === b_SpecsStart) {
        started = true;
        return ind;
      }

      if (val === b_SpecsEnd && started) {
        return ind;
      }
      return false;
    })
    .filter(val => {
      if (false !== val) return true; // I know this looks silly, but what if val == 0?
    });
}

function findSpecIcons(attrRow, row) {
  const icons = {};
  if (!row.includes('ICON')) {
    window.alert('Are you sure your defining specification icons?');
  }
  row.map((val, ind) => {
    if ('' !== val && 'ICON' !== val) {
      icons[attrRow[ind]] = val;
    }
  });
  return icons;
}

function findCollisionsWithProducts(newProds, existing) {
  if (!existing) return [];
  const rv = existing
    .map(val => {
      if (newProds[val.meta.PIC]) return val.id;
      else return false;
    })
    .filter(val => {
      if (val) return true;
    });
  console.log(rv);
  return rv;
}

function keyByPIC(prods) {
  const ProdByPIC = {};
  prods.map(val => {
    if (!val) {
      return false;
    }

    if (!ProdByPIC[val[f.pic]]) {
      ProdByPIC[val[f.pic]] = [];
    }

    ProdByPIC[val[f.pic]] = val;

    return val;
  });

  return ProdByPIC;
}

function buildPackageObj(packages) {
  const rv = {};
  const attr = packages[0].splice(1);
  // Ignore ID field since the rows are spliced too

  packages.splice(1).map(row => {
    const id = row[0];
    if (undefined !== rv[id]) {
      window.alert(`Conflicting package ID's found: ${id}`);
    }
    rv[id] = {};
    row.splice(1).map((val, ind) => {
      rv[id][attr[ind]] = val;
    });
    rv[id].Attributes = rv[id].Attributes.split(',').map(val => {
      return val.trim();
    });
  });
  console.log(rv);
  return rv;
}

function linkVariations(parents, varies) {
  varies.map(val => {
    if (undefined === parents[val[f.pic]]) return false;
    if (!parents[val[f.pic]].variations) {
      parents[val[f.pic]].variations = [];
    }

    parents[val[f.pic]].variations.push({
      name: val[f.name],
      sku: val[f.sku],
      specs: val.specs,
    });
  });

  return parents;
}

function linkPackages(parents, packs) {
  packs = buildPackageObj(packs);

  // Learn what you can from just variations
  Object.values(parents).map(prod => {
    const packages = [];

    // Default package
    packages.drop = {
      label: prod[f.name],
      skus: [],
      model: 'B',
      specs: [], // This needs to be pulled from varying attributes
      product_info: [],
    };

    prod.variations.map(vary => {
      if (undefined !== vary[f.package]) {
        // We have a variation wanting to be in a package
        //   see if that package exists first
        if (!packages[vary[f.package]]) {
          packages[vary[f.package]] = {
            label: vary[f.package],
            skus: [],
            model: 'A',
          };
          // if this is a 'list' package, ensure model A
          if ('list' === vary[f.package]) {
            packages[vary[f.package]].model = 'A';
            packages[vary[f.package]].label = prod[f.name];
          }
        }
        // Add variation to the package of its choice
        packages[vary[f.package]].skus.push(vary.sku);
      } else {
        console.log(vary.sku);
        packages.drop.skus.push(vary.sku);
      }
    });

    if (0 === packages.drop.skus.length) {
      //   Remove default if every variation found a package
      delete packages.drop;
    }

    parents[prod[f.pic]].packages = packages;
  });

  // Now apply the package file for more packages and specs



  return parents;
}

// confirm definition of properties that will be used in POST
function verifyFields(prod) {
  // console.log(prod);
  prod.terms = {};
  if (prod[f.cat] !== undefined) {
    prod.terms.product_cat = [prod[f.cat]];
  }
  if (prod[f.tax] !== undefined) {
    prod.terms.product_tax = [prod[f.tax]].split(',').map(val => {
      return val.trim();
    });
  }

  return prod;
}

function verifyFiles(parentFileHandler, variationFileHandler, packageFileHandler) {
  if (parentFileHandler === undefined) {
    window.alert('Specify a parent product file first');
    return false;
  }
  if (variationFileHandler === undefined) {
    window.alert('Specify a variations file first');
    return false;
  }
  if (packageFileHandler === undefined) {
    window.alert('Specify a package file first');
    return false;
  }
  return true;
}

function buildSpec(start, end, ind, val, icon) {
  if (start < ind && ind < end) {
    const spec = {};

    // Value
    spec.val = val;

    // Icon
    spec.icon = icon;

    // Featured or Additional
    if (val.includes('*')) {
      spec.val = val.replace('*', '');
      spec.featured = true;
    } else {
      spec.featured = false;
    }
    return spec;
  }

  return false;
}

export { findSpecBounds, findSpecIcons, findCollisionsWithProducts, keyByPIC, linkVariations, linkPackages, verifyFields, verifyFiles, buildSpec };
