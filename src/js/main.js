import '../../node_modules/modern-normalize/modern-normalize.css';
import '../scss/style.scss';
import { initModals } from './components/modal';

// import { ResolutionChecker } from './utils/ResolutionChecker';
import { initPathToSuccess } from './components/path-to-success';

// export const resolutionChecker = new ResolutionChecker();

document.addEventListener('DOMContentLoaded', () => {
  initPathToSuccess();

  initModals();
});
