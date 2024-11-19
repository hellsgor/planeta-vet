/**
 * Класс CountdownTimer создает обратный отсчет до определенной даты и отображает оставшееся
 * время (дни, часы, минуты) в указанных HTML элементах. Целевая дата сохраняется в `localStorage`
 * для сохранения данных при обновлении страницы.
 */
export class CountdownTimer {
  /**
   * Создает экземпляр CountdownTimer.
   * @param {HTMLElement} section - HTML элемент, содержащий таймер.
   */
  constructor(section) {
    this.$section = section;

    /**
     * Получаем целевую дату из атрибута `data-time`, установленного на секции.
     * @type {number} - Количество миллисекунд до целевой даты.
     */
    const targetDateAttr = this.$section.getAttribute('data-time');
    if (!targetDateAttr) {
      console.error('Отсутствует атрибут data-time для целевой даты.');
      return;
    }

    const [day, month, year] = targetDateAttr.split('.').map(Number);
    this.targetDate = new Date(year, month - 1, day).getTime();

    /**
     * Элементы для отображения оставшегося времени (дней, часов, минут).
     * @type {HTMLElement}
     */
    this.daysElem = this.$section.querySelector('.countdown-days');
    this.hoursElem = this.$section.querySelector('.countdown-hours');
    this.minutesElem = this.$section.querySelector('.countdown-minutes');

    /**
     * Идентификатор интервала для обновления таймера.
     * @type {number}
     */
    this.countdownInterval = null;

    // Запуск таймера
    this.start();
  }

  /**
   * Обновляет значения обратного отсчета и отображает оставшееся время в HTML элементах.
   * Если время истекло, таймер останавливается и показывает нули.
   */
  updateCountdown() {
    const now = Date.now();
    const timeRemaining = this.targetDate - now;

    if (timeRemaining <= 0) {
      clearInterval(this.countdownInterval);
      this.daysElem.textContent = '0';
      this.hoursElem.textContent = '0';
      this.minutesElem.textContent = '0';
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    // Обновляем значения в HTML
    this.daysElem.textContent = days;
    this.hoursElem.textContent = hours;
    this.minutesElem.textContent = minutes;
  }

  /**
   * Запускает таймер, устанавливая начальные значения и обновляя их каждую секунду.
   */
  start() {
    this.updateCountdown(); // Первоначальный вызов для отображения начальных значений
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }
}

/**
 * Инициализация обратного отсчета.
 * Проверяет наличие элемента таймера на странице и, если он присутствует, создает экземпляр CountdownTimer.
 */
export const initCountdownTimer = function () {
  const section = document.querySelector('.countdown');

  if (section) {
    // Передаем HTML-элемент в конструктор CountdownTimer
    new CountdownTimer(section);
  }
};
