import React from "react";
import Button from "react-bootstrap/Button";
import "./app-button.scss";

export interface ButtonPropsInterface {
  type: string;
  text?: string;
  disabled: boolean;
  styles?: string;
  isBlock?: boolean;
  btnType: "submit" | "button";
  onClick?: (data?: any) => any | void;
}

export const AppButton: React.FC<ButtonPropsInterface> = (
  props: ButtonPropsInterface
) => {
  const getButtonContent = (): any => {
    switch (props.type) {
      case "confirm":
        return "确认";
      case "delete":
        return "删除";
      case "edit":
        return "修改";
      case "search":
        return "查找";
      case "save":
        return "保存";
      case "cancel":
        return "取消";
      case "add":
        return "增加";
    }
  };
  const getButtonVariant = (): any => {
    switch (props.type) {
      case "confirm":
        return "primary";
      case "delete":
        return "outline-danger";
      case "edit":
        return "outline-primary";
      case "search":
      case "add":
        return "info";
      case "save":
        return "success";
      case "cancel":
        return "outline-dark";
    }
  };
  return (
    <div>
      <Button
        block={props.isBlock}
        disabled={props.disabled}
        onClick={props.onClick}
        variant={getButtonVariant()}
        className={`app-button ${props.styles}`}
        type={props.btnType}
      >
        {props.text ? props.text : getButtonContent()}
      </Button>
    </div>
  );
};
