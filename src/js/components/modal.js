import { fadeIn, fadeOut } from '../services/fade-animation';

const backdropClassName = 'backdrop';
export const modalClassName = 'modal';

export class Modal {
  $modal = null;
  $closeButton = null;
  $backdrop = null;

  otherModals = null;
  calledButtonsCollection = null;

  static classNames = {
    closeButton: `${modalClassName}__close-button`,
  };

  static attrs = {
    calledButton: 'data-call-modal',
    modalName: 'data-modal-name',
    state: 'data-modal-state',
  };

  static states = {
    initialized: 'initialized',
    showing: 'showing',
    hidden: 'hidden',
  };

  constructor($modal, $backdrop = null, otherModals) {
    this.$modal = $modal;
    this.otherModals = otherModals || null;
    this.$backdrop = $backdrop || document.querySelector(`body > .${backdropClassName}`) || null;

    this.getElements();
    this.addEvents();
    this.setState(Modal.states.initialized);
  }

  getElements() {
    this.$closeButton = this.$modal.querySelector(`.${Modal.classNames.closeButton}`);
    this.calledButtonsCollection = document.querySelectorAll(
      `[${Modal.attrs.calledButton}="${this.$modal.getAttribute(Modal.attrs.modalName)}"]`,
    );
  }

  addEvents() {
    this.calledButtonsCollection.forEach(($calledButton) =>
      $calledButton.addEventListener('click', this.show.bind(this)),
    );

    this.$closeButton.addEventListener('click', this.hide.bind(this));

    this.$backdrop.addEventListener('click', this.hideAll.bind(this));
  }

  show() {
    document.body.style.overflow = 'hidden';

    this.showBackdrop();

    this.checkOpened();
    fadeIn(this.$modal, { scale: 0.97 });
    this.setState(Modal.states.showing);
  }

  hide(notHideBackdrop = false) {
    let count = 0;

    fadeOut(this.$modal, { duration: 0.15 });
    this.setState(Modal.states.initialized);

    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(Modal.attrs.state) === Modal.states.hidden) {
        fadeIn($modal);
        $modal.setAttribute(Modal.attrs.state, Modal.states.showing);
        ++count;
      }
    });

    if (count === 0 || !notHideBackdrop) {
      this.hideBackdrop();
    }

    document.body.style.removeProperty('overflow');
  }

  hideAll() {
    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(Modal.attrs.state) === Modal.states.hidden) {
        $modal.setAttribute(Modal.attrs.state, Modal.states.initialized);
        fadeOut($modal, { duration: 0.01 });
      }
    });
    this.hide();
  }

  showBackdrop() {
    if (!this.$backdrop || this.$backdrop.getAttribute(Modal.attrs.state) === Modal.states.showing) {
      return;
    }

    this.$backdrop.setAttribute(Modal.attrs.state, Modal.states.showing);
    fadeIn(this.$backdrop, { opacity: 0.5, zIndex: 109 });
  }

  hideBackdrop() {
    if (!this.$backdrop || this.$backdrop.getAttribute(Modal.attrs.state) !== Modal.states.showing) {
      return;
    }

    this.$backdrop.removeAttribute(Modal.attrs.state);
    fadeOut(this.$backdrop, { duration: 0.15 });
  }

  setState(state) {
    if (Modal.states[state]) {
      this.$modal.setAttribute(Modal.attrs.state, Modal.states[state]);
    }
  }

  checkOpened() {
    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(Modal.attrs.state) === Modal.states.showing) {
        fadeOut($modal);
        $modal.setAttribute(Modal.attrs.state, Modal.states.hidden);
      }
    });
  }
}

export const initializedModals = [];

export function initModals() {
  const notInitializedOnLoading = ['thank-you', 'services-bubble', 'burger-menu'];

  const modals = Array.from(document.querySelectorAll(`.${modalClassName}`));
  const $backdrop = document.querySelector(`body > .${backdropClassName}`);

  modals.forEach(($modal) => {
    if (!notInitializedOnLoading.includes($modal.getAttribute('data-modal-name'))) {
      const modal = new Modal(
        $modal,
        $backdrop,
        modals.filter((m) => m !== $modal),
      );

      initializedModals.push(modal);
    }
  });
}
