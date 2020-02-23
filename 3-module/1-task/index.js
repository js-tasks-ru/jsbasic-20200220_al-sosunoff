/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
  const forEachByUser = curry(forEachFilter)(data);
  const forEachWhereAgeGteAge = forEachByUser((e) => e.age <= age);
  const forEachWhereAgeGteAgeWithNewLine = forEachWhereAgeGteAge('\n');

  return forEachWhereAgeGteAgeWithNewLine(getStringFormat);
}

/**
 * getStringFormat
 * @param {object} dataElement - данные о пользователе
 */
function getStringFormat (dataElement) {
  return `${dataElement.name}, ${dataElement.balance}`;
}

/**
 * forEachFilter
 * @param {Array} data - данные о пользователях
 * @param {function} callbackIf - функция условия которое отсеивает по условию
 * @param {string} separator - разделитель
 * @param {function} callback - функция которая возвращает элемент если было пройдёно условие
 * @returns {string} возвращает строку
 */
function forEachFilter (data, callbackIf, separator, callback) {
  return data.reduce((resultString, curentUser) => {
    if (!callbackIf(curentUser)) {
      return resultString;
    }

    if (resultString.length) {
      return `${resultString}${separator}${callback(curentUser)}`;
    } else {
      return `${callback(curentUser)}`;
    }
  }, '');
}

/**
 * curry
 * @param {Function} fn
 * @returns {Function} Возвращает каррированную функцию следующего аргумента
*/
function curry(fn) {
  return function curried (...a) {
    if (a.length >= fn.length) {
      return fn.apply(this, a);
    } else {
      return (...a2) => {
        return curried.apply(this, [...a, ...a2]);
      };
    }
  };
}