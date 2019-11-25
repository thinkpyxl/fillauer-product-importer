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

function linkPackages(parents, packages) {
  const packedPackages = parents;

  console.log(packages);
  return packedPackages;
//   Object.values(parents).map(val => {
//     val.variations.map(vary => {
//       if (undefined === vary[f.package]) {
//         if (undefined === packages.drop || 'drop' === vary[f.package]) {
//           packages.drop.label = 'drop';
//           packages.drop.model = 'B';
//         }
//       } else if ('list' === vary[f.package]) {
//         packages.list.label = 'list';
//         packages.list.model = 'A';
//       } else {
//       // Look up in package information
//         packages[vary[f.package]].label = vary[f.package];
//         packages[vary[f.package]].model = 'A';
//       }
//     });
//   });
//   return packedPackages;
}

// confirm definition of properties that will be used in POST
function verifyFields(prod) {
  // console.log(prod);
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

function buildSpec(start, end, ind, val, attrRow, icon) {
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
