import { Modal } from './Modal';

const $modal = document.getElementById('modal-thank-you');
const modalInstance = new Modal($modal);
const $closeButton = $modal.querySelector('.modal-thank-you__close-button');

export function thankYou(data) {
  const $title = $modal.querySelector('.modal-thank-you__title');
  const $text = $modal.querySelector('.modal-thank-you__text');
  const $buttonText = $modal.querySelector('.modal-thank-you__close-button .button__text');

  fillElements();

  modalInstance.show();

  $closeButton.addEventListener('click', hideModal);

  function fillElements() {
    if (data.title) $title.textContent = data.title;
    if (data.text) $text.textContent = data.text;
    if (data.button) $buttonText.textContent = data.button;

    $modal
      .querySelector('.modal-thank-you')
      .classList[`${data.status !== 'success' ? 'add' : 'remove'}`]('modal-thank-you_errored');
  }
}

function hideModal() {
  modalInstance.hide();
  $closeButton.removeEventListener('click', hideModal);
}
