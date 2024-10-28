import { resolutionChecker } from '../main';
import { debouncer } from '../utils/Debouncer';

/**
 * Класс для управления поведением секции "Hero".
 */
class Hero {
  /**
   * @type {HTMLElement | null} Секция Hero.
   */
  $section = null;

  /**
   * @type {HTMLElement | null} Изображение в секции Hero.
   */
  $img = null;

  /**
   * @type {HTMLElement | null} Подзаголовок в секции Hero.
   */
  $subtitle = null;

  /**
   * CSS-селекторы для поиска элементов секции Hero.
   * @type {Object.<string, string>}
   * @property {string} section - Селектор для контейнера Hero.
   * @property {string} img - Селектор для изображения Hero.
   * @property {string} subtitle - Селектор для подзаголовка Hero.
   */
  classNames = {
    section: '.hero .container',
    img: '.hero__img',
    subtitle: '.hero__subtitle',
  };

  /**
   * Создает экземпляр класса Hero.
   * @param {HTMLElement} $section - Корневой элемент секции Hero.
   */
  constructor($section) {
    this.$section = $section;

    this.getElements();
    this.transferImg();
    this.addEvents();
  }

  /**
   * Добавляет обработчик события изменения размера окна.
   * При изменении размера срабатывает с задержкой.
   * @private
   */
  addEvents() {
    window.addEventListener('resize', debouncer.debounce(this.transferImg.bind(this), 350));
  }

  /**
   * Получает элементы изображения и подзаголовка внутри секции Hero.
   * @private
   */
  getElements() {
    this.$img = this.$section.querySelector(`${this.classNames.img}`);
    this.$subtitle = this.$section.querySelector(`${this.classNames.subtitle}`);
  }

  /**
   * Перемещает изображение внутри секции Hero.
   * Если разрешение подходит для ноутбуков, изображение добавляется после подзаголовка,
   * в противном случае — в начало контейнера Hero.
   * @private
   */
  transferImg() {
    if (resolutionChecker.isLaptop()) {
      this.$subtitle.appendChild(this.$img);
    } else {
      this.$section.prepend(this.$img);
    }
  }
}

/**
 * Инициализирует секцию Hero.
 * @function
 */
export function initHero() {
  const $hero = document.querySelector('.hero .container');
  new Hero($hero);
}
