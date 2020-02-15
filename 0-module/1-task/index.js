/**
 * Power
 * @param {number} m base
 * @param {number} n index
 * @returns {number}
 */
function sum(m, n) {
  if (!isNumber(m) || !isNumber(n)) {
    throw new TypeError('Не число');
  }

  return m + n;
}

function isNumber(a) {
  return typeof a === 'number';
}
