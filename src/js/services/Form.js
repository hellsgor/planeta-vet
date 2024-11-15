import { Validation } from './Validation';

class Form {
  static autoInitAttr = 'data-form-auto-init';

  $form = null;
  validation = null;
  controls = null;
  $submitButton = null;

  constructor($form) {
    this.$form = $form;
    this.validation = new Validation();

    this.getElements();
    this.addListeners();
  }

  getElements() {
    this.$submitButton = this.$form.querySelector('button[type="submit"]');
  }

  getControls() {
    const inputs = this.$form.querySelectorAll('input');
    const textareas = this.$form.querySelectorAll('textarea');

    this.controls = [...inputs, ...textareas];
  }

  addListeners() {
    this.$submitButton.addEventListener('click', (event) => this.doFormJob(event));
  }

  serialize() {
    const formData = new FormData();

    this.controls.forEach(($control) => {
      if ($control.type === 'file' && $control.files.length > 0) {
        for (let file of $control.files) {
          formData.append($control.name, file);
        }
      } else {
        $control.type === 'tel' || $control.getAttribute('inputmode') === 'tel'
          ? formData.append($control.name, $control.value.replace(/[^\d+]/g, ''))
          : formData.append($control.name, $control.value.trim());
      }
    });

    this.logFormData(formData);
    return formData;
  }

  logFormData(formData) {
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
  }

  async submit(formData) {
    try {
      const response = await fetch(this.$form.action, {
        method: this.$form.method.toUpperCase(),
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  responseHandler(response) {
    if (response.status === 'success' && !response.errors?.length) this.clearForm();

    if (response.status !== 'success') {
      if (response.errors && response.errors.length) {
        this.showResponseErrors(response.errors);
      }
    }
  }

  clearForm() {
    this.controls.forEach(($control) => {
      $control.value = '';

      if ($control.type === 'file') {
        const spans = $control.closest('div').querySelectorAll('label span');
        spans[1].innerText = '';
        spans[0].removeAttribute('style');
      }
    });
  }

  showResponseErrors(errors) {
    errors.forEach((error) => {
      this.validation.showError(
        null,
        this.controls.find(($control) => error.name === $control.name),
        error.text,
      );
    });
  }

  async doFormJob(event) {
    event.preventDefault();

    this.controls && this.controls.length && this.validation.hideErrors(this.controls);

    this.getControls();

    if (!this.validation.validate(this.controls)) {
      return;
    }

    const data = this.serialize();
    const response = await this.submit(data);

    this.responseHandler(response);
  }
}

export const initForms = () => {
  document.querySelectorAll(`form[${Form.autoInitAttr}]`).forEach(($form) => new Form($form));
};
