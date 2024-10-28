import { resolutionChecker } from '../main';
import { debouncer } from '../utils/Debouncer';

/**
 * Класс для управления поведением секции "Hero".
 */
class BurgerMenu {
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
    section: '.header',
    select: '.header-select',
    menu: '.header-menu',
    login: '.header-login',
    headerContainer: '.header__wrapper',
    firstHeaderContainer: '.header__wrapper_first',
    secondHeaderContainer: '.header__wrapper_second',
    burgerMenuContainer: '.burger-menu',
    request: '.button__request',
  };

  /**
   * Создает экземпляр класса Hero.
   * @param {HTMLElement} $section - Корневой элемент секции Hero.
   */
  constructor($section) {
    this.$section = $section;
    this.getElements();
    this.addEvents();
    this.transferElements();
  }

  /**
   * Добавляет обработчик события изменения размера окна.
   * При изменении размера срабатывает с задержкой.
   * @private
   */
  addEvents() {
    window.addEventListener('resize', debouncer.debounce(this.transferElements.bind(this), 350));
  }

  /**
   * Получает элементы изображения и подзаголовка внутри секции Hero.
   * @private
   */
  getElements() {
    this.$select = this.$section.querySelector(`${this.classNames.select}`);
    this.$menu = this.$section.querySelector(`${this.classNames.menu}`);
    this.$login = this.$section.querySelector(`${this.classNames.login}`);
    this.$request = this.$section.querySelector(`${this.classNames.request}`);
    this.$burgerMenuContainer = this.$section.querySelector(`${this.classNames.burgerMenuContainer}`);
    this.$headerContainer = this.$section.querySelectorAll(`${this.classNames.headerContainer}`);
  }

  /**
   * Перемещает изображение внутри секции Hero.
   * Если разрешение подходит для ноутбуков, изображение добавляется после подзаголовка,
   * в противном случае — в начало контейнера Hero.
   * @private
   */
  transferElements() {
    if (resolutionChecker.isLaptop()) {
      this.$burgerMenuContainer.appendChild(this.$menu);
      this.$burgerMenuContainer.appendChild(this.$select);
      this.$burgerMenuContainer.appendChild(this.$login);
      console.log(resolutionChecker.isMobile());
      // const cloned = this.$menu.querySelector('a').cloneNode(true);
      // cloned.querySelector('.button__text').innerHTML = this.$request.querySelector('.button__text').innerHTML;
      // cloned.setAttribute('href', this.$request.getAttribute('href'));
    }
    if (resolutionChecker.isMobile()) {
      this.$menu.appendChild(this.$request);
    }
    if (!resolutionChecker.isMobile()) {
      this.$headerContainer[1].appendChild(this.$request);
    }
    if (!resolutionChecker.isLaptop()) {
      this.$headerContainer[0].appendChild(this.$select);
      this.$headerContainer[0].appendChild(this.$menu);
      this.$headerContainer[1].prepend(this.$login);
    }
  }
}

// cloneElement(){

// }
/**
 * Инициализирует секцию Hero.
 * @function
 */
export function initBurgerMenu() {
  const $header = document.querySelector('.header');
  new BurgerMenu($header);
}
