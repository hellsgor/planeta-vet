class CountdownTimer {
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

    // Обновляем значения в таймере
    this.daysElem.textContent = days;
    this.hoursElem.textContent = hours;
    this.minutesElem.textContent = minutes;
  }

  start() {
    this.updateCountdown(); // Первоначальный вызов для установки начальных значений
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }
}

// Пример использования
const targetDate = new Date().getTime() + 1000 * 3600 * 24 * 100; // 100 дней от текущего времени
export const initCountdownTimer = new CountdownTimer(targetDate, {
  days: '.countdown__timer-block:nth-child(1) .countdown__timer-time',
  hours: '.countdown__timer-block:nth-child(2) .countdown__timer-time',
  minutes: '.countdown__timer-block:nth-child(3) .countdown__timer-time',
});
