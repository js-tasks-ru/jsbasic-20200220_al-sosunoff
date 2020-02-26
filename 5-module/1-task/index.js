/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  let rows = Array.from(table.rows);

  for (const row of rows) {
    let available = row.querySelector("td[data-available]");

    if (available) {
      switch (available.dataset.available) {
      case "true":
        row.classList.add("available");
        break;
      case "false":
        row.classList.add("unavailable");
        break;
      }
    }

    if (!row.getAttribute('hidden')) {
      row.setAttribute('hidden', true);
    }
    
    switch (row.cells[2].innerText) {
    case "m":
      row.classList.add('male');
      break;
    case "f":
      row.classList.add('female');
      break;
    }

    if (+row.cells[1].innerText < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
