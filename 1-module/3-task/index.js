/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if (!str) {
    return '';
  }

  let strToSingArray = str.split('');
  let firstSignByUpperCase = strToSingArray
    .splice(0, 1)
    .toString()
    .toUpperCase();

  return `${firstSignByUpperCase}${strToSingArray.join('')}`;
}