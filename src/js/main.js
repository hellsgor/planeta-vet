import '../../node_modules/modern-normalize/modern-normalize.css';
import '../scss/style.scss';
import { initModals } from './components/modal';

import { ResolutionChecker } from './utils/ResolutionChecker';
import { initPathToSuccess } from './components/path-to-success';
import { initHero } from './components/hero';
import { initBurgerMenu } from './components/burger-menu';
import { showServicesInfo } from './components/concept';
import { initStartInNumbers } from './components/start-in-numbers ';
import { initAccordeon } from './components/accordeon';
import { header } from './components/header';
import { initCountdownTimer } from './components/countdown';
import { initSwipers } from './services/Swiper';

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
  header();
  initCountdownTimer();
});
