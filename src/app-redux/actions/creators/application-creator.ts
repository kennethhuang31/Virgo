import { ApplicationUserAction, DashboardAction } from "../constant";
import { BaseActionInterface } from "./interface";

export const toggleNavbar = (toggle: boolean): BaseActionInterface => {
  return {
    type: DashboardAction.TOGGLE_NAVBAR,
    payload: toggle
  };
};

export const updateUserLoginStatus = (status: boolean): BaseActionInterface => {
  return {
    type: ApplicationUserAction.UPDATE_USER_LOGIN_STATUS,
    payload: status
  };
};
