class Modal {
  $modal = null;
  $restorePasswordButton = null;
  $basicCloseButton = null;

  constructor($modal) {
    this.$modal = $modal;
    this.$basicCloseButton = this.$modal.querySelector('.modal__close-button');

    if (this.$modal.classList.contains('modal_entrance')) {
      this.$restorePasswordButton = this.$modal.querySelector('.modal-entrance__forgot');
    }

    this.addEvents();
  }

  addEvents() {
    this.$modal.addEventListener('toggle', this.handleModalToggle.bind(this));

    this.$restorePasswordButton &&
      this.$restorePasswordButton.addEventListener('click', this.showPopover.bind(this, 'modal-forgot'));

    if (this.$modal.classList.contains('modal_forgot')) {
      this.$basicCloseButton.addEventListener('click', this.showPopover.bind(this, 'modal-entrance'));
    }
  }

  handleModalToggle() {
    document.body.classList[`${this.$modal.matches(':popover-open') ? 'add' : 'remove'}`]('popover-opened');
  }

  showPopover(popoverId) {
    document.getElementById(popoverId).showPopover();
  }
}

export function initModals() {
  document.querySelectorAll('.modal').forEach(($modal) => {
    new Modal($modal);
  });
}
