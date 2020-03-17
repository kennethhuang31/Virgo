export class WorkerPermission {
  selected: boolean;
  name: string;
  displayName: string;
}

export enum AdminPermission {
  // 二维码生成功能
  CreateScanCode,
  // 二维码查询功能
  SearchScanCode,
  // Agent 查询功能
  SearchAgent,
  // Agent 创建功能
  CreateAgent,
  // Agent 修改功能
  EditAgent,
  // Agent 设置提成等级功能
  EditAgentProfitLevel,
  // Agent 添加投诉功能
  AddAgentComplain,
  // 创建员工角色功能
  CreateWorker,
  // Notification 查询功能
  SearchNotification,
  // Notification 设置功能
  EditNotification,
  // Our Case 查询功能
  SearchOurCase,
  // Our Case 设置功能
  EditOurCase,
  // Feedback 删除功能
  DeleteFeedback,
  // Feedback 审核功能
  CheckFeedback,
  // FAQ 设置功能
  EditFaq,
  // Promotion 设置功能
  EditPromotion,
  // Item 查询功能
  SearchItem,
  // Item 修改功能
  EditItem,
  // 客户取消订单修改权限
  CancelOrder,
  // 更改问题订单状态权限,
  EditIssueOrderStatus,
  // 设置权限功能
  EditPermission,
  // 客户信息查询功能
  SearchCustomerInformation,
  // 充值钱包功能
  TopUpWallet,
  // 扣款钱包功能
  DeductWallet,
  // 主页修改功能
  EditHomePage,
  // 服务价目表查询功能,
  SearchPriceList,
  // 服务价目表设置功能
  EditPriceList,
  // 设置角色区域功能
  EditRoleRegion
}
