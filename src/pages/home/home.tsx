import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import "./home.scss";
import { routerHelper, authService } from "services";
import { sidebarRoutes } from "router/router";
import { ExpandItemData, SidebarRouter } from "models";
import SideNavbar from "pages/home/side-navbar/side-navbar";
import Footer from "pages/home/footer/footer";
import Header from "pages/home/header/header";
import LabelTwo from "pages/priceservicetime/LabelTwo/LabelTwo";
import LabelThree from "pages/priceservicetime/LabelThree/LabelThree";
import LabelFour from "pages/priceservicetime/LabelFour/LabelFour";
import LabelFive from "pages/priceservicetime/LabelFive/LabelFive";
import LabelSix from "pages/priceservicetime/LabelSix/LabelSix";
import LabelSeven from "pages/priceservicetime/LabelSeven/LabelSeven";

export interface HomePagePropsInterface {
  isLoggedIn: boolean;
}

const HomePage: React.FC<HomePagePropsInterface> = (
  props: HomePagePropsInterface
) => {
  const checkLogin = (): boolean => {
    let result = true;
    const accessToken = authService.getAccessToken();
    if (accessToken === null || !props.isLoggedIn) {
      result = false;
    }
    return result;
  };

  const getContent = () => {
    const tokenIsValid = checkLogin();
    if (!tokenIsValid) {
      const sidebarContent = routerHelper.createRoutes(sidebarRoutes);

      return (
        <Router>
          <div className="homepage">
            <div className="homepage-navbar">
              <SideNavbar navbarContent={sidebarContent} isToggled={false} />
            </div>
            <div className="homepage-right">
              <div className="homepage-header">
                <Header />
              </div>
              <div className="homepage-content">
                <Suspense fallback={<div>loading....</div>}>
                  <Switch>
                    {sidebarContent.map(
                      (nav: ExpandItemData<SidebarRouter>, index: number) => {
                        return nav.children !== undefined &&
                          nav.children.length !== 0 ? (
                          nav.children.map(
                            (
                              subRoute: ExpandItemData<SidebarRouter>,
                              subIndex: number
                            ) => {
                              return (
                                <Route
                                  key={subIndex}
                                  exact={subRoute.item.exact}
                                  path={subRoute.item.path}
                                  component={subRoute.item.component}
                                />
                              );
                            }
                          )
                        ) : (
                          <Route
                            key={index}
                            exact={nav.item.exact}
                            path={nav.item.path}
                            component={nav.item.component}
                          />
                        );
                      }
                    )}

                    <Route
                      path="/LabelTwo/:productId?/:productName?"
                      component={LabelTwo}
                    />
                    <Route
                      path="/LabelThree/:productId?/:productName?"
                      component={LabelThree}
                    />
                    <Route
                      path="/LabelFour/:productId?/:productName?"
                      component={LabelFour}
                    />
                    <Route
                      path="/LabelFive/:productId?/:productName?"
                      component={LabelFive}
                    />
                    <Route
                      path="/LabelSix/:productId?/:productName?"
                      component={LabelSix}
                    />
                    <Route
                      path="/LabelSeven/:productId?/:productName?"
                      component={LabelSeven}
                    />
                  </Switch>
                </Suspense>
              </div>
              <div className="homepage-footer">
                <Footer />
              </div>
            </div>
          </div>
        </Router>
      );
    }
    return <Redirect to="/user/login" />;
  };

  return <>{getContent()}</>;
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.applicationUserReducer.isLoggedIn
  };
};

export default connect(mapStateToProps, null)(HomePage);
