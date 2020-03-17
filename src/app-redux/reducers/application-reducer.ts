import { ApplicationUserAction, DashboardAction } from "../actions";

export interface ApplicationUserStateInterface {
  isLoggedIn: boolean;
}

export interface DashboardStateInterface {
  navbarIsToggled: boolean;
}

// TODO: combine reducers into applicationReducer

export const dashboardReducer = (
  state: DashboardStateInterface = { navbarIsToggled: false },
  action: any
) => {
  switch (action.type) {
    case DashboardAction.TOGGLE_NAVBAR:
      return Object.assign({}, state, {
        navbarIsToggled: action.payload
      });
    default:
      return state;
  }
};

export const applicationUserReducer = (
  state: ApplicationUserStateInterface = { isLoggedIn: false },
  action: any
) => {
  switch (action.type) {
    case ApplicationUserAction.UPDATE_USER_LOGIN_STATUS:
      return Object.assign({}, state, {
        isLoggedIn: action.payload
      });
    default:
      return state;
  }
};
