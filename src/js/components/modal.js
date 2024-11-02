/**
 * @class Modal
 * @description
 * Класс для управления модальными окнами на странице.
 *
 * @param {HTMLElement} $modal - Элемент модального окна.
 */
class Modal {
  /**
   * @property {HTMLElement} $modal
   * @description
   * Элемент модального окна.
   */
  $modal;

  /**
   * @property {HTMLElement} $basicCloseButton
   * @description
   * Кнопка закрытия модального окна.
   */
  $basicCloseButton;

  /**
   * @property {HTMLElement} $restorePasswordButton
   * @description
   * Кнопка восстановления пароля (если присутствует).
   */
  $restorePasswordButton;

  /**
   * @constructor
   * @param {HTMLElement} $modal
   */
  constructor($modal) {
    /**
     * Инициализация свойств.
     */
    this.$modal = $modal;
    this.$basicCloseButton = this.$modal.querySelector('.modal__close-button');

    /**
     * Проверка наличия кнопки восстановления пароля.
     */
    if (this.$modal.classList.contains('modal_entrance')) {
      this.$restorePasswordButton = this.$modal.querySelector('.modal-entrance__forgot');
    }

    /**
     * Добавление событий.
     */
    this.addEvents();
  }

  /**
   * @method addEvents
   * @description
   * Добавление обработчиков событий на элементы модального окна.
   */
  addEvents() {
    this.$modal.addEventListener('toggle', this.handleModalToggle.bind(this));

    this.$restorePasswordButton &&
      this.$restorePasswordButton.addEventListener('click', this.showPopover.bind(this, 'modal-forgot'));

    if (this.$modal.classList.contains('modal_forgot')) {
      this.$basicCloseButton.addEventListener('click', this.showPopover.bind(this, 'modal-entrance'));
    }
  }

  /**
   * @method handleModalToggle
   * @description
   * Обработка переключения модального окна.
   */
  handleModalToggle() {
    document.body.classList[`${this.$modal.matches(':popover-open') ? 'add' : 'remove'}`]('popover-opened');
  }

  /**
   * @method showPopover
   * @param {string} popoverId
   * @description
   * Показ всплывающего окна с заданным идентификатором.
   */
  showPopover(popoverId) {
    document.getElementById(popoverId).showPopover();
  }
}

/**
 * @function initModals
 * @description
 * Инициализация всех модальных окон на странице.
 */
export function initModals() {
  document.querySelectorAll('.modal').forEach(($modal) => {
    new Modal($modal);
  });
}
