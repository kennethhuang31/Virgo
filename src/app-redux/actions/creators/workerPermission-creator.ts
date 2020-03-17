import { WorkerPermissionAction } from "../constant";
import { AdminPermission } from "models";
import { BaseActionInterface } from "./interface";

export const updateUserPermissions = (
  permissions: AdminPermission[]
): BaseActionInterface => {
  return {
    type: WorkerPermissionAction.UPDATE_USER_PERMISSION,
    payload: permissions
  };
};
