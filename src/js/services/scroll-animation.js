import gsap from 'gsap';
/* gsap plugins */
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function scrollAnimation() {
  //Анимация хиро
  gsap.fromTo(
    '.hero *', //* образается ко всем элементам внутри
    { autoAlpha: 0, y: '1rem' },
    { duration: 1, autoAlpha: 1, y: '0', stagger: 0.15, ease: 'power3.inOut' },
  );

  //анимация шапки, делает небольшой баунс из-за ease: back
  gsap.fromTo('header', { autoAlpha: 0, y: '-10rem' }, { autoAlpha: 1, y: 0, ease: 'back(2)', duration: 1 });

  //анимация появления секций снизу, пришлось повестить overflow-y hidden на main
  gsap.utils.toArray('section:not(.hero)').forEach((section) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, // Устанавливаем текущую секцию как триггер
        start: 'top center',
      },
    });

    tl.from(section, {
      y: '10rem',
      opacity: 0,
    }).to(section, {
      yPercent: 0,
      opacity: 1,
    });
  });

  // анимация везда с разных сторон карточек 3 концепций
  gsap.utils.toArray('.approaches-card').forEach((section, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, // Устанавливаем текущую секцию как триггер
        start: 'top center',
      },
    });

    const xDirection = index % 2 === 0 ? 100 : -100;
    tl.from(section, { xPercent: xDirection }).to(section, { xPercent: 0 });
  });
}
