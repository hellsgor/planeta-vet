import { resolutionChecker } from '../utils/ResolutionChecker';
import { Debouncer } from '../utils/Debouncer';

import { handleAboutHrefScroll } from '../utils/handleAboutHrefScroll';

/**
 * Функция для управления поведением шапки сайта (header) и её взаимодействием с секцией hero.
 * В зависимости от размера экрана и прокрутки страницы она корректирует отступы и внешние отступы.
 */
export const header = function () {
  /**
   * Элемент шапки сайта.
   * @type {HTMLElement}
   */
  const header = document.querySelector('header');

  /**
   * Элемент секции hero.
   * @type {HTMLElement}
   */
  const hero = document.querySelector('.hero');

  /**
   * Экземпляр дебаунсера для оптимизации событий изменения размера окна.
   * @type {Debouncer}
   */
  const debouncer = new Debouncer();

  // Инициализирует отступы для секции hero
  managementHeroPaddingTop();

  // Добавляет обработчики событий для изменения размера окна и прокрутки
  window.addEventListener('resize', () => {
    debouncer.debounce(managementHeroPaddingTop, 350);
  });

  window.addEventListener('scroll', () => {
    managementHeaderMarginTopOnScroll();
  });

  /**
   * Управляет верхним отступом секции hero в зависимости от размера экрана.
   * Убирает отступ на мобильных устройствах и добавляет отступ, равный высоте шапки, для других разрешений.
   */
  function managementHeroPaddingTop() {
    if (resolutionChecker.isMobile()) {
      hero.style.removeProperty('padding-top');
    } else {
      hero.style.paddingTop = header.offsetHeight + 8 + 34 + 'px';
    }
  }

  /**
   * Управляет верхним отступом шапки при прокрутке страницы.
   * Если страница прокручена на 34px и более, устанавливается margin-top равным 0.
   * В противном случае отступ удаляется.
   */
  function managementHeaderMarginTopOnScroll() {
    if (window.scrollY >= 34) {
      header.style.marginTop = '0';
    } else {
      header.style.removeProperty('margin-top');
    }
  }

  (function handleAboutClickEvent() {
    document.querySelector('a[href="/#about"').addEventListener('click', (e) => {
      e.preventDefault();
      window.localStorage.setItem('about_href', '#about');
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      handleAboutHrefScroll();
    });
  })();
};
