/**
 * Класс для создания аккордеона.
 */
class Accordion {
  /**
   * Селекторы для элементов аккордеона.
   * @type {Object}
   */
  static classNames = {
    list: 'accordion-list',
    question: 'accordion-list__item',
    answer: 'accordion-list__answer',
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
    this.$questions = this.$list.querySelectorAll(`.${Accordion.classNames.question}`);
    this.$answer = this.$list.querySelector(`.${Accordion.classNames.answer}`);
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
export const initAccordion = function () {
  document.querySelectorAll(`.${Accordion.classNames.list}`).forEach(($acc) => {
    new Accordion($acc);
  });
};
