import { Debouncer } from '../utils/Debouncer';
import { resolutionChecker } from '../utils/ResolutionChecker';

/**
 * Класс для управления поведением элементов в секции "StartInNumbers".
 * Перемещает большую карточку в зависимости от размера окна.
 */
class StartInNumbers {
  /**
   * @type {HTMLElement | null} Корневой элемент секции StartInNumbers.
   */
  $section = null;

  /**
   * @type {HTMLElement | null} Большая карточка, которая будет перемещаться.
   */
  $bigItem = null;

  /**
   * @type {HTMLElement | null} Контейнер, в который будет помещена большая карточка.
   */
  $container = null;

  /**
   * @type {HTMLElement | null} Обертка, внутри которой происходит перемещение элементов.
   */
  $wrapper = null;

  /**
   * @type {Debouncer} Экземпляр класса Debouncer для оптимизации обработки событий изменения размера окна.
   */
  debouncer = null;

  /**
   * CSS-селекторы для поиска элементов внутри секции.
   * @type {Object.<string, string>}
   * @property {string} bigItem - Селектор для большой карточки.
   * @property {string} container - Селектор для контейнера.
   * @property {string} wrapper - Селектор для обертки.
   * @property {string} card - Селектор для карточек внутри обертки.
   */
  classNames = {
    bigItem: 'card-start-in-numbers_big',
    container: 'start-in-numbers__container',
    wrapper: 'start-in-numbers__wrapper',
    card: 'start-in-numbers__card',
  };

  /**
   * Создает экземпляр класса StartInNumbers.
   * Инициализирует элементы и добавляет обработчики событий.
   * @param {HTMLElement} $section - Корневой элемент секции StartInNumbers.
   */
  constructor($section) {
    this.$section = $section;

    this.debouncer = new Debouncer();

    this.getElements();
    this.moveBigItem();

    this.addEvents();
  }

  /**
   * Инициализирует элементы внутри секции StartInNumbers, присваивая их соответствующим свойствам класса.
   */
  getElements() {
    this.$bigItem = this.$section.querySelector(`.${this.classNames.bigItem}`);
    this.$container = this.$section.querySelector(`.${this.classNames.container}`);
    this.$wrapper = this.$section.querySelector(`.${this.classNames.wrapper}`);
  }

  /**
   * Добавляет обработчик события изменения размера окна с задержкой.
   * Использует дебаунсер для оптимизации частоты вызова.
   */
  addEvents() {
    window.addEventListener('resize', this.debouncer.debounce(this.moveBigItem.bind(this), 350));
  }

  /**
   * Перемещает большую карточку в зависимости от разрешения экрана.
   * Если разрешение меньше заданного, элемент перемещается в обертку.
   * Если разрешение больше или равно заданному, элемент перемещается в контейнер.
   */
  moveBigItem() {
    if (!resolutionChecker.isCustom(1549)) {
      // Для экранов меньших, чем 1549px, перемещаем элемент в обертку
      if (!this.$wrapper.contains(this.$bigItem)) {
        this.$wrapper.querySelectorAll(`.${this.classNames.card}`)[3].after(this.$bigItem);
      }
    } else {
      // Для экранов с разрешением от 1549px перемещаем элемент в контейнер
      if (this.$bigItem.parentElement !== this.$container) {
        this.$container.appendChild(this.$bigItem);
      }
    }
  }
}

/**
 * Инициализирует все экземпляры StartInNumbers на странице.
 * Находит все элементы с классом 'start-in-numbers' и применяет к ним логику.
 */
export function initStartInNumbers() {
  document.querySelectorAll('.start-in-numbers').forEach(($section) => new StartInNumbers($section));
}
