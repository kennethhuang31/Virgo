export class CustomerSummary {
  userId: number;
  name: string;
  email: string;
  phone: string;
  wallet: number;
  orderTimes: number;
  orderTimesLastMonth: number;
  canceledTime: number;
  lastestOrderDate: string;
  defaultAddress: string;
}

export class UserContact {
  address: string;
  phone: string;
  userName: string;
  isPrimary: boolean;
}

export class CustomerOrder {
  orderId: string;
  createdDate: string;
  itemPrice: number;
  cancaledItem: number;
}

export class WalletHistories {
  closingBalance: number;
  openingBalance: number;
  cost: number;
  orderTransactionId: string;
  createdDate: string;
  comment: string;
  walletId: number;
  orderTransaction: string;
  wallet: string;
  id: number;
}

export class CustomerDetailModel {
  userId: number;
  name: string;
  email: string;
  registerDate: string;
  userContact: UserContact[];
  wallet: number;
  orderTimes: number;
  order: CustomerOrder[];
  walletHistories: WalletHistories[];
  canceledTime: number;
}
