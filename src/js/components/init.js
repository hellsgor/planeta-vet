import { CountdownTimer } from './Сountdown';

/* Инициализация обратного отсчета */
export const initCountdownTimer = function () {
  if (document.querySelector('.countdown')) {
    // Пример использования
    const targetDate = new Date().getTime() + 1000 * 3600 * 24 * 100; // 100 дней от текущего времени
    new CountdownTimer(targetDate, {
      days: '.countdown__timer-block:nth-child(1) .countdown__timer-time',
      hours: '.countdown__timer-block:nth-child(2) .countdown__timer-time',
      minutes: '.countdown__timer-block:nth-child(3) .countdown__timer-time',
    });
  }
};
