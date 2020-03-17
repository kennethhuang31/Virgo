import React, { useState, useEffect } from "react";
import "./app-form-dropdown.scss";
import { FormControl } from "../model";
import { DropdownItem, SortDirection } from "models";
import { dataHelper, dropdownHelper } from "services/helper";

interface AppFormDropdownPropsInterface {
  id: string;
  placeholder: string;
  data: any[];
  sort: boolean;
  direction?: "asc" | "desc";
  selected?: DropdownItem;
  exclude?: DropdownItem[];
  disabled: boolean;
  required: boolean;
  formControl: FormControl;
  displayError: boolean;
  errorMessage?: string;
  dropdownStyle?: string;
  onChange?: (data: any) => any | void;
}

export const AppFormDropdown: React.FC<AppFormDropdownPropsInterface> = (
  props: AppFormDropdownPropsInterface
) => {
  const defaultDropdownItem = dropdownHelper.createDefaultDropdownItem(
    props.placeholder
  );
  const dropdownDisplayData = (): any => {
    if (props.exclude !== undefined) {
      props.exclude.forEach(e => {
        const index = props.data.findIndex(
          x => x.id === e.id && x.name === e.name
        );
        if (index > -1) {
          props.data.splice(index, 1);
        }
      });
    }
    let dropdownData = props.data;
    if (props.sort) {
      let sortDirection = SortDirection.Ascending;
      if (props.direction !== undefined) {
        if (props.direction === "desc") {
          sortDirection = SortDirection.Descending;
        }
      }
      dropdownData = dataHelper.sortAlphabet(
        dropdownData,
        sortDirection,
        "name"
      );
    }

    return [defaultDropdownItem, ...dropdownData];
  };

  const [controlValue, updateValue] = useState(
    props.selected === undefined
      ? props.formControl.value
      : props.selected.value
  );
  const [controlIsValid, updateControlValidate] = useState(
    props.formControl.isValid
  );

  useEffect(() => {
    props.formControl.updateValue(controlValue);
    if (
      props.required &&
      controlValue === dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE
    ) {
      updateControlValidate(false);
    } else if (props.required) {
      updateControlValidate(props.formControl.validateValue());
    }
  }, [controlValue]);

  useEffect(() => {
    if (props.selected !== undefined) {
      updateValue(props.selected?.value);
    }
  }, [props.selected]);

  useEffect(() => {
    if (
      props.formControl.value === dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE
    ) {
      updateValue(dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE);
    }
  }, [props.formControl]);

  const getDropdownStyle = (isValid: any): string => {
    let styles = "dropdown";
    if (isValid !== undefined && !isValid && props.displayError) {
      styles += " dropdown_error";
    }
    if (props.dropdownStyle !== undefined) {
      styles += ` ${props.dropdownStyle}`;
    }
    return styles;
  };

  return (
    <>
      <div id={props.id} className={getDropdownStyle(controlIsValid)}>
        <select
          value={controlValue}
          disabled={props.disabled}
          onChange={(event: any) => {
            updateValue(event.target.value);
            if (props.onChange !== undefined) {
              props.onChange(event.target.value);
            }
          }}
        >
          {dropdownDisplayData().map((item: DropdownItem, index: number) => {
            return (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        {props.required && !controlIsValid && props.displayError && (
          <div className="error">{props.errorMessage}</div>
        )}
      </div>
    </>
  );
};
