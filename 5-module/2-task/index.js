/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },
 *
 * @constructor
 */
function SortableTable(items) {
  const upperCasecFirst = str => str ? str[0].toUpperCase() + str.slice(1) : '';
  const getTag = (tag, value) => `<${tag}>${value}</${tag}>`;
  const getTHead = value => getTag('thead', value);
  const getTBody = value => getTag('tbody', value);
  const getTd = value => getTag('td', value);
  const getTr = value => getTag('tr', value);

  this.headNameRow = items.length ? Object.keys(items[0]) : [];

  this.bodyValueRows = items.length ? items.map(e => this.headNameRow.map(h => e[h])) : [];

  const sortNumber = (a, b, desc) => {
    if (desc) {
      return b - a;
    } else {
      return a - b;
    }
  };

  const sortString = (a, b, desc) => {
    if (desc) {
      return a < b ? 1 : -1;
    } else {
      return a > b ? 1 : -1;
    }
  };

  const sortStrategy = (a, b, desc) => {
    switch (typeof a) {
    case 'number': return sortNumber(a, b, desc);
    case 'string': return sortString(a, b, desc);
    default: return true;
    }
  };

  this.getHeadHtml = function(callbackFormat) {
    let tds = this.headNameRow
      .reduce((res, cur) => {
        if (typeof callbackFormat == 'function') {
          return `${res}${getTd(callbackFormat(cur))}`;
        } else {
          return `${res}${getTd(cur)}`;
        }
      }, '');

    return getTHead(getTr(tds));
  };

  this.getBodyHtml = function(callbackFormat) {
    let tds = this.bodyValueRows
      .map(e => getTr(e.map(i => {
        if (typeof callbackFormat == 'function') {
          return getTd(callbackFormat(i));
        } else {
          return getTd(i);
        }
      }).join('')))
      .join('');

    return getTBody(tds);
  };

  const getTable = () => `${ this.getHeadHtml(upperCasecFirst)}${this.getBodyHtml()}`;

  /**
   * @property {Element} - обязательное свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');

  this.el.innerHTML = `${ getTable() }`;

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
    this.bodyValueRows.sort((a, b) => sortStrategy(a[column], b[column], desc));
    this.el.innerHTML = `${ getTable() }`;
  };
}