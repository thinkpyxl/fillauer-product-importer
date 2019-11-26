import csv from 'csv-parse';

// Utitlity Functions
function fetcher(url, obj) {
  // Some boilerplate for fetch calls
  return fetch(url, obj)
    .then(res => {
      return res.json();
    })
    .catch(err => console.error(err, obj));
}

async function readFilePromise(fileHandler) {
  // And another shoutout to this link https://blog.shovonhasan.com/using-promises-with-filereader/
  const reader = new FileReader();
  reader.readAsText(fileHandler);

  return new Promise((resolve, reject) => {
    reader.onerror = function() {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    reader.onload = function() {
      csv(reader.result, {}, function(err, output) {
        if (err) console.error('CSV parser failed: ', err);
        else resolve(output);
      });
    };
  });
}

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

export { fetcher, deleteProducts, readFilePromise };
