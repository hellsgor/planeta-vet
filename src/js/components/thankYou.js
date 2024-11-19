import { Modal } from './Modal';

const $modal = document.getElementById('modal-thank-you');
const modalInstance = new Modal($modal);
const $closeButton = $modal.querySelector('.modal-thank-you__close-button');

/**
 * Открывает модальное окно «Thank You» и заполняет его данными.
 *
 * @param {Object} data - Данные для отображения в модальном окне.
 * @param {string} [data.title] - Заголовок модального окна.
 * @param {string} [data.text] - Основной текст модального окна.
 * @param {string} [data.button] - Текст кнопки закрытия.
 * @param {string} [data.status='success'] - Статус, определяющий оформление окна (например, «success» или «error»).
 */
export function thankYou(data) {
  const $title = $modal.querySelector('.modal-thank-you__title');
  const $text = $modal.querySelector('.modal-thank-you__text');
  const $buttonText = $modal.querySelector('.modal-thank-you__close-button .button__text');

  fillElements();

  // Открываем модальное окно
  modalInstance.show();

  // Добавляем обработчик для кнопки закрытия
  $closeButton.addEventListener('click', hideModal);

  /**
   * Заполняет элементы модального окна данными.
   * Изменяет классы для состояния ошибки при необходимости.
   */
  function fillElements() {
    if (data.title) $title.textContent = data.title;
    if (data.text) $text.textContent = data.text;
    if (data.button) $buttonText.textContent = data.button;

    $modal
      .querySelector('.modal-thank-you')
      .classList[`${data.status !== 'success' ? 'add' : 'remove'}`]('modal-thank-you_errored');
  }
}

/**
 * Закрывает модальное окно и удаляет обработчик клика с кнопки закрытия.
 */
function hideModal() {
  modalInstance.hide();
  $closeButton.removeEventListener('click', hideModal);
}
