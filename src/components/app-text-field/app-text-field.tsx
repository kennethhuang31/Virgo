import React from "react";
import "./app-text-field.scss";

// TODO: add property to control text color
interface AppTextFieldPropsInterface {
  text: string;
  children: JSX.Element[] | JSX.Element;
  fieldStyle?: string;
  textStyle?: string;
}

export const AppTextField: React.FC<AppTextFieldPropsInterface> = (
  props: AppTextFieldPropsInterface
) => {
  const getFieldStyle = (): string => {
    return props.fieldStyle === undefined
      ? "app-layout app-layout_between text-field"
      : `app-layout app-layout_between text-field ${props.fieldStyle}`;
  };

  const getTextStyle = (): string => {
    return props.textStyle === undefined
      ? "text-field-content"
      : `text-field-content ${props.textStyle}`;
  };
  return (
    <div className={getFieldStyle()}>
      <div className={getTextStyle()}>{props.text}</div>
      {props.children}
    </div>
  );
};
