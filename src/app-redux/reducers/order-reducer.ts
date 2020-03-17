import { combineReducers } from "redux";
import {
  BaseActionInterface,
  OrderDetailAction,
  OrderSummaryAction
} from "../actions";
import { OrderCancelStatus, OrderDetail, OrderSummary } from "models";

interface OrderSummaryStateInterface {
  summaries: OrderSummary[];
  selectedSummary: OrderSummary;
}

const initialOrderSummaryState: OrderSummaryStateInterface = {
  summaries: [],
  selectedSummary: {
    id: "",
    email: "",
    label3: "",
    orderStatus: "",
    price: ""
  }
};

interface OrderDetailStateInterface {
  detail: OrderDetail;
}

const initialOrderDetailState: OrderDetailStateInterface = {
  detail: {
    id: "",
    scanCodeId: "",
    orderId: "",
    orderCancelStatus: OrderCancelStatus.Normal,
    orderProblemStatus: "",
    customerName: "",
    email: "",
    phone: "",
    itemCategory: "",
    service: "",
    value: "",
    days: "",
    brand: "",
    orderStatus: {
      CA: "",
      A1: "",
      AF: "",
      F: "",
      FA: "",
      A2: "",
      C2: "",
      WP: "",
      ITW: "",
      FR: "",
      FINI: ""
    },
    pickAndDeliverInfo: [],
    money: {
      total: "",
      walletMinus: "",
      discount: "",
      payment: "",
      payForCourier: "",
      payForAgent: "",
      payForFactory: "",
      refund: "",
      redundant: ""
    }
  }
};

const orderSummaryReducer = (
  state: OrderSummaryStateInterface = initialOrderSummaryState,
  action: BaseActionInterface
) => {
  switch (action.type) {
    case OrderSummaryAction.RECEIVE_SUMMARY:
      return Object.assign({}, state, {
        ...state,
        summaries: action.payload
      });
    default:
      return state;
  }
};

const orderDetailReducer = (
  state: OrderDetailStateInterface = initialOrderDetailState,
  action: BaseActionInterface
) => {
  switch (action.type) {
    case OrderDetailAction.RECEIVE_DETAIL:
      return Object.assign({}, state, {
        ...state,
        detail: action.payload
      });
    default:
      return state;
  }
};

export const orderReducer = combineReducers({
  orderSummaryReducer,
  orderDetailReducer
});
