/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  }

  return `${cutFromStart(str, maxlength)}…`;
}

/**
 * 
 * @param {string} str 
 * @param {number} maxlength 
 */
function cutFromStart(str, maxlength) {
  return str.substr(0, maxlength - 1);
}
