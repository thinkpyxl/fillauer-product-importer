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
    // if ('2076' !== product[f.pic] /* || !product[f.type] */) return undefined;
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

export { buildProductObjs }
;
