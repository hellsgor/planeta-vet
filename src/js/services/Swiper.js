import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';

export class InitSlider {
  classSlider = '';
  classSliderParent = null;
  classSliderTitles = null;
  settingsSlider = {};
  slider = null;

  constructor(props) {
    this.classSlider = props.classSlider;
    this.classSliderParent = props.classSliderParent || null;
    this.classSliderTitles = props.classSliderTitles || null;
    this.settingsSlider = props.settingsSlider;

    this.checkSlider();

    if (this.settingsSlider.destroySize) {
      this.checkResizeSlider();
    }

    this.initTitles();
  }

  checkSlider() {
    if (window.matchMedia(this.settingsSlider.destroySize).matches && this.settingsSlider.destroySize) {
      if (this.slider) {
        try {
          this.destroySlider();
        } catch (e) {
          console.log(e);
        }
      }
      return 1;
    } else {
      if (!this.slider) {
        this.initSlider();
      }
    }
  }

  checkResizeSlider() {
    window.addEventListener('resize', () => {
      this.checkSlider();
    });
  }

  initSlider() {
    this.slider = new Swiper(this.classSlider, this.settingsSlider) || null;

    if (this.settingsSlider.pagination) {
      this.slider.on('slideChange', () => {
        this.updatePagination();
      });

      this.updatePagination();
    }
  }

  updatePagination() {
    const bullets = document.querySelectorAll(
      `${this.settingsSlider.pagination.el} .${this.settingsSlider.pagination.bulletClass}`,
    );
    const activeClass = this.settingsSlider.pagination.bulletActiveClass;

    bullets.forEach((bullet, index) => {
      if (index === this.slider.realIndex) {
        bullet.classList.add(activeClass);
      } else {
        bullet.classList.remove(activeClass);
      }
    });
  }

  destroySlider() {
    this.slider.destroy();
    this.slider = null;
    document.querySelectorAll(`${this.classSlider}__slider`)?.forEach((i) => {
      i.removeAttribute('style');
    });
    document.querySelector(`${this.classSlider}__wrapper`)?.removeAttribute('style');
  }

  initTitles() {
    if (!this.classSliderParent || !this.classSliderTitles || !this.settingsSlider.pagination.bulletClass) return;

    if (!document.querySelector(`${this.classSliderParent}`)) return;

    const titles = Array.from(
      document.querySelector(`${this.classSliderParent}`).querySelectorAll(`.${this.classSliderTitles}`),
    );

    const paginationItems = document
      .querySelector(`${this.classSlider}`)
      .querySelectorAll(`.${this.settingsSlider.pagination.bulletClass}`);

    if (!titles.length || !paginationItems.length || titles.length !== paginationItems.length) return;

    titles.forEach((title) => {
      title.addEventListener('click', () => {
        paginationItems[titles.indexOf(title)].click();
      });
    });
  }
}

const listSliders = [
  {
    classSlider: '.four-steps-slider',
    settingsSlider: {
      wrapperClass: 'four-steps-slider__wrapper',
      slideClass: 'four-steps-slider__card',

      grabCursor: true,
      slidesPerView: 'auto',
      spaceBetween: 16,

      breakpoints: {
        768: {
          spaceBetween: 20,
        },
      },

      destroySize: '(min-width: 1550px)',
    },
  },
  {
    classSlider: '.options__slider',
    settingsSlider: {
      wrapperClass: 'options__wrapper',
      slideClass: 'options__card',

      grabCursor: true,
      slidesPerView: 'auto',
      spaceBetween: 16,

      breakpoints: {
        768: {
          spaceBetween: 20,
        },
      },

      destroySize: '(min-width: 1400px)',
    },
  },
  {
    classSlider: '.start-in-numbers__container',
    settingsSlider: {
      wrapperClass: 'start-in-numbers__wrapper',
      slideClass: 'start-in-numbers__card',

      grabCursor: true,
      slidesPerView: 'auto',
      spaceBetween: 16,

      breakpoints: {
        768: {
          spaceBetween: 20,
        },
      },

      destroySize: '(min-width: 1550px)',
    },
  },

  {
    classSlider: '.controlled-slider__inner',
    classSliderParent: '.controlled-slider',
    classSliderTitles: 'controlled-slider__slides-titles-item',
    settingsSlider: {
      wrapperClass: 'controlled-slider__wrapper',
      slideClass: 'controlled-slider__slide',

      modules: [Navigation, Pagination],

      grabCursor: true,
      slidesPerView: 1,
      rewind: true,
      spaceBetween: 16,

      breakpoints: {
        768: {
          spaceBetween: 24,
        },
      },

      navigation: {
        nextEl: '.controlled-slider__button_next',
        prevEl: '.controlled-slider__button_prev',
      },

      pagination: {
        bulletClass: 'controlled-slider__pagination-item',
        bulletActiveClass: 'controlled-slider__pagination-item_active',
        el: '.controlled-slider__pagination',
        clickable: true,
      },
    },
  },
];

export const initSwipers = () => {
  return listSliders.map((i) => {
    return new InitSlider(i);
  });
};
