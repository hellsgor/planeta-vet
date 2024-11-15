import { errors } from '../constants/errors';

export class Validation {
  validators = [
    {
      condition: (control) => !this.requiredControlValidation(control),
      errorCode: 'er001',
    },
    {
      condition: (control) =>
        control.value &&
        (control.type === 'tel' || control.inputMode === 'tel') &&
        !this.phoneNumberControlValidation(control),
      errorCode: 'er002',
    },
    {
      condition: (control) =>
        control.value &&
        (control.type === 'email' || control.inputMode === 'email') &&
        !this.emailControlValidation(control),
      errorCode: 'er003',
    },
  ];

  validate(controls) {
    let isValid = true;

    for (let $control of controls) {
      for (let validator of this.validators) {
        if (validator.condition($control)) {
          this.showError(validator.errorCode, $control);
          isValid = false;
          break;
        }
      }
    }

    return isValid;
  }

  requiredControlValidation($control) {
    if (!$control.required) return true;
    return !!$control.value.trim();
  }

  phoneNumberControlValidation($control) {
    return /^(?:\+\d{11}|\d{11})$/.test($control.value.replace(/[^\d+]/g, ''));
  }

  emailControlValidation($control) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($control.value);
  }

  showError(errorCode = null, input, errorText = null) {
    const control = input.closest('div');
    const $error = control.querySelector('p');

    if ($error) {
      $error.innerText = errorCode
        ? errors[errorCode](
            control.querySelector('label span')?.textContent || control.querySelector('label')?.textContent,
          )
        : errorText;
    }
    control.classList.add('control_with-error');
  }

  hideErrors(controls) {
    controls.forEach((input) => {
      const control = input.closest('div');
      const $error = control.querySelector('p');

      control.classList.remove('control_with-error');
      if ($error) {
        $error.innerText = '';
      }
    });
  }
}
