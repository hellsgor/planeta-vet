import { resolutionChecker } from '../main';

class ServicesCatalog {
  $catalog = null;

  constructor($catalog) {
    this.$catalog = $catalog;

    this.setPopoverAttr();
    this.removePopoverAttr();

    this.addEvents();
  }

  addEvents() {
    window.addEventListener('resize', this.handleWindowResize.bind(this));

    this.$catalog.addEventListener('toggle', this.handleCatalogPopoverToggle.bind(this));
  }

  setPopoverAttr() {
    if (!resolutionChecker.isCustom(991)) return;
    this.$catalog.setAttribute('popover', '');
  }

  removePopoverAttr() {
    if (resolutionChecker.isCustom(991)) return;
    this.$catalog.removeAttribute('popover', '');
  }

  handleWindowResize() {
    this.setPopoverAttr();
    this.removePopoverAttr();
  }

  handleCatalogPopoverToggle() {
    document.body.classList[`${this.$catalog.matches(':popover-open') ? 'add' : 'remove'}`]('popover-opened');
  }
}

export function initCatalog() {
  const $catalog = document.querySelector('.services__catalog');
  $catalog && new ServicesCatalog($catalog);
}
