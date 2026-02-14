'use strict';

// const logo = document.querySelector('.logo');
const div = document.createElement('div');

const promise1 = new Promise((resolve, reject) => {
  let isClicked = false;

  setTimeout(() => {
    document.addEventListener('click', (e) => {
      isClicked = true;
    });
  }, 3 * 1000);

  if (isClicked) {
    resolve('First promise was resolved');
  } else {
    reject(new Error('First promise was rejected'));
  }
});

promise1
  .then((message) => {
    div.textContent = message;
    document.body.append(div);
  })
  .catch((message) => {
    setTimeout(() => {
      div.textContent = message;
      document.body.append(div);
    }, 3 * 1000);
  });
