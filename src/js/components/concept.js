import { resolutionChecker } from '../main';

export const showServicesInfo = function () {
  const lis = document.querySelectorAll('.concept__services li');

  lis.forEach((li) => {
    li.addEventListener('click', function () {
      if (!resolutionChecker.isTablet()) {
        // Проверяем, есть ли <p> без класса active внутри текущего <li>
        if (this.querySelector('p:not(.active)')) {
          // Убираем класс active у всех <p> внутри <li> элементов
          lis.forEach((item) => item.querySelector('p').classList.remove('active'));

          // Добавляем класс active только к текущему <p>
          this.querySelector('p').classList.add('active');
        } else {
          // Если кликнули по открытому <p>, убираем класс active
          this.querySelector('p').classList.remove('active');
        }
      }
      if (resolutionChecker.isTablet()) {
        const modal = document.querySelector('#modal-services-bubble');
        modal.querySelector('.modal-services-bubble__title').innerHTML = this.firstChild.textContent.trim();
        modal.querySelector('.modal-services-bubble__text').innerHTML = this.querySelector('p').textContent;

        modal.showPopover();
      }
    });
  });
};
