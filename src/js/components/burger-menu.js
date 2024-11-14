import gsap from 'gsap';
import { Debouncer } from '../utils/Debouncer';
import { resolutionChecker } from '../utils/ResolutionChecker';
import { fadeIn, fadeOut } from '../services/fade-animation';

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

  $burgerMenuCalledButton = null;
  $burgerMenu = null;
  $closeButton = null;
  $backdrop = null;

  /**
   * @type {NodeListOf<HTMLElement> | null} Контейнеры Header.
   */
  $headerContainer = null;

  /**
   * @type {Debouncer} Экземпляр класса Debouncer для дебаунсинга.
   */
  debouncer = null;

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
    burgerMenuCalledButton: '.header__burger',
    burgerMenu: '.modal_burger-menu',
    closeButton: '.modal__close-button',
    backdrop: '.burger-menu-backdrop',
  };

  /**
   * Создает экземпляр класса BurgerMenu.
   * @param {HTMLElement} $section - Корневой элемент секции Header.
   * Инициализирует элементы, добавляет обработчики событий и перемещает элементы в зависимости от разрешения экрана.
   */
  constructor($section) {
    this.$section = $section;
    this.debouncer = new Debouncer();
    this.getElements();
    this.addEvents();
    this.transferElements();
  }

  /**
   * Добавляет обработчик события изменения размера окна с задержкой.
   * Использует дебаунсер для оптимизации частоты вызова.
   */
  addEvents() {
    window.addEventListener('resize', this.debouncer.debounce(this.transferElements.bind(this), 350));

    this.$burgerMenuCalledButton.addEventListener('click', this.show.bind(this));

    this.$closeButton.addEventListener('click', this.hide.bind(this));
    this.$backdrop.addEventListener('click', this.hide.bind(this));
  }

  /**
   * Инициализирует элементы внутри секции Header, присваивая их соответствующим свойствам класса.
   */
  getElements() {
    this.$select = this.$section.querySelector(this.classNames.select);
    this.$menu = this.$section.querySelector(this.classNames.menu);
    this.$login = this.$section.querySelector(this.classNames.login);
    this.$request = this.$section.querySelector(this.classNames.request);
    this.$burgerMenuContainer = this.$section.querySelector(this.classNames.burgerMenuContainer);
    this.$headerContainer = this.$section.querySelectorAll(this.classNames.headerContainer);
    this.$burgerMenuCalledButton = this.$section.querySelector(this.classNames.burgerMenuCalledButton);
    this.$burgerMenu = this.$section.querySelector(this.classNames.burgerMenu);
    this.$closeButton = this.$burgerMenu.querySelector(this.classNames.closeButton);
    this.$backdrop = this.$section.querySelector(this.classNames.backdrop);
  }

  /**
   * Перемещает элементы внутри секции Header в зависимости от разрешения экрана.
   * - Для ноутбуков элементы меню переносятся в бургер-меню.
   * - Для мобильных разрешений кнопка запроса перемещается в меню.
   * - Для остальных разрешений кнопка запроса перемещается в другой контейнер.
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

  show() {
    console.log(
      parseFloat(getComputedStyle(this.$section).marginTop)
        ? -parseFloat(getComputedStyle(this.$section).marginTop)
        : 0,
    );
    // document.body.style.overflow = 'hidden';

    gsap.to(this.$backdrop, {
      startAt: {
        y: parseFloat(getComputedStyle(this.$section).marginTop)
          ? -parseFloat(getComputedStyle(this.$section).marginTop)
          : 0,
      },
    });

    fadeIn(this.$backdrop, { zIndex: 104, opacity: 0.5 });

    gsap.to(this.$burgerMenu, {
      startAt: {
        display: 'block',
        zIndex: 105,
        y: parseFloat(getComputedStyle(this.$section).marginTop)
          ? -parseFloat(getComputedStyle(this.$section).marginTop)
          : 0,
      },
      xPercent: 0,
      left: -parseFloat(getComputedStyle(this.$section).marginLeft),
    });
    this.$burgerMenu.setAttribute('data-state', 'showing');
  }

  hide() {
    fadeOut(this.$backdrop, { duration: 0.15 });
    gsap.to(this.$burgerMenu, {
      xPercent: -100,
      duration: 0.15,

      onComplete: () => {
        gsap.set(this.$burgerMenu, {
          display: 'none',
          zIndex: -1000,
        });
        this.$burgerMenu.removeAttribute('style');
      },
    });
    this.$burgerMenu.removeAttribute('data-state');
    document.body.style.removeProperty('overflow');
  }
}

/**
 * Инициализирует бургер-меню в секции Header.
 * Создает экземпляр класса BurgerMenu и передает корневой элемент секции Header.
 * @function
 */
export function initBurgerMenu() {
  const $header = document.querySelector('.header');
  new BurgerMenu($header);
}
