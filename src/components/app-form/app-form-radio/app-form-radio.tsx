import React, { useState, useEffect } from "react";
import "./app-form-radio.scss";
import { FormControl } from "../model";

interface AppFormRadioPropsInterface {
  id: string;
  text?: string;
  required: boolean;
  disabled: boolean;
  onClick?: (data: any) => any | void;
  formControl: FormControl;
  radioStyle?: string;
  readonly?: boolean;
  errorMessage?: string;
}

export const AppFormRadio: React.FC<AppFormRadioPropsInterface> = (
  props: AppFormRadioPropsInterface
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

  const getRadioStyle = (isValid: any): string => {
    let styles = "app-layout app-layout_horizontal form-radio";
    if (isValid !== undefined && !isValid) {
      styles += " form-radio_error";
    }
    if (props.radioStyle !== undefined) {
      styles += ` ${props.radioStyle}`;
    }
    return styles;
  };

  return (
    <>
      <div className={getRadioStyle(controlIsValid)}>
        <input
          id={"radio-" + props.id}
          type="radio"
          checked={controlValue}
          disabled={props.disabled}
          onClick={(event: any) => {
            const checked = !controlValue;
            updateValue(checked);
            if (props.onClick !== undefined) {
              props.onClick(checked);
            }
          }}
          onChange={() => {
            return;
          }}
          readOnly={props.readonly}
        />
        <label htmlFor={"radio-" + props.id}>{props.text}</label>
        {props.required && !controlIsValid && (
          <div className="error">{props.errorMessage}</div>
        )}
      </div>
    </>
  );
};
