import gsap from 'gsap';
/* gsap plugins */
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function scrollAnimation() {
  gsap.utils.toArray('section:not(.approaches):not(.hero)').forEach((section, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, // Устанавливаем текущую секцию как триггер
        start: 'top 40%', // Начинаем анимацию, когда верх секции достигает нижней части экрана
      },
    });

    const xDirection = index % 2 === 0 ? 100 : -100;

    tl.from(section, { xPercent: xDirection }).to(section, { xPercent: 0 });
  });

  gsap.utils.toArray('.approaches-card').forEach((section, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, // Устанавливаем текущую секцию как триггер
        start: 'top 40%', // Начинаем анимацию, когда верх секции достигает нижней части экрана
      },
    });

    const xDirection = index % 2 === 0 ? 100 : -100;
    tl.from(section, { xPercent: xDirection }).to(section, { xPercent: 0 });
  });
}
