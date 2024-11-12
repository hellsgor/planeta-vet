import { resolutionChecker } from '../utils/ResolutionChecker';

export const header = function () {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');

  managementHeroPaddingTop();

  window.addEventListener('resize', () => {
    managementHeroPaddingTop();
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
