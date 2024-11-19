import { initializedModals, Modal } from '../components/Modal';
import { thankYou } from '../components/thank-you';

const thankYouLastStepModals = ['cooperation', 'forgot'];

export function modalFromModal(data, dataModalNameAttrValue) {
  const modal = getModalInstanceByModalName(dataModalNameAttrValue);

  if (thankYouLastStepModals.includes(modal.$modal.getAttribute(Modal.attrs.modalName))) {
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
