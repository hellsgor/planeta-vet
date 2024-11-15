import { fadeIn, fadeOut } from '../services/fade-animation';

const backdropClassName = 'backdrop';
const modalClassName = 'modal';

export class Modal {
  $modal = null;
  $closeButton = null;
  $backdrop = null;

  otherModals = null;
  calledButtonsCollection = null;

  classNames = {
    closeButton: `${modalClassName}__close-button`,
  };

  attrs = {
    calledButton: 'data-call-modal',
    modalName: 'data-modal-name',
    state: 'data-modal-state',
  };

  states = {
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
    this.setState(this.states.initialized);
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

    this.$backdrop.addEventListener('click', this.hideAll.bind(this));
  }

  show() {
    document.body.style.overflow = 'hidden';

    this.showBackdrop();

    this.checkOpened();
    fadeIn(this.$modal, { scale: 0.97 });
    this.setState(this.states.showing);
  }

  hide(notHideBackdrop = null) {
    let count = 0;

    fadeOut(this.$modal, { duration: 0.15 });
    this.setState(this.states.initialized);

    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(this.attrs.state) === this.states.hidden) {
        fadeIn($modal);
        $modal.setAttribute(this.attrs.state, this.states.showing);
        ++count;
      }
    });

    !count && !notHideBackdrop && this.hideBackdrop();

    document.body.style.removeProperty('overflow');
  }

  hideAll() {
    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(this.attrs.state) === this.states.hidden) {
        $modal.setAttribute(this.attrs.state, this.states.initialized);
        fadeOut($modal, { duration: 0.01 });
      }
    });
    this.hide();
  }

  showBackdrop() {
    if (!this.$backdrop || this.$backdrop.getAttribute(this.attrs.state) === this.states.showing) {
      return;
    }

    this.$backdrop.setAttribute(this.attrs.state, this.states.showing);
    fadeIn(this.$backdrop, { opacity: 0.5, zIndex: 109 });
  }

  hideBackdrop() {
    if (!this.$backdrop || this.$backdrop.getAttribute(this.attrs.state) !== this.states.showing) {
      return;
    }

    this.$backdrop.removeAttribute(this.attrs.state);
    fadeOut(this.$backdrop, { duration: 0.15 });
  }

  setState(state) {
    if (this.states[state]) {
      this.$modal.setAttribute(this.attrs.state, this.states[state]);
    }
  }

  checkOpened() {
    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(this.attrs.state) === this.states.showing) {
        fadeOut($modal);
        $modal.setAttribute(this.attrs.state, this.states.hidden);
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
