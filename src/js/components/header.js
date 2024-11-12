import { resolutionChecker } from '../utils/ResolutionChecker';
import { Debouncer } from '../utils/Debouncer';

export const header = function () {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');

  const debouncer = new Debouncer();
  const debouncedManagementHeroPaddingTop = debouncer.debounce(managementHeroPaddingTop, 350);

  managementHeroPaddingTop();

  window.addEventListener('resize', () => {
    debouncedManagementHeroPaddingTop();
  });

  window.addEventListener('scroll', () => {
    managementHeaderMarginTopOnScroll();
  });

  function managementHeroPaddingTop() {
    if (resolutionChecker.isMobile()) {
      hero.style.removeProperty('padding-top');
    } else {
      hero.style.paddingTop = header.offsetHeight + 8 + 34 + 'px';
    }
  }

  function managementHeaderMarginTopOnScroll() {
    if (window.scrollY >= 34) {
      header.style.marginTop = '0';
    } else {
      header.style.removeProperty('margin-top');
    }
  }
};
