const Sort = {
  sortNumber: (a, b, desc) => desc ? b - a : a - b,
  sortString: (a, b, desc) => (desc ? a < b : a > b) ? 1 : -1,
  sortStrategy: function (a, b, desc) {
    switch (typeof a) {
    case 'number': return this.sortNumber(a, b, desc);
    case 'string': return this.sortString(a, b, desc);
    default: return true;
    }
  }
};

const StringWorker = {
  upperCasecFirst: str => str ? str[0].toUpperCase() + str.slice(1) : ''
};

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
  const createTag = (tag, value) => `<${tag}>${value}</${tag}>`;
  const createTHead = value => createTag('thead', value);
  const createTBody = value => createTag('tbody', value);
  const createTd = value => createTag('td', value);
  const createTr = value => createTag('tr', value);
  const reduceTds = callbackFormat => {
    callbackFormat = typeof callbackFormat == 'function' ? callbackFormat : e => e;
    let _res = '';
    return (res, curr) => {
      if (!res) {
        return _res = `${_res}${createTd(callbackFormat(curr))}`;
      } 
      
      if (!_res) {
        return _res = `${createTd(callbackFormat(res))}${createTd(callbackFormat(curr))}`;
      }

      return _res = `${res}${createTd(callbackFormat(curr))}`;
    };
  };
  const mapTrs = callbackFormat => {
    callbackFormat = typeof callbackFormat == 'function' ? callbackFormat : e => e;
    return e => createTr(e.map(i => createTd(callbackFormat(i))).join(''));
  };

  this.headNameRow = items.length ? Object.keys(items[0]) : [];

  this.bodyValueRows = items.length ? items.map(e => this.headNameRow.map(h => e[h])) : [];

  this.getHeadHtml = function(callbackFormat) {
    let tds = this.headNameRow.reduce(reduceTds(callbackFormat));
    return createTHead(createTr(tds));
  };

  this.getBodyHtml = function(callbackFormat) {
    let trs = this.bodyValueRows.map(mapTrs(callbackFormat)).join('');
    return createTBody(trs);
  };

  const getTable = () => `${ this.getHeadHtml(this.upperCasecFirst)}${this.getBodyHtml()}`;

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
    this.bodyValueRows.sort((a, b) => this.sortStrategy(a[column], b[column], desc));
    this.el.innerHTML = `${ getTable() }`;
  };
}

Object.assign(SortableTable.prototype, Sort, StringWorker);