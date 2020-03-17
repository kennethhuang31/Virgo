import { updateHttpRequestStatus } from "app-redux";
import { UserLogin, UserBrief, AdminPermission } from "models";
import { userService } from "services";
import { UserAction } from "../constant";
import { getLoginUserMock } from "mock/data";
import { BaseActionInterface } from "./interface";

export function loginUser(data: UserLogin): (dispatch: any) => Promise<void> {
  // use mock data
  const mockReturnResult = getLoginUserMock();
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await userService
      .login(data)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);
          // place to update state
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
}

// update user's basic information
export const updateUserInformation = (
  userBriefInfo: UserBrief
): BaseActionInterface => {
  return {
    type: UserAction.UPDATE_USER_INFORMATION,
    payload: userBriefInfo
  };
};
