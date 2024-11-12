import { Debouncer } from '../utils/Debouncer';
import { resolutionChecker } from '../utils/ResolutionChecker';

class StartInNumbers {
  $section = null;
  $bigItem = null;
  $container = null;
  $wrapper = null;

  debouncer = null;

  classNames = {
    bigItem: 'card-start-in-numbers_big',
    container: 'start-in-numbers__container',
    wrapper: 'start-in-numbers__wrapper',
    card: 'start-in-numbers__card',
  };

  constructor($section) {
    this.$section = $section;

    this.debouncer = new Debouncer();

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
    window.addEventListener('resize', this.debouncer.debounce(this.moveBigItem.bind(this), 350));
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
}

export function initStartInNumbers() {
  document.querySelectorAll('.start-in-numbers').forEach(($section) => new StartInNumbers($section));
}
