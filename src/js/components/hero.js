import { resolutionChecker } from '../main';
// import { debouncer } from '../utils/Debouncer';

export const heroMoveItems = function () {
  if (resolutionChecker.isLaptop()) {
    console.log('laptop');
  } else {
    console.log('asd');
  }
};

// debouncer.debounce(heroMoveItems, 350);
