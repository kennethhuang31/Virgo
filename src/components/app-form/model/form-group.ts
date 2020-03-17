import { FormControl } from "./form-control";

export class FormGroup {
  groupName: string;
  controlElements: any[];
  constructor(groupName: string, controlElements: any[]) {
    this.groupName = groupName;
    this.controlElements = controlElements;
  }

  getGroupValue() {
    const value: any = {};
    this.controlElements.forEach(ele => {
      if (ele instanceof FormControl) {
        value[ele.controlName] = ele.value;
      } else if (ele instanceof FormGroup) {
        value[ele.groupName] = ele.getGroupValue();
      }
    });
    return value;
  }

  getGroupValidatedValue() {
    const value: any = {};
    this.controlElements.forEach(ele => {
      if (ele instanceof FormControl) {
        value[ele.controlName] = ele.getControlValue();
      } else if (ele instanceof FormGroup) {
        value[ele.groupName] = ele.getGroupValidatedValue();
      }
    });
    return value;
  }

  validate(): boolean {
    const validateResult: boolean[] = [];
    this.controlElements.forEach(ele => {
      if (ele instanceof FormControl) {
        const result = ele.validateValue();
        validateResult.push(result);
      } else if (ele instanceof FormGroup) {
        const result = ele.validate();
        validateResult.push(result);
      }
    });

    return validateResult.indexOf(false) === -1;
  }

  resetGroup(): void {
    this.controlElements.forEach(ele => {
      if (ele instanceof FormControl) {
        ele.reset();
      } else if (ele instanceof FormGroup) {
        ele.resetGroup();
      }
    });
  }
}
