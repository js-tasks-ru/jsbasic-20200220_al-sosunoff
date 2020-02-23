/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let numberArray = toNumberArray(str);

  return {
    min: Math.min(...numberArray),
    max: Math.max(...numberArray),
  };
}

/**
 * toNumberArray
 * @param {string} str 
 * @returns {Array} массив с числами
 */
function toNumberArray (str) {
  return str
    .split(/[^\d.-]/)
    .filter(e => e)
    .map(e => Number(e));
}