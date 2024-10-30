/**
 * Класс для создания аккордеона.
 */
class Accordeon {
  /**
   * Селекторы для элементов аккордеона.
   * @type {Object}
   */
  classNames = {
    list: '.accordeon-list',
    question: '.accordeon-list__item',
    answer: '.accordeon-list__answer',
  };

  /**
   * @type {NodeListOf<HTMLElement>|null} Список вопросов в аккордеоне
   */
  $questions = null;

  /**
   * @type {HTMLElement|null} Элемент с ответом в аккордеоне
   */
  $answer = null;

  /**
   * Создает экземпляр аккордеона.
   * @param {HTMLElement} $list - Элемент, содержащий список аккордеона.
   */
  constructor($list) {
    /** @type {HTMLElement} Список аккордеона */
    this.$list = $list;

    this.getElements();
    this.addEvents();
  }

  /**
   * Получает необходимые элементы аккордеона.
   */
  getElements() {
    this.$questions = this.$list.querySelectorAll(this.classNames.question);
    this.$answer = this.$list.querySelector(this.classNames.answer);
  }

  /**
   * Добавляет обработчики событий к элементам аккордеона.
   */
  addEvents() {
    this.$questions.forEach(($q) => {
      $q.addEventListener('click', function () {
        $q.classList.toggle('active');
      });
    });
  }
}

/**
 * Инициализирует все аккордеоны на странице.
 */
export const initAccordeon = function () {
  document.querySelectorAll('.accordeon-list').forEach(($acc) => {
    new Accordeon($acc);
  });
};
