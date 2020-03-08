const compose = (...fn) => x => fn.reduceRight((res, f) => f(res), x);

class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;
    this.el.innerHTML = `
    <div class="row justify-content-end">
      <div class="col-lg-9">
          <h3 class="section-title">Top Recommendations for You</h3>
          <div class="row homepage-cards">
              <!--ВОТ ЗДЕСЬ БУДУТ КАРТОЧКИ ТОВАРОВ-->
          </div>
      </div>
    </div>`;
    this.homepageCards = this.el.querySelector('.homepage-cards');
    this.el.addEventListener('click', this.onClick.bind(this));
    this.products = [];
  }

  onClick(event) {
    ['[data-button-role="add-to-cart"]'].forEach(e => {
      this._strategyOnClick(event, e);
    });
  }

  onDataButtonRole(cls, event) {
    let btn = event.target.closest(cls);

    if (!btn) {
      return;
    }

    let product = btn.closest('[data-product-id]');
    
    if (!product) {
      return;
    }

    let isSure = confirm('Вы уверенны, что хотите добавить этот товар в корзину?');

    if (!isSure) {
      return;
    }

    this.addToCart(this.products.find(x => x.id == product.dataset.productId));
  }

  addToCart(product) {
    let products = JSON.parse(localStorage.getItem(this.productsStoreKey));

    if (!products) {
      products = [];
    }

    if (products.map(x => x.id).includes(product.id)) {
      return;
    }

    products.push(product);

    localStorage.setItem(this.productsStoreKey, JSON.stringify(products));
  }

  getCardHtml(product) {
    let productHTML = `
      <div data-product-id="${product.id}" class="products-list-product col-md-6 col-lg-4 mb-4">
        <div class="card">
            <div class="card-img-wrap">
                <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap">
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <div class="rate">
                    <i class="icon-star ${product.rating && product.rating.stars >= 1 ? 'checked' : 'active'}"></i>
                    <i class="icon-star ${product.rating && product.rating.stars >= 2 ? 'checked' : 'active'}"></i>
                    <i class="icon-star ${product.rating && product.rating.stars >= 3 ? 'checked' : 'active'}"></i>
                    <i class="icon-star ${product.rating && product.rating.stars >= 4 ? 'checked' : 'active'}"></i>
                    <i class="icon-star ${product.rating && product.rating.stars >= 5 ? 'checked' : 'active'}"></i>
                    <span class="rate-amount ml-2">${product.rating && product.rating.reviewsAmount ? product.rating.reviewsAmount : ''}</span>
                </div>
                <p class="card-text price-text discount"><strong>${product.price}</strong>
                  ${product.oldPrice ? `<small class="ml-2">${product.oldPrice}</small>` : ''}
                </p>
                <button class="product-add-to-cart" data-button-role="add-to-cart">
                  Add to cart
                </button>
            </div>
        </div>
      </div>`;

    return new DOMParser().parseFromString(productHTML, 'text/html').body.childNodes[0];
  }

  async show() {
    let productObj = await fetch(this.productsUrl);
      
    let products = await productObj.json();

    this.products = products;
    
    this.homepageCards.append(...products.map(this.getCardHtml.bind(this)));
  }
  
  _strategyOnClick(event, cls) {
    const getMethodEventName = compose(
      x => 'on' + x.join(''),
      x => x.map(word => word.substr(0, 1).toUpperCase() + word.substring(1)),
      x => x.split('-'),
      x => x.slice(0, 1).toString(),
      x => x.split('='),
      x => x.replace(/[\.\[\]]/g, ''),
    );

    let method = getMethodEventName(cls);

    if (this[method]) {
      this[method](cls, event);
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;