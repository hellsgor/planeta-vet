import { resolutionChecker } from '../main';

class StartInNumbers {
  $section = null;
  $bigItem = null;
  $container = null;
  $wrapper = null;

  classNames = {
    bigItem: 'card-start-in-numbers_big',
    container: 'start-in-numbers__container',
    wrapper: 'start-in-numbers__wrapper',
    card: 'start-in-numbers__card',
  };

  constructor($section) {
    this.$section = $section;

    this.getElements();
    this.moveBigItem();

    this.addEvents();
  }

  getElements() {
    this.$bigItem = this.$section.querySelector(`.${this.classNames.bigItem}`);
    this.$container = this.$section.querySelector(`.${this.classNames.container}`);
    this.$wrapper = this.$section.querySelector(`.${this.classNames.wrapper}`);
  }

  addEvents() {
    window.addEventListener('resize', this.handlerWindowResize.bind(this));
  }

  moveBigItem() {
    if (!resolutionChecker.isCustom(1549)) {
      if (!this.$wrapper.contains(this.$bigItem)) {
        this.$wrapper.querySelectorAll(`.${this.classNames.card}`)[3].after(this.$bigItem);
      }
    } else {
      if (this.$bigItem.parentElement !== this.$container) {
        this.$container.appendChild(this.$bigItem);
      }
    }
  }

  handlerWindowResize() {
    this.moveBigItem();
  }
}

export function initStartInNumbers() {
  document.querySelectorAll('.start-in-numbers').forEach(($section) => new StartInNumbers($section));
}
