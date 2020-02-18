/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let salarySumResult = 0;

  _forEachByObject(salaries, value => {
    _getIntValue(value, () => {
      salarySumResult += value;
    });
  });

  return salarySumResult;
}

/**
 * 
 * @param {any} value 
 * @param {function} callback 
 */
function _getIntValue(value, callback) {
  if (Number.isFinite(value)) {
    callback();
  }
}

/**
 * 
 * @param {object} obj 
 * @param {function} callback 
 */
function _forEachByObject(obj, callback) {
  for (let key in obj) {
    callback(obj[key], key);
  }
}