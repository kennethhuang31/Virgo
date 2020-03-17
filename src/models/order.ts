import { OrderCancelStatus, OrderProblemStatus } from "./enum";

export class OrderFilter {
  scanCodeId?: string;
  email?: string;
  phone?: string;
  orderStatus?: string;
  sortBy?: string;
  orderCancelStatus?: OrderCancelStatus;
  orderProblemStatus?: OrderProblemStatus;
  itemTotal?: string;

  constructor(
    scanCodeId?: string,
    email?: string,
    phone?: string,
    orderStatus?: string,
    sortBy?: string,
    orderCancelStatus?: OrderCancelStatus,
    orderProblemStatus?: OrderProblemStatus,
    itemTotal?: string
  ) {
    this.scanCodeId = scanCodeId;
    this.email = email;
    this.phone = phone;
    this.orderStatus = orderStatus;
    this.sortBy = sortBy;
    this.orderCancelStatus = orderCancelStatus;
    this.orderProblemStatus = orderProblemStatus;
    this.itemTotal = itemTotal;
  }

  createQuery(): string {
    let url = "?";
    if (this.scanCodeId !== undefined) {
      url += `scanCodeId=${this.scanCodeId}`;
    }
    if (this.email !== undefined) {
      url += `email=${this.email}`;
    }
    if (this.phone !== undefined) {
      url += `phone=${this.phone}`;
    }
    if (this.orderStatus !== undefined) {
      url += `orderStatus=${this.orderStatus}`;
    }
    if (this.sortBy !== undefined) {
      url += `sortBy=${this.sortBy}`;
    }
    if (this.orderCancelStatus !== undefined) {
      url += `orderCancelStatus=${this.orderCancelStatus}`;
    }
    if (this.orderProblemStatus !== undefined) {
      url += `orderProblemStatus=${this.orderProblemStatus}`;
    }
    if (this.itemTotal !== undefined) {
      url += `itemTotal=${this.itemTotal}`;
    }
    return url;
  }
}

export class OrderStatus {
  CA: string;
  A1: string;
  AF: string;
  F: string;
  FA: string;
  A2: string;
  C2: string;
  WP: string;
  ITW: string;
  FR: string;
  FINI: string;
}

export class OrderSummary {
  id: string;
  email: string;
  label3: string;
  orderStatus: string;
  price: string;
}

// export class OrderSummaryDto {
//   id: number;
//   summaries: OrderSummary[];
// }

export class PickAndDeliverInfo {
  deliver: string;
  pickup: string;
  time: string;
  createTime: string;
}

export class OrderDetailMoney {
  total: string;
  walletMinus: string;
  discount: string;
  payment: string;
  payForCourier: string;
  payForAgent: string;
  payForFactory: string;
  refund: string;
  redundant: string;
}

export class OrderDetail {
  id: string;
  scanCodeId: string;
  orderId: string;
  orderCancelStatus: OrderCancelStatus;
  orderProblemStatus: string;
  customerName: string;
  email: string;
  phone: string;
  itemCategory: string;
  service: string;
  value: string;
  days: string;
  brand: string;
  orderStatus: OrderStatus;
  pickAndDeliverInfo: PickAndDeliverInfo[];
  money: OrderDetailMoney;
}
