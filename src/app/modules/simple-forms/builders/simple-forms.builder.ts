import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { FormElement, FormElementConfig, FormDetails, FormElementOptions } from '../state/simple-forms.state';

export class SimpleFormBuilder {

  static formBuilder: FormBuilder = new FormBuilder();

  constructor() {
  }

  /**
   * Get Validators from FormElement definition properties
   * @param element
   * @returns {any}
   */
  static getValidators(element): any {
    const validators: ValidatorFn[] = [];
    if (element.required) {
      validators.push(Validators.required);
    }
    if (element.minLength) {
      validators.push(Validators.minLength(element.minLength));
    }
    if (element.maxLength) {
      validators.push(Validators.maxLength(element.maxLength));
    }
    if (element.regex) {
      validators.push(Validators.pattern(element.regex));
    }
    return validators;
  }

  /**
   * Create a FormGroup from a list FormElement definitions
   * @param {FormElement[]} formElements
   * @returns {any}
   */
  static toFormGroup(formElements: FormElement[]): any {
    const formGroup: {} = {};
    formElements.forEach((element: FormElement) => {
      formGroup[element.inputId] = ['', SimpleFormBuilder.getValidators(element)];
    });
    return SimpleFormBuilder.formBuilder.group(formGroup);
  }

  /**
   * Create a 'FormDetails'
   * Takes a group of FormElements, and returns an
   * Unwrapped form object of formGroup, and
   * { inputId: string, element: FormElement } array.
   *
   * @TOP-TIP: Use <yourVariable>.elements.get(<inputId>);
   * to render your element.
   *
   * @param formElements
   */
  static toUnwrappedForm(formElements: FormElement[]): any {
    const unwrappedForm: FormDetails = new FormDetails();
    unwrappedForm.elements = formElements.map(item => ({ inputId: item.inputId, element: item }));
    unwrappedForm.formGroup = SimpleFormBuilder.toFormGroup(formElements);
    return unwrappedForm;
  }

  /**
   * Simple wrapper to create a FormElement with basic
   * attributes
   * @param {string} type
   * @param {string} label
   * @param {string} inputId
   * @param config
   * @returns {FormElement}
   */
  static createElement(type: string, label: string, options: FormElementOptions = {}, config?: FormElementConfig) {
    let elementInputId: string;

    if (options && !options.inputId) {
      elementInputId = SimpleFormBuilder.toInputId(label);
    } else {
      elementInputId = options.inputId;
    }
    const element: FormElement = new FormElement({
      inputId: elementInputId,
      type: type,
      label: label,
      config: config
    });

    return this.setOptions(element, options);
  }

  static setOptions(element: FormElement, options: FormElementOptions) {
    Object.getOwnPropertyNames(options).forEach(optionKey => {
      element.setProperty(optionKey, options[optionKey])
    });

    return element;
  }



  static toInputId(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }

  /**
   * Rebuild a form from an existing build FormDetails
   * object (used after dynamically updating config)
   * @param {FormDetails} builtForm
   * @returns {any}
   */
  static rebuildForm(builtForm: FormDetails) {
    return SimpleFormBuilder.toUnwrappedForm(builtForm.elements.map(item => item.element ));
  }

}
