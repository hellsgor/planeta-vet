import Swiper from 'swiper';
import 'swiper/css';
// import { Autoplay, EffectFade, Mousewheel, Navigation, Pagination } from 'swiper/modules';

export class InitSlider {
  classSlider = '';
  settingsSlider = {};
  slider = null;

  constructor(props) {
    this.classSlider = props.classSlider;
    this.settingsSlider = props.settingsSlider;

    this.checkSlider();

    if (this.settingsSlider.destroySize) {
      this.checkResizeSlider();
    }
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
}

const listSliders = [
  {
    classSlider: '.start-in-numbers__container',
    settingsSlider: {
      wrapperClass: 'start-in-numbers__wrapper',
      slideClass: 'start-in-numbers__card',

      slidesPerView: 'auto',
      spaceBetween: 20,

      setWrapperSize: true,

      destroySize: '(min-width: 1550px)',
    },
  },
  // {
  //   classSlider: '.products-main-page__inner',
  //   settingsSlider: {
  //     modules: [Navigation, Pagination, EffectFade, Autoplay],
  //     wrapperClass: 'products-main-page__wrapper',
  //     slideClass: 'products-main-page__product',
  //     loop: true,
  //     slidesPerView: 'auto',
  //     effect: 'fade',
  //     fadeEffect: { crossFade: true },
  //     speed: 300,
  //     autoplay: {
  //       delay: 3000,
  //       disableOnInteraction: true,
  //     },
  //     navigation: {
  //       nextEl: '.slider-navigation__arrow_next',
  //       prevEl: '.slider-navigation__arrow_prev',
  //     },
  //     pagination: {
  //       bulletClass: 'slider-pagination-item',
  //       bulletActiveClass: 'slider-pagination-item_active',
  //       el: '.products-main-page__pagination',
  //       clickable: true,
  //       type: 'custom',
  //     },
  //     destroySize: '(max-width: 500px)',
  //   },
  // },
];

export const initSwipers = () => {
  return listSliders.map((i) => {
    return new InitSlider(i);
  });
};
