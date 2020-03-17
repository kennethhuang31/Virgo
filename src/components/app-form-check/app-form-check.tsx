import React from "react";
import Form from "react-bootstrap/Form";
import "./app-form-check.scss";

export interface FormCheckPropsInterface {
  id: string;
  type: "checkbox" | "radio";
  text: string;
  onClick: (event: any) => any | void;
  required?: boolean;
  disabled?: boolean;
  selected?: boolean;
  errorMessage?: string;
}

export const AppFormCheck: React.FC<FormCheckPropsInterface> = (
  props: FormCheckPropsInterface
) => {
  return (
    <div id={props.id}>
      <Form.Check type={props.type} className="form-check-div">
        <Form.Check.Input
          type={props.type}
          checked={props.selected}
          onChange={props.onClick}
          disabled={props.disabled}
        />
        <Form.Check.Label onClick={props.onClick}>
          {props.text}
        </Form.Check.Label>
        {props.required && (
          <Form.Control.Feedback>{props.errorMessage}</Form.Control.Feedback>
        )}
      </Form.Check>
    </div>
  );
};
