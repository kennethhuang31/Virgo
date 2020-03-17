import React, { useState, useEffect } from "react";
import "./app-form-checkbox.scss";
import { FormControl } from "components";

interface AppFormCheckboxPropsInterface {
  id: string;
  text?: string;
  required: boolean;
  disabled: boolean;
  onChange?: (data: any) => any | void;
  formControl: FormControl;
  checkboxStyle?: string;
  readonly?: boolean;
  errorMessage?: string;
}

export const AppFormCheckbox: React.FC<AppFormCheckboxPropsInterface> = (
  props: AppFormCheckboxPropsInterface
) => {
  const [controlValue, updateValue] = useState(props.formControl.value);
  const [controlIsValid, updateControlValidate] = useState(
    props.formControl.isValid
  );

  useEffect(() => {
    props.formControl.updateValue(controlValue);
    if (props.required) {
      updateControlValidate(props.formControl.validateValue());
    }
  }, [controlValue]);

  const getCheckboxStyle = (isValid: any): string => {
    let styles = "app-layout app-layout_horizontal form-checkbox";
    if (isValid !== undefined && !isValid) {
      styles += " form-checkbox_error";
    }
    if (props.checkboxStyle !== undefined) {
      styles += ` ${props.checkboxStyle}`;
    }
    return styles;
  };

  return (
    <>
      <div className={getCheckboxStyle(controlIsValid)}>
        <input
          id={"checkbox-" + props.id}
          type="checkbox"
          checked={controlValue}
          disabled={props.disabled}
          onChange={(event: any) => {
            const checked = !controlValue;
            updateValue(checked);
            if (props.onChange !== undefined) {
              props.onChange(checked);
            }
          }}
          readOnly={props.readonly}
        />
        <label htmlFor={"checkbox-" + props.id}>{props.text}</label>
        {props.required && !controlIsValid && (
          <div className="error">{props.errorMessage}</div>
        )}
      </div>
    </>
  );
};
