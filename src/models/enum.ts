export enum SortDirection {
  Ascending,
  Descending
}

export enum SortType {
  Alphabetic,
  Newest
}

export enum Language {
  English,
  Chinese
}

export enum UserRole {
  Admin,
  Agent,
  Courier,
  Factory
}

export enum AgentStatus {
  // 已上线
  Online = "Online",
  // 未上线
  Offline = "Offline",
  // 合作已终止
  CooperateEnded = "CooperateEnded"
}

export enum LocationType {
  Country,
  City,
  Region
}

//These are different status of this order
export enum OrderStatusEnum {
  CA,
  A1,
  AF,
  F,
  FA,
  A2,
  C2,
  WP,
  ITW,
  FR,
  FINI
}

export enum OrderCancelStatus {
  Normal,
  Applied,
  Canceled
}

export enum OrderProblemStatus {
  Problem,
  Solved,
  Lost
}
