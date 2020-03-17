import React from "react";
import { Link } from "react-router-dom";
import "./sidebar-route.scss";
import { SidebarRouter } from "models";
import { AppIcon } from "components";

export interface SidebarRouteInterface {
  data: SidebarRouter;
}

export const SidebarRoute: React.FC<SidebarRouteInterface> = (
  props: SidebarRouteInterface
) => {
  const showIcon =
    props.data.icon !== null &&
    props.data.icon !== undefined &&
    props.data.icon !== "";

  const displayContent = showIcon ? (
    <div className="app-layout app-layout_horizontal router">
      {props.data.icon && <AppIcon name={props.data.icon} color="#ffffff" />}
      {props.data.path !== undefined && props.data.component !== undefined ? (
        <Link to={props.data.path ?? "/"}>{props.data.title}</Link>
      ) : (
        <span>{props.data.title}</span>
      )}
    </div>
  ) : (
    <ul className="app-layout app-layout_horizontal subroute">
      <li>
        <Link to={props.data.path ?? "/"}>{props.data.title}</Link>
      </li>
    </ul>
  );
  return <>{displayContent}</>;
};
