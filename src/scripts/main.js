'use strict';

const div = document.createElement('div');
const divHandler = (message, result) => {
  div.setAttribute('data-qa', 'notification');
  div.classList.add(result);
  div.textContent = message;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3 * 1000);

  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
    clearTimeout(timeOut);
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
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
    divHandler(message, 'success');
  })
  .catch((error) => {
    divHandler(error, `error`);
  })
  .finally(() => {
    removeEventListener();
  });

secondPromise
  .then((message) => {
    divHandler(message, 'success');
  })
  .catch((error) => {
    divHandler(error, `error`);
  })
  .finally(() => {
    removeEventListener();
  });

thirdPromise
  .then((message) => {
    divHandler(message, 'success');
  })
  .catch((error) => {
    divHandler(error, `error`);
  })
  .finally(() => {
    removeEventListener();
  });
