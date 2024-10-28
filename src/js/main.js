import '../../node_modules/modern-normalize/modern-normalize.css';
import '../scss/style.scss';

import { ResolutionChecker } from './utils/ResolutionChecker';
import { initPathToSuccess } from './components/path-to-success';
import { heroMoveItems } from './components/hero';

export const resolutionChecker = new ResolutionChecker();

document.addEventListener('DOMContentLoaded', () => {
  initPathToSuccess();
  heroMoveItems();
});
