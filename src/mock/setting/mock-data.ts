import { UserRole, UserBrief, WorkerPermission } from "../../models";

export const UserMockData: UserBrief[] = [
  {
    id: 1,
    role: UserRole.Admin,
    displayName: "admin 01"
  },
  {
    id: 2,
    role: UserRole.Admin,
    displayName: "admin 02"
  }
];

export const WorkerPermissionMockData: WorkerPermission[] = [
  {
    selected: true,
    name: "CreateScanCode",
    displayName: "二维码生成功能"
  },
  {
    selected: false,
    name: "SearchScanCode",
    displayName: "二维码查询功能"
  },
  {
    selected: false,
    name: "SearchAgent",
    displayName: "AGENT查询功能"
  },
  {
    selected: true,
    name: "CreateAgent",
    displayName: "AGENT创建功能"
  },
  {
    selected: false,
    name: "EditAgent",
    displayName: "AGENT修改功能"
  },
  {
    selected: true,
    name: "EditAgentProfitLevel",
    displayName: "AGENT设置提成等级功能"
  },
  {
    selected: true,
    name: "AddAgentComplain",
    displayName: "AGENT添加投诉功能"
  },
  {
    selected: false,
    name: "CreateWorker",
    displayName: "创建员工角色功能"
  }
];
