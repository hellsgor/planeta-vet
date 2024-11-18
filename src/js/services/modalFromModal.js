import { initializedModals, Modal } from '../components/modal';
import { thankYou } from '../components/thank-you';

export function modalFromModal(data, dataModalNameAttrValue) {
  const modal = getModalInstanceByModalName(dataModalNameAttrValue);

  if (modal.$modal.getAttribute(Modal.attrs.modalName) === 'forgot') {
    getModalInstanceByModalName('entrance').setState(Modal.states.initialized);
    modal.hide(true);
  }

  setTimeout(() => {
    thankYou(data);
  }, 500);
}

function getModalInstanceByModalName(modalName) {
  return initializedModals.find(
    (modalInstance) => modalInstance.$modal.getAttribute(Modal.attrs.modalName) === modalName,
  );
}
