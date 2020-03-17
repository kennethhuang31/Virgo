import { WorkerPermissionAction } from "../actions";
import { WorkerPermission } from "models";

export interface WorkerPermissionStateInterface {
  userPermissions: WorkerPermission[];
}

export const workerPermissionReducer = (
  state: WorkerPermissionStateInterface = { userPermissions: [] },
  action: any
) => {
  switch (action.type) {
    case WorkerPermissionAction.UPDATE_USER_PERMISSION:
      return Object.assign({}, state, {
        userPermissions: action.payload
      });
    default:
      return state;
  }
};
