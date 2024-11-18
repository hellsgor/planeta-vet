import { modalFromModal } from './modalFromModal';
import { Modal, modalClassName } from '../components/modal';
import { thankYou } from '../components/thank-you';
import { Validation } from './Validation';

class Form {
  static autoInitAttr = 'data-form-auto-init';

  $form = null;
  validation = null;
  controls = null;
  $submitButton = null;
  successSubmitCallback = null;
  failureSubmitCallback = null;

  constructor($form, props = null) {
    this.$form = $form;

    this.successSubmitCallback = props?.successSubmitCallback || thankYou;
    this.failureSubmitCallback = props?.failureSubmitCallback || thankYou;

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
      switch ($control.type) {
        case 'file': {
          if ($control.files.length > 0) {
            for (let file of $control.files) {
              formData.append($control.name, file);
            }
          }
          break;
        }

        case 'radio': {
          if ($control.checked) {
            formData.append($control.name, $control.value);
          }
          break;
        }

        case 'checkbox': {
          formData.append($control.name, $control.checked ? $control.value : '');
          break;
        }

        case 'tel': {
          formData.append($control.name, $control.value.replace(/[^\d+]/g, ''));
          break;
        }

        default: {
          const value =
            $control.getAttribute('inputmode') === 'tel'
              ? $control.value.replace(/[^\d+]/g, '')
              : $control.value.trim();
          formData.append($control.name, value);
          break;
        }
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
    if (response.status === 'success' && !response.errors?.length) {
      this.clearForm();
      this.successSubmitCallback(
        response,
        this.$form.closest(`.${modalClassName}`)?.getAttribute(Modal.attrs.modalName) || null,
      );
    }

    if (response.status !== 'success') {
      if (response.errors?.length) {
        this.showResponseErrors(response.errors);
      } else {
        this.failureSubmitCallback(
          response,
          this.$form.closest(`.${modalClassName}`)?.getAttribute(Modal.attrs.modalName) || null,
        );
      }
    }
  }

  clearForm() {
    const radioGroups = new Set();

    this.controls.forEach(($control) => {
      if (
        $control.type === 'text' ||
        $control.type === 'tel' ||
        $control.type === 'email' ||
        $control.tagName === 'TEXTAREA'
      ) {
        $control.value = '';
      }

      if ($control.type === 'checkbox') {
        $control.checked = false;
      }

      if ($control.type === 'file') {
        $control.value = '';
        const spans = $control.closest('div').querySelectorAll('label span');
        spans[1].innerText = '';
        spans[0].removeAttribute('style');
      }

      if ($control.tagName === 'SELECT') {
        $control.selectedIndex = 0;
      }

      if ($control.type === 'radio') {
        if (!radioGroups.has($control.name)) {
          $control.checked = true;
          radioGroups.add($control.name);
        } else {
          $control.checked = false;
        }
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
  document.querySelectorAll(`form[${Form.autoInitAttr}]`).forEach(($form) => new Form($form, getFormProps($form.name)));
};

function getFormProps(formName) {
  return {
    successSubmitCallback: (() => {
      switch (formName) {
        case 'entrance':
          return modalFromModal;
        case 'cooperation':
          return modalFromModal;
        case 'recovery':
          return modalFromModal;
        default:
          return thankYou;
      }
    })(),

    failureSubmitCallback: (() => {
      switch (formName) {
        case 'entrance':
          return modalFromModal;
        case 'cooperation':
          return modalFromModal;
        case 'recovery':
          return modalFromModal;
        default:
          return thankYou;
      }
    })(),
  };
}
