import csv from 'csv-parse';

// Utitlity Functions
function fetcher(url, obj, forgiving = true) {
  // Some boilerplate for fetch calls
  return fetch(url, obj)
    .then(res => {
      if (500 === res.status) {
        if (forgiving) {
          console.error('Trying one more time');
          return fetcher(url, obj, false);
        } else {
          console.error('Second attempt failed as well');
        }
      } else if (!forgiving) {
        console.log('Second attempt success!');
      }
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

function testCall(ev) {
  ev.preventDefault();
  // Lance magic
  fetch(`${wpApiSettings.root}wp/v2`, {
    method: 'get',
    headers: {
      'X-WP-Nonce': wpApiSettings.nonce,
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({
    //   title: 'Hello Moon',
    //   content: '',
    //   excerpt: '',
    //   status: 'publish',
    //   meta: { sku: 'asdf', product_type: 'simple', pic: '12452364' },
    // }),
  })
    .then(response => response.json().then(console.log))
    .catch(console.log);
}

export { fetcher, deleteProducts, readFilePromise, testCall };
