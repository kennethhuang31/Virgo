import { WorkerPermission, AdminPermission } from "./workerPermission";

export class AdminUserCreateDto {
  email: string;
  password: string;
  confirmPassword: string;
  permissions: AdminPermission[];
}
