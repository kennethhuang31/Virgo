import React, { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// import { History } from 'history';

import { Route, MemoryRouter } from "react-router";
import "./servicebreadcrubs.scss";

const Servicebreadcrubs: React.FC = props => {
  const [crubNames, setCrubNames] = useState([]);

  function handleClick(event: any) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  function add(value: any) {
    setCrubNames(value);
  }

  // const childrenWithProps = React.Children.map(props.children, (child:any) =>{React.cloneElement(child, { add: add })}

  // );

  return (
    <div>
      <div>
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split("/").filter(x => x);

            return (
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item href="#">All</Breadcrumb.Item>

                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const toto = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const name = `${pathnames
                      .slice(index, index + 1)
                      .join("/")}`;

                    return last ? (
                      <Breadcrumb.Item active>{name}</Breadcrumb.Item>
                    ) : (
                      <Breadcrumb.Item href={toto}>{name}</Breadcrumb.Item>
                    );
                  })}
                </Breadcrumb>
              </div>
            );
          }}
        </Route>
      </div>

      <section>{props.children}</section>
    </div>
  );
};

export default Servicebreadcrubs;
