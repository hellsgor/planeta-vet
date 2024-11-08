import '../../node_modules/modern-normalize/modern-normalize.css';
import '../scss/style.scss';
import gsap from 'gsap';
/* gsap plugins */
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { initModals } from './components/modal';
import { ResolutionChecker } from './utils/ResolutionChecker';
import { initPathToSuccess } from './components/path-to-success';
import { initHero } from './components/hero';
import { initBurgerMenu } from './components/burger-menu';
import { showServicesInfo } from './components/concept';
import { initStartInNumbers } from './components/start-in-numbers ';
import { initAccordeon } from './components/accordeon';
import { header } from './components/header';
import { initCountdownTimer } from './components/init';
import { initSwipers } from './services/Swiper';
import { initTabs } from './utils/Tabs';
import { initCatalog } from './components/services-catalog';
import { initYaMap } from './services/YaMap';

export const resolutionChecker = new ResolutionChecker();

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initStartInNumbers();
  initPathToSuccess();
  showServicesInfo();
  initBurgerMenu();
  initModals();
  initAccordeon();
  initSwipers();
  initTabs();
  initCatalog();
  header();
  initCountdownTimer();
  initYaMap();

  // const tweens = gsap.from('section', {
  //   xPercent: '-100',
  //   opacity: 0,
  // });
  // tweens.array.forEach((tween) => {
  //   tween.to();
  // });

  gsap.utils.toArray('section').forEach((section, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, // Устанавливаем текущую секцию как триггер
        start: 'top 40%', // Начинаем анимацию, когда верх секции достигает нижней части экрана
      },
    });

    const xDirection = index % 2 === 0 ? 100 : -100;

    tl.from(section, { xPercent: xDirection }).to(section, { xPercent: 0 });
  });
});
