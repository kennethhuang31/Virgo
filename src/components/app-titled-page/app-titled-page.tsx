import React from "react";
import "./app-titled-page.scss";

export interface AppTitledPagePropsInterface {
  title: string;
  children: JSX.Element[] | JSX.Element;
}

export const AppTitledPage: React.FC<AppTitledPagePropsInterface> = (
  props: AppTitledPagePropsInterface
) => {
  return (
    <div className="titled-page">
      <div className="titled-page-title">{props.title}</div>
      {props.children}
    </div>
  );
};
