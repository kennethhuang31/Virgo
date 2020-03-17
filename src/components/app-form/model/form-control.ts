import { FormValidator } from "./form-validator";

export class FormControlValue {
  value: any;
  isValid: boolean;
}

export class FormControl {
  controlName: string;
  value: any;
  initialValue: any;
  validator: FormValidator;
  isValid?: boolean;

  constructor(controlName: string, value: any, validator: FormValidator) {
    this.controlName = controlName;
    this.value = value;
    this.initialValue = value;
    this.validator = validator;
  }

  updateValue(data: any) {
    this.value = data;
  }

  validateValue(): boolean {
    let result: boolean;
    if (!this.validator.required || this.validator.validator === undefined) {
      result = true;
    } else {
      result = this.validator.validator(this.value);
    }
    this.isValid = result;
    return result;
  }

  getControlValue(): FormControlValue {
    const isValid = this.validateValue();
    return {
      value: this.value,
      isValid: isValid
    };
  }

  reset() {
    this.value = this.initialValue;
    this.isValid = true;
  }
}
