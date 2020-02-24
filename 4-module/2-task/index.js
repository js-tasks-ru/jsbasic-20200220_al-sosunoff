/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  let rows = table.rows;

  Array.from(rows)
    .forEach((row, i) => getCeillHorizont(row, i, (ceill) => { ceill.style.backgroundColor = "red"; }));
}

function getCeillHorizont(row, i, callback) {
  let ceill = row.cells[i];
  if (ceill) {
    callback(ceill);
  }
}
