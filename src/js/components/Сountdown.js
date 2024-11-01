/**
 * Класс CountdownTimer создает обратный отсчет до определенной даты и отображает оставшееся
 * время (дни, часы, минуты) в выбранных HTML элементах. Целевая дата сохраняется в `localStorage`
 * для сохранения данных при обновлении страницы.
 */
export class CountdownTimer {
  /** @type {Date} Целевая дата обратного отсчета. */
  targetDate = null;

  /** @type {HTMLElement} HTML элемент для отображения оставшихся дней. */
  daysElem = null;

  /** @type {HTMLElement} HTML элемент для отображения оставшихся часов. */
  hoursElem = null;

  /** @type {HTMLElement} HTML элемент для отображения оставшихся минут. */
  minutesElem = null;

  /** @type {number} Идентификатор интервала для обновления таймера. */
  countdownInterval = null;

  /**
   * Создает экземпляр CountdownTimer.
   * @param {Date} targetDate - Целевая дата обратного отсчета.
   * @param {Object} selectors - Объект с селекторами для отображения оставшегося времени.
   * @param {string} selectors.days - Селектор для элемента дней.
   * @param {string} selectors.hours - Селектор для элемента часов.
   * @param {string} selectors.minutes - Селектор для элемента минут.
   */
  constructor(targetDate, selectors) {
    const storedTargetDate = localStorage.getItem('countdownTargetDate');

    if (storedTargetDate) {
      this.targetDate = new Date(parseInt(storedTargetDate));
    } else {
      this.targetDate = targetDate;
      localStorage.setItem('countdownTargetDate', this.targetDate);
    }

    this.daysElem = document.querySelector(selectors.days);
    this.hoursElem = document.querySelector(selectors.hours);
    this.minutesElem = document.querySelector(selectors.minutes);

    this.start();
  }

  /**
   * Обновляет значения обратного отсчета и отображает оставшееся время в HTML элементах.
   * Если время истекло, таймер останавливается и удаляется из `localStorage`.
   */
  updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = this.targetDate - now;

    if (timeRemaining <= 0) {
      clearInterval(this.countdownInterval);
      this.daysElem.textContent = '0';
      this.hoursElem.textContent = '0';
      this.minutesElem.textContent = '0';
      localStorage.removeItem('countdownTargetDate');
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    // Обновляет значения в таймере
    this.daysElem.textContent = days;
    this.hoursElem.textContent = hours;
    this.minutesElem.textContent = minutes;
  }

  /**
   * Запускает таймер, вызывая обновление каждую секунду.
   */
  start() {
    this.updateCountdown(); // Первоначальный вызов для установки начальных значений
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }
}
