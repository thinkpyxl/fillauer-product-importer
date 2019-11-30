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

function splitAndVerify(commaSeparated) {
  if (!commaSeparated) return [];
  const rv = commaSeparated.split(',').map(val => {
    return val.trim();
  });
  if ('' === rv[0]) {
    return false;
  }
  return rv;
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
    rv[id][f.attr] = splitAndVerify(rv[id][f.attr]);
    rv[id][f.skus] = splitAndVerify(rv[id][f.skus]);
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
      image: val[f.image] ? val[f.image] : false,
      specs: val.specs,
      package: val[f.package],
    });
  });

  return parents;
}

function linkPackages(parents, packs) {
  packs = buildPackageObj(packs);
  console.log('package sheet objs', packs);

  // Learn what you can from just variations
  Object.values(parents).map(prod => {
    const packages = {};

    // Default package
    packages.drop = {
      label: '', //! This should pull from PIC by controller
      pic: prod[f.pic],
      model: 'B',
      skus: [],
      specs: [], // This needs to be pulled from varying attributes
      product_info: [],
    };

    if (prod.variations) {
      prod.variations.map(vary => {
        if (undefined !== vary.package) {
          // Variation specifies a package to be in
          //   see if that package exists first
          if (!packages[vary.package]) {
            packages[vary.package] = { // Base package template
              label: vary.package,
              pic: prod[f.pic],
              model: 'B',
              skus: [],
              specs: [], // Defined by pack sheet below
              product_info: [], // Defined by pack sheet below
            };
            // if this is a 'list' package, ensure model A
            if ('list' === vary.package) {
              packages[vary.package].model = 'A';
              packages[vary.package].label = ''; //! PIC's name if on another product
              packages[vary.package].product_info = ['name', 'description', 'image'];
            }
          }
          // If any of the variations have images, upgrade that package model.
          if (vary.image) {
            packages[vary.package].model = 'C';
            //   Make sure they're separate from the 'drop' first
            // Any other details should be defined by pack sheet
          }
          // Add variation to the package of its choice
          console.log(prod[f.name], vary.package);
          packages[vary.package].skus.push(vary.sku);

        // If a package name isn't specified but the variation still uses an image, use a blank package name, similar to 'drop'
        } else if (vary.image) {
          // Check if there already isn't a package for unlabeled packages of variation images.
          if (!packages.varyImage) {
            packages.varyImage = {
              label: '',
              pic: prod[f.pic],
              skus: [],
              specs: [],
              model: 'C',
              product_info: ['name', 'description', 'image'],
            };
          }
          packages.varyImage.skus.push(vary.sku);
        } else {
          packages.drop.skus.push(vary.sku);
        }
      });
    }

    //   Remove default if every variation found a package
    if (0 === packages.drop.skus.length) {
      delete packages.drop;
    }

    // Now apply the package file for more packages and specs
    // All packages must have names by now, otherwise the variations wouldn't be able to save or they would be put in 'drop'
    if (prod[f.package]) {
      prod[f.package].split(',').map(id => {
        // This is a package who's name derives from PIC
        id = id.trim();
        // Before making custom package, make sure the variations didn't already define it.
        if (packages[packs[id][f.title]]) {
          packages['custom' + id] = packages[packs[id][f.title]];
          delete packages[packs[id][f.title]];
        } else /* Otherwise, build the new package */ {
          packages['custom' + id] = {
            label: '',
            pic: '',
            skus: [],
            model: 'B',
            specs: [], // This needs to be pulled from varying attributes
            product_info: [],
          };
        }
        // For every field that is defined by the package sheet, confirm and re-specify.
        if (packs[id][f.image]) {
          console.log('image found');
          packages['custom' + id].model = 'D';
          packages['custom' + id].image = packs[id][f.image];
        }
        if (packs[id][f.pic]) {
          packages['custom' + id].pic = packs[id][f.pic];
        }
        if (packs[id][f.skus]) {
          // ? Is this merging properly?
          packages['custom' + id].skus.push(...packs[id][f.skus]);
        }
        if (packs[id][f.attr]) {
          console.log(packs[id][f.attr]);
          packages['custom' + id].specs = packs[id][f.attr];
        }
        if (packs[id][f.title]) {
          packages['custom' + id].label = packs[id][f.title];
        } else {
          // If the title is not specified, this is a product blurb and the title and product_info should be pulled from the PIC.
          packages['custom' + id].product_info = ['name', 'description', 'image'];
        }
        if (packs[id][f.model]) {
          packages['custom' + id].model = packs[id][f.model];
        }
      });
    }

    parents[prod[f.pic]].packages = packages;
  });

  return parents;
}

// confirm definition of properties that will be used in POST
//    used for cleaning taxonomies for now
function verifyFields(prod) {
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
