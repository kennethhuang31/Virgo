import { DropdownItem } from "models";

class DropdownHelper {
  DEFAULT_DROPDOWN_OPTION_VALUE = "default option";
  createDefaultDropdownItem(name: string): DropdownItem {
    return {
      id: 0,
      name: name,
      value: this.DEFAULT_DROPDOWN_OPTION_VALUE
    };
  }
}

export const dropdownHelper = new DropdownHelper();
