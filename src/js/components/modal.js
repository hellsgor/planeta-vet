class Modal {
  $modal = null;
  $restorePasswordButton = null;

  constructor($modal) {
    this.$modal = $modal;

    if (this.$modal.classList.contains('modal_entrance')) {
      this.$restorePasswordButton = this.$modal.querySelector('.modal-entrance__forgot');
    }

    this.addEvents();
  }

  addEvents() {
    this.$modal.addEventListener('toggle', this.handleModalToggle.bind(this));

    this.$restorePasswordButton &&
      this.$restorePasswordButton.addEventListener('click', this.handleRestoreButtonClick.bind(this, 'modal-forgot'));
  }

  handleModalToggle() {
    document.body.classList[`${this.$modal.matches(':popover-open') ? 'add' : 'remove'}`]('popover-opened');
  }

  handleRestoreButtonClick(popoverId) {
    document.getElementById(popoverId).showPopover();
  }
}

export function initModals() {
  document.querySelectorAll('.modal').forEach(($modal) => {
    new Modal($modal);
  });
}
