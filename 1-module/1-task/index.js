/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let res = 1;

  while (n) {
    res *= n--;
  }
	
  return res;
}