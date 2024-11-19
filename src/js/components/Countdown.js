/**
 * Класс CountdownTimer создает обратный отсчет до определенной даты и отображает оставшееся
 * время (дни, часы, минуты) в выбранных HTML элементах. Целевая дата сохраняется в `localStorage`
 * для сохранения данных при обновлении страницы.
 */
export class CountdownTimer {
  /**
   * Создает экземпляр CountdownTimer.
   * @param {HTMLElement} section - Элемент секции, содержащий таймер.
   */
  constructor(section) {
    this.$section = section;

    // Получаем целевую дату из атрибута data-time
    const targetDateAttr = this.$section.getAttribute('data-time');
    if (!targetDateAttr) {
      console.error('Отсутствует атрибут data-time для целевой даты.');
      return;
    }
    // Преобразуем дату в формат Date
    const [day, month, year] = targetDateAttr.split('.').map(Number);
    this.targetDate = new Date(year, month - 1, day).getTime();

    // Инициализируем элементы для отображения
    this.daysElem = this.$section.querySelector('.countdown-days');
    this.hoursElem = this.$section.querySelector('.countdown-hours');
    this.minutesElem = this.$section.querySelector('.countdown-minutes');

    // Запуск таймера
    this.start();
  }

  /**
   * Обновляет значения обратного отсчета и отображает оставшееся время в HTML элементах.
   * Если время истекло, таймер останавливается.
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
   * Запускает таймер, вызывая обновление каждую секунду.
   */
  start() {
    this.updateCountdown(); // Первоначальный вызов для установки начальных значений
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }
}
