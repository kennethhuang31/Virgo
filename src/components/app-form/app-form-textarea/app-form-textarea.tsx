import React, { useState, useEffect } from "react";
import "./app-form-textarea.scss";
import { FormControl } from "../model";

interface AppFormTextareaPropsInterface {
  id: string;
  required: boolean;
  placeholder: string;
  formControl: FormControl;
  displayError: boolean;
  errorMessage?: string;
  textareaStyle?: string;
  readonly?: boolean;
  onChange?: (data: any) => any | void;
  row?: number;
  cols?: number;
}

export const AppFormTextarea: React.FC<AppFormTextareaPropsInterface> = (
  props: AppFormTextareaPropsInterface
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

  const getTextareaStyle = (isValid: any): string => {
    let styles = "form-textarea";
    if (isValid !== undefined && !isValid && props.displayError) {
      styles += " form-textarea_error";
    }
    if (props.textareaStyle !== undefined) {
      styles += ` ${props.textareaStyle}`;
    }
    return styles;
  };

  return (
    <>
      <div className={getTextareaStyle(controlIsValid)}>
        <textarea
          id={props.id}
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
          rows={props.row}
          cols={props.cols}
        />
        {props.required && !controlIsValid && props.displayError && (
          <div className="error">{props.errorMessage}</div>
        )}
      </div>
    </>
  );
};
