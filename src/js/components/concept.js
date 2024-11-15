import { resolutionChecker } from '../utils/ResolutionChecker';

/**
 * Функция, обрабатывающая клики по элементам списка услуг.
 * В зависимости от разрешения экрана, она либо переключает активные абзацы в списке, либо отображает информацию в модальном окне.
 */
export const showServicesInfo = function () {
  /**
   * Выбирает все элементы списка услуг.
   * @type {NodeListOf<HTMLElement>}
   */
  const lis = document.querySelectorAll('.concept__services li');

  lis.forEach((li) => {
    li.addEventListener('click', function () {
      // Если экран не планшетный
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

      // Если экран планшетный
      if (resolutionChecker.isTablet()) {
        /**
         * Модальное окно для отображения информации об услуге.
         * @type {HTMLElement}
         */
        const modal = document.querySelector('#modal-services-bubble');
        modal.classList.remove('modal_hidden');
        modal.setAttribute('popover', '');

        /**
         * Обновление содержимого модального окна.
         */
        console.log(234);
        modal.querySelector('.modal-services-bubble__title').innerHTML = this.firstChild.textContent.trim();
        modal.querySelector('.modal-services-bubble__text').innerHTML = this.querySelector('p').textContent;

        // Показываем модальное окно с информацией
        modal.showPopover();
      }
    });
  });
};
