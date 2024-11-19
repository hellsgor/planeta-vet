import { modalFromModal } from './modalFromModal';
import { Modal, modalClassName } from '../components/Modal';
import { thankYou } from '../components/thankYou';
import { Validation } from './Validation';

/**
 * Класс, представляющий форму с функциональностью отправки и валидации.
 * Управляет заполнением формы, отправкой данных, а также обработкой ошибок и успешных ответов.
 */
class Form {
  /**
   * Атрибут для автоматической инициализации формы.
   * @type {string}
   */
  static autoInitAttr = 'data-form-auto-init';

  /**
   * HTML-элемент формы.
   * @type {HTMLElement}
   */
  $form = null;

  /**
   * Экземпляр класса валидации для формы.
   * @type {Validation}
   */
  validation = null;

  /**
   * Элементы управления формой (инпуты, текстовые поля и т.д.).
   * @type {HTMLElement[]}
   */
  controls = null;

  /**
   * Кнопка отправки формы.
   * @type {HTMLElement}
   */
  $submitButton = null;

  /**
   * Функция обратного вызова для успешной отправки формы.
   * @type {Function}
   */
  successSubmitCallback = null;

  /**
   * Функция обратного вызова для неуспешной отправки формы.
   * @type {Function}
   */
  failureSubmitCallback = null;

  /**
   * Создаёт экземпляр формы и инициализирует её свойства.
   * @param {HTMLElement} $form - HTML-элемент формы.
   * @param {Object} [props] - Опции для настройки успешного и неуспешного ответа.
   * @param {Function} [props.successSubmitCallback] - Функция, которая вызывается при успешной отправке.
   * @param {Function} [props.failureSubmitCallback] - Функция, которая вызывается при неуспешной отправке.
   */
  constructor($form, props = null) {
    this.$form = $form;
    this.successSubmitCallback = props?.successSubmitCallback || thankYou;
    this.failureSubmitCallback = props?.failureSubmitCallback || thankYou;
    this.validation = new Validation();

    this.getElements();
    this.addListeners();
  }

  /**
   * Получает элементы формы, такие как кнопка отправки.
   */
  getElements() {
    this.$submitButton = this.$form.querySelector('button[type="submit"]');
  }

  /**
   * Получает все элементы формы (инпуты, текстовые поля).
   */
  getControls() {
    this.controls = [...this.$form.querySelectorAll('input'), ...this.$form.querySelectorAll('textarea')];
  }

  /**
   * Добавляет обработчики событий для кнопки отправки формы.
   */
  addListeners() {
    this.$submitButton.addEventListener('click', (event) => this.doFormJob(event));
  }

  /**
   * Серриализует данные формы в объект FormData.
   * @returns {FormData} Данные формы в формате FormData.
   */
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

    return formData;
  }

  /**
   * Отправляет данные формы на сервер.
   * @param {FormData} formData - Данные формы.
   * @returns {Promise<Object>} Ответ от сервера.
   */
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

  /**
   * Обрабатывает ответ от сервера после отправки формы.
   * @param {Object} response - Ответ от сервера.
   */
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

  /**
   * Очищает все элементы управления формы.
   */
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

  /**
   * Показывает ошибки, полученные от сервера.
   * @param {Array<Object>} errors - Ошибки, полученные с сервера.
   */
  showResponseErrors(errors) {
    errors.forEach((error) => {
      this.validation.showError(
        null,
        this.controls.find(($control) => error.name === $control.name),
        error.text,
      );
    });
  }

  /**
   * Обрабатывает отправку формы, выполняя валидацию и отправку данных.
   * @param {Event} event - Событие клика по кнопке отправки.
   */
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

/**
 * Инициализирует все формы с атрибутом data-form-auto-init.
 */
export const initForms = () => {
  document.querySelectorAll(`form[${Form.autoInitAttr}]`).forEach(($form) => new Form($form, getFormProps($form.name)));
};

/**
 * Получает параметры для формы в зависимости от её имени.
 * @param {string} formName - Имя формы.
 * @returns {Object} Объект с функциями обратного вызова для успешной и неуспешной отправки.
 */
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
