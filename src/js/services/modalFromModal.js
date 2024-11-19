import { initializedModals, Modal } from '../components/Modal';
import { thankYou } from '../components/thankYou';

const thankYouLastStepModals = ['cooperation', 'forgot'];

/**
 * Функция, вызываемая для отображения модального окна "Спасибо" после завершения работы формы.
 * Если модальное окно является последним этапом (например, форма кооперации или восстановления пароля),
 * оно скрывается, и отображается "Спасибо".
 *
 * @param {Object} data - Данные, которые передаются в функцию для отображения "Спасибо".
 * @param {string} dataModalNameAttrValue - Имя модального окна, которое будет скрыто после выполнения функции.
 */
export function modalFromModal(data, dataModalNameAttrValue) {
  const modal = getModalInstanceByModalName(dataModalNameAttrValue);

  // Если модальное окно является последним шагом, скрыть его и показать следующее окно
  if (thankYouLastStepModals.includes(modal.$modal.getAttribute(Modal.attrs.modalName))) {
    getModalInstanceByModalName('entrance').setState(Modal.states.initialized);
    modal.hide(true);
  }

  // Задержка перед вызовом функции thankYou
  // необходима для корректной работы backdrop (костыль)
  setTimeout(() => {
    thankYou(data);
  }, 500);
}

/**
 * Находит экземпляр модального окна по его имени.
 *
 * @param {string} modalName - Имя модального окна, которое необходимо найти.
 * @returns {Modal|null} Экземпляр модального окна, если оно найдено, или null, если окно не найдено.
 */
function getModalInstanceByModalName(modalName) {
  return initializedModals.find(
    (modalInstance) => modalInstance.$modal.getAttribute(Modal.attrs.modalName) === modalName,
  );
}
