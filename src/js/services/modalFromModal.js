import { initializedModals, Modal } from '../components/modal';
import { thankYou } from '../components/thank-you';

export function modalFromModal(data, dataModalNameAttrValue) {
  const entranceModal = initializedModals.find(
    (modalInstance) => modalInstance.$modal.getAttribute(Modal.attrs.modalName) === dataModalNameAttrValue,
  );

  entranceModal.hide(true);
  thankYou(data);
}
