/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  checkFuctorial(n);

  let factorialResult = 1;

  while (n) {
    factorialResult *= n--;
  }
	
  return factorialResult;
}

function checkFuctorial(n) {
  if (!isNumber(n)) { 
    throw new TypeError('Значение может быть целым числом');
  }

  if (Number.isNaN(n)) { 
    throw new TypeError('Значение должно быть числом');
  }

  if (n === Infinity) { 
    throw new TypeError('Значение не должно быть бесконечным');
  }
}

function isNumber(a) {
  return typeof a === 'number';
}