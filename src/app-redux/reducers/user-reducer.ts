import { UserBrief, AdminPermission, UserRole } from "models";
import { UserAction } from "../actions";

export interface UserInformationStateInterface {
  userBriefInfo: UserBrief;
}

export const userInformationReducer = (
  state: UserInformationStateInterface = {
    userBriefInfo: {
      id: 0,
      role: UserRole.Admin,
      displayName: ""
    }
  },
  action: any
) => {
  switch (action.type) {
    case UserAction.UPDATE_USER_INFORMATION:
      return Object.assign({}, state, {
        userBriefInfo: action.payload
      });
    default:
      return state;
  }
};
