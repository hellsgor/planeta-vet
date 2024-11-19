import gsap from 'gsap';

/**
 * Класс `FormControl` отвечает за обработку состояния и анимацию ошибок для полей формы.
 */
class FormControl {
  /**
   * @property {HTMLInputElement} $input - Входное поле формы.
   * @property {HTMLElement} $control - Контейнер, содержащий элемент управления формой.
   * @property {HTMLElement} $error - Элемент для отображения текста ошибки.
   */

  $input = null;
  $control = null;
  $error = null;

  /**
   * Создаёт экземпляр `FormControl`.
   * @param {HTMLInputElement} $input - Элемент input, для которого будет обрабатываться состояние ошибки.
   */
  constructor($input) {
    this.$input = $input;
    this.$control = $input.closest('div');
    this.$error = this.$control.querySelector('.form-control__error');

    this.addEvents();
  }

  /**
   * Добавляет обработчики событий на элемент input.
   * В частности, добавляется обработчик `focus`, который скрывает сообщение об ошибке при фокусе.
   * @private
   */
  addEvents() {
    this.$input.addEventListener('focus', this.hideError.bind(this));
  }

  /**
   * Скрывает сообщение об ошибке с анимацией.
   * Если текст ошибки отсутствует, функция завершает выполнение.
   */
  hideError() {
    if (!this.$error?.textContent) return;

    gsap.to(this.$error, {
      startAt: {
        opacity: 1,
      },
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        this.$error.textContent = '';
        this.$error.removeAttribute('style');
      },
    });
  }
}

/**
 * Инициализирует элементы управления формы.
 * Находит все input-элементы на странице и создаёт экземпляры `FormControl` для каждого из них.
 */
export function initControls() {
  document.querySelectorAll('input').forEach(($control) => new FormControl($control));
}
