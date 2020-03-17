import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./app-spinner.scss";

export interface SpinnerPropsInterface {
  style?: string;
}

export const AppSpinner: React.FC<SpinnerPropsInterface> = (
  props: SpinnerPropsInterface
) => {
  return (
    <Spinner
      animation="border"
      role="status"
      className={`app-spinner ${props.style}`}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};
