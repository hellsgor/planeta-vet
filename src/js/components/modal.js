import { fadeIn, fadeOut } from '../services/fade-animation';

const backdropId = 'backdrop';
const modalClassName = 'modal';

class Modal {
  $modal = null;
  $closeButton = null;
  $backdrop = null;

  calledButtonsCollection = null;

  classNames = {
    closeButton: `${modalClassName}__close-button`,
  };

  modifiers = {
    hidden: 'hidden',
  };

  attrs = {
    calledButton: 'data-call-modal',
    modalName: 'data-modal-name',
    state: 'data-modal-state',
  };

  states = {
    initialized: 'initialized',
    showing: 'showing',
  };

  constructor($modal, $backdrop = null) {
    this.$modal = $modal;
    this.setState(this.states.initialized);

    this.$backdrop = $backdrop || document.getElementById(backdropId) || null;

    this.getElements();
    this.addEvents();
  }

  getElements() {
    this.$closeButton = this.$modal.querySelector(`.${this.classNames.closeButton}`);
    this.calledButtonsCollection = document.querySelectorAll(
      `[${this.attrs.calledButton}="${this.$modal.getAttribute(this.attrs.modalName)}"]`,
    );
  }

  addEvents() {
    this.calledButtonsCollection.forEach(($calledButton) =>
      $calledButton.addEventListener('click', this.show.bind(this)),
    );

    this.$closeButton.addEventListener('click', this.hide.bind(this));

    this.$backdrop.addEventListener('click', () => {
      if (this.$modal.getAttribute(this.attrs.state) === this.states.showing) this.hide();
    });
  }

  show() {
    document.body.style.overflow = 'hidden';
    if (this.$backdrop) fadeIn(this.$backdrop, { opacity: 0.5, zIndex: 109 });
    fadeIn(this.$modal, { scale: 0.97 });

    this.setState(this.states.showing);
  }

  hide() {
    if (this.$backdrop) fadeOut(this.$backdrop);
    fadeOut(this.$modal);
    document.body.style.removeProperty('overflow');

    this.setState(this.states.initialized);
  }

  setState(state) {
    if (this.states[state]) {
      this.$modal.setAttribute(this.attrs.state, this.states[state]);
    }
  }
}

export function initModals() {
  const notInitializedOnLoading = ['thank-you'];

  const $backdrop = document.getElementById(backdropId);

  document.querySelectorAll(`.${modalClassName}`).forEach(($modal) => {
    if (!notInitializedOnLoading.includes($modal.getAttribute('data-modal-name'))) new Modal($modal, $backdrop);
  });
}
