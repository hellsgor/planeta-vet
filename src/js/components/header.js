export const header = function () {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  const headerHeight = header.offsetHeight;
  hero.style.paddingTop = headerHeight + 8 + 34 + 'px';
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 34) {
      header.style.marginTop = '0';
    } else {
      header.style.removeProperty('margin-top');
      // Убираем стиль, если прокрутка меньше 34px
    }
  });
};
