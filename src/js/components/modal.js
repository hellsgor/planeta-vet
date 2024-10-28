class Modal {
  $modal = null;

  constructor($modal) {
    this.$modal = $modal;

    this.addEvents();
  }
  addEvents() {
    this.$modal.addEventListener('toggle', this.handleModalToggle.bind(this));
  }

  handleModalToggle() {
    document.body.classList[`${this.$modal.matches(':popover-open') ? 'add' : 'remove'}`]('popover-opened');
  }
}

export function initModals() {
  document.querySelectorAll('.modal').forEach(($modal) => {
    new Modal($modal);
  });
}
