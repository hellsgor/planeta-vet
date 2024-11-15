import gsap from 'gsap';

class FormControl {
  $input = null;
  $control = null;
  $error = null;

  constructor($input) {
    this.$input = $input;
    this.$control = $input.closest('div');
    this.$error = this.$control.querySelector('.form-control__error');

    this.addEvents();
  }

  addEvents() {
    this.$input.addEventListener('focus', this.hideError.bind(this));
  }

  hideError() {
    if (!this.$error?.textContent) return;

    gsap.to(this.$error, {
      startAt: {
        opacity: 1,
      },
      opacity: 0,
      duration: 0.3,

      onComplete: () => {
        this.$error.textContent = '';
        this.$error.removeAttribute('style');
      },
    });
  }
}

export function initControls() {
  document.querySelectorAll('input').forEach(($control) => new FormControl($control));
}
