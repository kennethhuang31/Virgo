import React, { useState } from "react";
import "./side-navbar.scss";
import { ExpandItemData, SidebarRouter } from "models";
import { ExpandItem, SidebarRoute } from "components";

export interface SideNavbarPropsInterface {
  isToggled: boolean;
  navbarContent: ExpandItemData<SidebarRouter>[];
  permissions?: any[];
}

const SideNavbar: React.FC<SideNavbarPropsInterface> = (
  props: SideNavbarPropsInterface
) => {
  const [selectedRoute, updateRoute] = useState("");
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>VIRGO ADMIN</h1>
      </div>
      <div className="app-layout app-layout_vertical navbar-content">
        {props.navbarContent.map(
          (nav: ExpandItemData<SidebarRouter>, index: number) => {
            return (
              <ExpandItem
                key={index}
                expanded={false}
                data={nav}
                render={nav => {
                  return <SidebarRoute data={nav.item} />;
                }}
                onClick={() => {
                  console.log("clicked");
                }}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
