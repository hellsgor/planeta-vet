import { resolutionChecker } from '../utils/ResolutionChecker';

/**
 * Класс для управления поведением бургер-меню в секции "Header".
 */
class BurgerMenu {
  /**
   * @type {HTMLElement | null} Секция Header.
   */
  $section = null;

  /**
   * @type {HTMLElement | null} Выпадающее меню.
   */
  $select = null;

  /**
   * @type {HTMLElement | null} Основное меню.
   */
  $menu = null;

  /**
   * @type {HTMLElement | null} Элемент для входа в систему.
   */
  $login = null;

  /**
   * @type {HTMLElement | null} Кнопка запроса.
   */
  $request = null;

  /**
   * @type {HTMLElement | null} Контейнер бургер-меню.
   */
  $burgerMenuContainer = null;

  /**
   * @type {NodeListOf<HTMLElement> | null} Контейнеры Header.
   */
  $headerContainer = null;

  /**
   * CSS-селекторы для поиска элементов секции Header.
   * @type {Object.<string, string>}
   * @property {string} section - Селектор для контейнера Header.
   * @property {string} select - Селектор для выпадающего меню.
   * @property {string} menu - Селектор для основного меню.
   * @property {string} login - Селектор для элемента входа в систему.
   * @property {string} headerContainer - Селектор для обертки Header.
   * @property {string} burgerMenuContainer - Селектор для контейнера бургер-меню.
   * @property {string} request - Селектор для кнопки запроса.
   */
  classNames = {
    section: '.header',
    select: '.header-select',
    menu: '.header-menu',
    login: '.header__entrance',
    headerContainer: '.header__wrapper',
    burgerMenuContainer: '.burger-menu',
    request: '.button__request',
  };

  /**
   * Создает экземпляр класса BurgerMenu.
   * @param {HTMLElement} $section - Корневой элемент секции Header.
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
    window.addEventListener('resize', this.transferElements.bind(this));
  }

  /**
   * Инициализирует элементы внутри секции Header, присваивая их соответствующим свойствам класса.
   * @private
   */
  getElements() {
    this.$select = this.$section.querySelector(this.classNames.select);
    this.$menu = this.$section.querySelector(this.classNames.menu);
    this.$login = this.$section.querySelector(this.classNames.login);
    this.$request = this.$section.querySelector(this.classNames.request);
    this.$burgerMenuContainer = this.$section.querySelector(this.classNames.burgerMenuContainer);
    this.$headerContainer = this.$section.querySelectorAll(this.classNames.headerContainer);
  }

  /**
   * Перемещает элементы внутри секции Header в зависимости от разрешения экрана.
   * Если разрешение соответствует ноутбуку, элементы меню переносятся в бургер-меню.
   * Для мобильного разрешения кнопка запроса перемещается в меню,
   * в остальных случаях она перемещается в другой контейнер.
   * @private
   */
  transferElements() {
    if (resolutionChecker.isLaptop()) {
      this.$burgerMenuContainer.appendChild(this.$menu);
      this.$burgerMenuContainer.appendChild(this.$select);
      this.$burgerMenuContainer.appendChild(this.$login);
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

/**
 * Инициализирует бургер-меню в секции Header.
 * @function
 */
export function initBurgerMenu() {
  const $header = document.querySelector('.header');
  new BurgerMenu($header);
}
