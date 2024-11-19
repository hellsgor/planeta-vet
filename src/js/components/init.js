import { CountdownTimer } from './Countdown';

/* Инициализация обратного отсчета */
export const initCountdownTimer = function () {
  const section = document.querySelector('.countdown');

  if (section) {
    // Передаем HTML-элемент в конструктор CountdownTimer
    new CountdownTimer(section);
  }
};
