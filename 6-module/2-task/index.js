"use strict";

class Carousel {
  slides = [
    {
      id: 0,
      title: "BEST LAPTOP DEALS",
      img: "../../assets/images/default-slide-img.jpg"
    },
    {
      id: 1,
      title: "BEST HEADPHONES DEALS",
      img: "../../assets/images/default-slide-img.jpg"
    },
    {
      id: 2,
      title: "BEST SPEAKERS DEALS",
      img: "../../assets/images/default-slide-img.jpg"
    }
  ];

  constructor(element) {
    this.el = element;

    this.el.innerHTML = `
    <div id="mainCarousel" class="main-carousel carousel slide">
      <ol class="carousel-indicators">
          <li data-target="#mainCarousel" data-slide-to="0" class="carousel-indicator"></li>
          <li data-target="#mainCarousel" data-slide-to="1" class="carousel-indicator"></li>
          <li data-target="#mainCarousel" data-slide-to="2" class="carousel-indicator"></li>
      </ol>

      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="" alt="Activelide">
          <div class="container">
              <div class="carousel-caption">
                  <h3 class="h1"></h3>
                  <div>
                      <a class="btn" href="#" role="button">
                          View all DEALS
                          <img src="../../assets/icons/icon-angle-white.svg" class="ml-3" alt="">
                      </a>
                  </div>
              </div>
          </div>
        </div>
      </div>
      
      <button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
      </button>

      <button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
      </button>
    </div>`;

    this.currentSlide = this.slides[0];

    this.el.addEventListener('click', this.onEvent.bind(this));

    this.img = this.el.querySelector('.carousel-item img');

    this.title = this.el.querySelector('.carousel-caption h3');

    this.render();
  }

  nextSlide() {
    let count = this.slides.length;

    if ((this.currentSlide.id + 1) < count) {
      count = this.currentSlide.id + 1;
    } else {
      count = 0;
    }

    this.currentSlide = this.slides.find(e => e.id == count);

    this.render();
  }

  prevSlide() {
    let count = this.slides.length - 1;

    if (this.currentSlide.id > 0) {
      count = this.currentSlide.id - 1;
    }

    this.currentSlide = this.slides.find(e => e.id == count);

    this.render();
  }

  render() {
    let carouselIndicators = this.el.querySelectorAll('.carousel-indicator[data-slide-to]');

    carouselIndicators.forEach(e => {
      e.classList.remove('active');
    });

    let carouselIndicator = this.el.querySelector(`.carousel-indicator[data-slide-to='${this.currentSlide.id}']`);

    carouselIndicator.classList.add('active');

    this.img.src = this.currentSlide.img;
    this.title.innerHTML = this.currentSlide.title;
  }

  carouselIndicator(cls, event) {
    let elementAction = event.target.closest(cls);

    if (!elementAction) {
      return;
    }
    
    elementAction.classList.add('active');
  }

  carouselControlPrev(cls, event) {
    let elementAction = event.target.closest(cls);

    if (!elementAction) {
      return;
    }

    this.prevSlide();
  }

  carouselControlNext(cls, event) {
    let elementAction = event.target.closest(cls);

    if (!elementAction) {
      return;
    }

    this.nextSlide();
  }

  onEvent(event) {
    [
      '.carousel-indicator',
      '.carousel-control-prev',
      '.carousel-control-next'
    ].forEach(e => {
      this._strategyOnClick(event, e);
    });
  }

  _strategyOnClick(event, cls) {
    function upperFirstCharacterInWord (word) {
      return word[0].toUpperCase() + word.slice(1);
    }

    function camelize(str) {
      let words = str.split(/-/);
      return words[0] + words.slice(1).map(upperFirstCharacterInWord).join('');
    }

    let method = camelize(cls.replace(".", ""));

    if (this[method]) {
      this[method](cls, event);
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
