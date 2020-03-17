import React, { useState, useEffect } from "react";
import "./app-form-input.scss";
import { FormControl } from "../model";

interface AppFormInputPropsInterface {
  id: string;
  type: string;
  required: boolean;
  placeholder: string;
  formControl: FormControl;
  displayError: boolean;
  errorMessage?: string;
  inputStyle?: string;
  readonly?: boolean;
  onChange?: (data: any) => any | void;
}

export const AppFormInput: React.FC<AppFormInputPropsInterface> = (
  props: AppFormInputPropsInterface
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

  useEffect(() => {
    updateValue(props.formControl.initialValue);
  }, [props.formControl]);

  const getInputStyle = (isValid: any): string => {
    let styles = "form-input";
    if (isValid !== undefined && !isValid && props.displayError) {
      styles += " form-input_error";
    }
    if (props.inputStyle !== undefined) {
      styles += ` ${props.inputStyle}`;
    }
    return styles;
  };

  return (
    <>
      <div className={getInputStyle(controlIsValid)}>
        <input
          id={props.id}
          type={props.type}
          required={props.required}
          value={controlValue}
          placeholder={props.placeholder}
          onChange={(event: any) => {
            updateValue(event.target.value);
            if (props.onChange !== undefined) {
              props.onChange(event.target.value);
            }
          }}
          readOnly={props.readonly}
          autoFocus={true}
        />
        {props.required && !controlIsValid && props.displayError && (
          <div className="error">{props.errorMessage}</div>
        )}
      </div>
    </>
  );
};
