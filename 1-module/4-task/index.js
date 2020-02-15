/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let regex1xBetOrXXX = new RegExp('(1xBet)|(XXX)', 'i');

  return regex1xBetOrXXX.test(str);
}
