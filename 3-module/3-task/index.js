/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let wordArray = str.split(/-/);
  let wordUnchanged = wordArray[0];
  let wordArrayByChanged = wordArray.slice(1);

  return wordUnchanged + wordArrayByChanged.map(upperFirstCharacterInWord).join('');
}

function upperFirstCharacterInWord (word) {
  return word[0].toUpperCase() + word.slice(1);
}