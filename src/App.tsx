import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
// import Dashboard from "./pages/dashboard/dashboard/dashboard";
import HomePage from "pages/home/home";
import Login from "pages/login/login";
import { AppLoading } from "components";
import { BasePagePropsInterface } from "./page-interface";

const App: React.FC<BasePagePropsInterface> = (
  props: BasePagePropsInterface
) => {
  const [hiddenHeader, setHiddenHeader] = useState(true);
  const handleHeaderHiddenClick = (isHidden: boolean): void => {
    setHiddenHeader(isHidden);
  };

  return (
    <div className="App" onClick={(): void => handleHeaderHiddenClick(true)}>
      <AppLoading
        show={props.isFetching}
        handleClose={() => {
          console.log("loading...");
        }}
      />
      <Router>
        <Route path="/" component={HomePage} />
        <Route exact path="/user/login" component={Login} />
      </Router>
    </div>
  );
};

const mapStateToProps = (store: any) => {
  return {
    isFetching: store.httpRequestReducer.isFetching
  };
};

export default connect(mapStateToProps, null)(App);
