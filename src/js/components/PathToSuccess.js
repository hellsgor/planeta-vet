/**
 * Класс для управления поведением блока с классом path-to-success.
 * Класс переносит содержимое сообщения из desktop-версии в мобильную версию.
 */
class PathToSuccess {
  /**
   * Элемент секции.
   * @type {HTMLElement}
   */
  $section = null;

  /**
   * Элемент с сообщением для desktop-версии.
   * @type {HTMLElement}
   */
  $messageDesktop = null;

  /**
   * Элемент с сообщением для мобильной версии.
   * @type {HTMLElement}
   */
  $messageMobile = null;

  /**
   * Объект с классами, используемыми для поиска элементов.
   * @type {Object}
   * @property {string} section - Класс секции.
   * @property {string} messageDesktop - Класс для desktop-версии сообщения.
   * @property {string} messageMobile - Класс для мобильной версии сообщения.
   */
  classNames = {
    section: 'path-to-success',
    messageDesktop: 'message',
    messageMobile: 'message-mobile',
  };

  /**
   * Создаёт экземпляр класса и инициализирует элементы.
   * @param {HTMLElement} $section - Секция.
   */
  constructor($section) {
    this.$section = $section;

    this.getElements();
    this.transferMessageContent();
  }

  /**
   * Получает ссылки на элементы с сообщениями для desktop и mobile.
   */
  getElements() {
    this.$messageDesktop = this.$section.querySelector(
      `.${this.classNames.section}__${this.classNames.messageDesktop}`,
    );
    this.$messageMobile = this.$section.querySelector(`.${this.classNames.section}__${this.classNames.messageMobile}`);
  }

  /**
   * Переносит текстовое содержимое из desktop-сообщения в мобильную версию.
   */
  transferMessageContent() {
    this.$messageMobile.textContent = this.$messageDesktop.querySelector('p').textContent;
  }
}

/**
 * Инициализирует класс PathToSuccess, если секция существует на странице.
 * @function
 */
export function initPathToSuccess() {
  const $pathToSuccessSection = document.querySelector('.path-to-success');

  if (!$pathToSuccessSection) return;

  new PathToSuccess($pathToSuccessSection);
}
