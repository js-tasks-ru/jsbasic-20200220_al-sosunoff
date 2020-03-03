/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
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
class ClearedTable {
  constructor(data) {
    const _createElement = (tag, cls) => {
      let el = document.createElement(tag);
      el.className = cls;
      return el;
    };

    this.el = _createElement('table', 'pure-table');
    this.el.addEventListener('click', this.onClick.bind(this));

    this.data = data;

    this.headNameRow = data.length ? Object.keys(data[0]) : [];
    this.bodyValueRows = data.length ? data : [];

    this.thead = _createElement('thead', '');
    this.tbody = _createElement('tbody', '');
    this.header = _createElement('tr', '');
    this.thead.append(this.header);
    this.el.append(...[this.thead, this.tbody]);

    this.render(true);
  }

  onDelete(cls, event) {
    let a = event.target.closest(cls);

    if (!a) {
      return;
    }
    
    let tr = event.target.closest('tr');
    
    let id = parseInt(tr.cells[0].innerText);
    
    tr.remove();

    this.onRemoved(id);
  }

  onClick(event) {
    ['.onDelete'].forEach(e => {
      this._strategyOnClick(event, e);
    });
  }

  _strategyOnClick(event, cls) {
    let method = cls.replace(".", "").replace(new RegExp("-", "g"), "_");
    if (this[method]) {
      this[method](cls, event);
    }
  }

  _buildHeader(callbackFormat) {
    callbackFormat = typeof callbackFormat == "function" ? callbackFormat : e => e;

    let tds = this.headNameRow.reduce((res, cur) => {
      return `${res}<td>${callbackFormat(cur)}</td>`;
    }, '');

    this.header.innerHTML = `${tds}<td></td>`;
  }

  _buildBody(callbackFormat) {
    callbackFormat = typeof callbackFormat == "function" ? callbackFormat : e => e;

    let trs = this.bodyValueRows
        .map(e => `
        <tr>
          ${callbackFormat(Object.values(e)).map(i => `<td>${i}</td>`).join("")}
          <td><a class="onDelete" href="#delete">X</a></td>
        </tr>`)
        .join("");

    this.tbody.innerHTML = trs;
  }

  render(isHead) {
    const upperCasecFirst = str => (str ? str[0].toUpperCase() + str.slice(1) : "");

    if (isHead) {
      this._buildHeader(upperCasecFirst);
    }
    this._buildBody();
  }

  /**
   * Метод который вызывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {}
}

window.ClearedTable = ClearedTable;
