'use strict';

const div = document.createElement('div');
const divHandler = (message) => {
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3 * 1000);

  document.body.addEventListener('click', () => {
    resolve(`First promise was resolved`);
    clearTimeout(timeOut);
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    resolve(`Second promise was resolved`);
  });
});
const thirdPromise = new Promise((resolve, reject) => {
  let leftBtn = false;
  let rightBtn = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftBtn = true;
    }

    if (e.button === 2) {
      rightBtn = true;
    }

    if (leftBtn && rightBtn) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    divHandler(message);
  })
  .catch((error) => {
    divHandler(error);
  });

secondPromise
  .then((message) => {
    divHandler(message);
  })
  .catch((error) => {
    divHandler(error);
  });

thirdPromise
  .then((message) => {
    divHandler(message);
  })
  .catch((error) => {
    divHandler(error);
  });
