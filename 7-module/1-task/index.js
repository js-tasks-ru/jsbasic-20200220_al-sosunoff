/**
 * promiseClick
 * @param {Element} button index
 * @returns {Promise}
 */

function promiseClick(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', resolve);
  });
}
