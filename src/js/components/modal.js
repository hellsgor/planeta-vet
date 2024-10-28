class Modal {
  $modal = null;

  constructor($modal) {
    this.$modal = $modal;

    this.addEvents();
  }
}

export function initModals() {
  document.querySelectorAll('.modal').forEach(($modal) => {
    new Modal($modal);
  });
}
