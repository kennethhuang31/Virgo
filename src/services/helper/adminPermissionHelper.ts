import { AdminPermission } from "models";

class AdminPermissionHelper {
  hasPermissionToAccess(
    permissions: AdminPermission[],
    allowed: AdminPermission[]
  ): boolean {
    let canAccess = true;
    allowed.forEach(x => {
      if (permissions.indexOf(x) === -1) {
        canAccess = false;
      }
    });
    return canAccess;
  }
}

export const adminPermissionHelper = new AdminPermissionHelper();
