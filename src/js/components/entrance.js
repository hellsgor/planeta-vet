import { initializedModals } from './modal';
import { thankYou } from './thank-you';

export function entrance(data) {
  const entranceModal = initializedModals.find((modalInstance) =>
    modalInstance.$modal.classList.contains('modal_entrance'),
  );

  entranceModal.hide(true);
  thankYou(data);
}
