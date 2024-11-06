import { CountdownTimer } from './Сountdown';

/* Инициализация обратного отсчета */
export const initCountdownTimer = function () {
  const section = document.querySelector('.countdown');

  if (section) {
    // Передаем HTML-элемент в конструктор CountdownTimer
    new CountdownTimer(section);
  } else {
    console.error('Не удалось найти элемент с классом .countdown');
  }
};
