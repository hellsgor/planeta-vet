import gsap from 'gsap';
/* gsap plugins */
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function scrollAnimation() {
  //Анимация хиро
  createHeroAnimation('.hero *');

  //анимация шапки, делает небольшой баунс из-за ease: back
  createHeaderAnimation('header.header');

  //анимация появления секций снизу, пришлось повестить overflow-y hidden на main
  createSectionsSwipeFromBottomAnimation('section:not(.hero):not(.services__service)');

  // анимация везда с разных сторон карточек 3 концепций
  createSectionsSwipeFromSidesAnimation('.approaches-card');
}

function createHeroAnimation(selector) {
  return document.querySelector(selector)
    ? gsap.fromTo(
        selector,
        { autoAlpha: 0, y: '1rem' },
        { duration: 1, autoAlpha: 1, y: '0', stagger: 0.15, ease: 'power3.inOut' },
      )
    : null;
}

function createHeaderAnimation(selector) {
  return document.querySelector(selector)
    ? gsap.fromTo('header', { autoAlpha: 0, y: '-10rem' }, { autoAlpha: 1, y: 0, ease: 'back(2)', duration: 1 })
    : null;
}

function createSectionsSwipeFromBottomAnimation(selector) {
  return document.querySelector(selector)
    ? gsap.utils.toArray(selector).forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section, // Устанавливаем текущую секцию как триггер
            start: 'top 75%',
          },
        });

        tl.from(section, {
          y: '15rem',
          opacity: 0,
        }).to(section, {
          yPercent: 0,
          opacity: 1,
        });
      })
    : null;
}

function createSectionsSwipeFromSidesAnimation(selector) {
  return document.querySelector(selector)
    ? gsap.utils.toArray(selector).forEach((section, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section, // Устанавливаем текущую секцию как триггер
            start: 'top center',
          },
        });

        const xDirection = index % 2 === 0 ? 100 : -100;
        tl.from(section, { xPercent: xDirection }).to(section, { xPercent: 0 });
      })
    : null;
}
