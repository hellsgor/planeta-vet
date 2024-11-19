import { resolutionChecker } from '../utils/ResolutionChecker';

/**
 * Класс, представляющий каталог услуг с функциональностью popover.
 * Управляет видимостью и атрибутами popover каталога в зависимости от разрешения экрана и событий переключения.
 */
class ServicesCatalog {
  /**
   * HTML-элемент каталога.
   * @type {HTMLElement}
   */
  $catalog = null;

  /**
   * Создаёт экземпляр ServicesCatalog.
   * @param {HTMLElement} $catalog - HTML-элемент каталога.
   */
  constructor($catalog) {
    this.$catalog = $catalog;
    this.setPopoverAttr();
    this.removePopoverAttr();
    this.addEvents();
  }

  /**
   * Добавляет обработчики событий для изменения размеров окна и переключения popover каталога.
   */
  addEvents() {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
    this.$catalog.addEventListener('toggle', this.handleCatalogPopoverToggle.bind(this));
  }

  /**
   * Устанавливает атрибут 'popover' на элемент каталога, если разрешение экрана не превышает 991px.
   */
  setPopoverAttr() {
    if (!resolutionChecker.isCustom(991)) return;
    this.$catalog.setAttribute('popover', '');
  }

  /**
   * Удаляет атрибут 'popover' с элемента каталога, если разрешение экрана более 991px.
   */
  removePopoverAttr() {
    if (resolutionChecker.isCustom(991)) return;
    this.$catalog.removeAttribute('popover', '');
  }

  /**
   * Обрабатывает событие изменения размера окна и обновляет атрибут popover в зависимости от разрешения.
   */
  handleWindowResize() {
    this.setPopoverAttr();
    this.removePopoverAttr();
  }

  /**
   * Добавляет или удаляет класс 'popover-opened' на элементе body в зависимости от состояния popover у каталога.
   */
  handleCatalogPopoverToggle() {
    document.body.classList[`${this.$catalog.matches(':popover-open') ? 'add' : 'remove'}`]('popover-opened');
  }
}

/**
 * Инициализирует компонент ServicesCatalog, привязывая его к элементу каталога на странице.
 */
export function initCatalog() {
  const $catalog = document.querySelector('.services__catalog');
  if ($catalog) new ServicesCatalog($catalog);
}
