import React, { useState } from "react";
import "./header.scss";

interface HeaderPropsInterface {
  userInfo?: any;
}

const Header: React.FC<HeaderPropsInterface> = (
  props: HeaderPropsInterface
) => {
  const [navbarIsToggled, toggleNavbar] = useState(false);
  return (
    <div className="header-content">
      <div className="header-content-toggle">toggle</div>
      <div className="app-layout app-layout-horizontal header-content-user">
        <div>avatar</div>
        <div>user name</div>
        <div>option menu</div>
      </div>
    </div>
  );
};

export default Header;
