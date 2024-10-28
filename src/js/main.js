import '../../node_modules/modern-normalize/modern-normalize.css';
import '../scss/style.scss';
import { initModals } from './components/modal';

import { ResolutionChecker } from './utils/ResolutionChecker';
import { initPathToSuccess } from './components/path-to-success';
import { initHero } from './components/hero';
import { initBurgerMenu } from './components/burger-menu';

export const resolutionChecker = new ResolutionChecker();

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initPathToSuccess();
  initBurgerMenu();
  initModals();
});
