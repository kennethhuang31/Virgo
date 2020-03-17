import { combineReducers } from "redux";
import {
  BaseActionInterface,
  CustomerDetailAction,
  CustomerSummaryAction
} from "../actions";
import {
  CustomerDetailModel,
  CustomerOrder,
  CustomerSummary,
  UserContact,
  WalletHistories
} from "models";

interface CustomerSummaryStateInterface {
  summaries: CustomerSummary[];
}

const initialCustomerSummaryState: CustomerSummaryStateInterface = {
  summaries: []
};

interface CustomerDetailStateInterface {
  detail: CustomerDetailModel;
}

const initialCustomerDetailState: CustomerDetailStateInterface = {
  detail: {
    userId: 0,
    name: "",
    email: "",
    registerDate: "",
    userContact: [],
    wallet: 0,
    orderTimes: 0,
    order: [],
    walletHistories: [],
    canceledTime: 0
  }
};

const customerSummaryReducer = (
  state: CustomerSummaryStateInterface = initialCustomerSummaryState,
  action: BaseActionInterface
) => {
  switch (action.type) {
    case CustomerSummaryAction.RECEIVE_SUMMARY:
      return Object.assign({}, state, {
        ...state,
        summaries: action.payload
      });
    default:
      return state;
  }
};

const customerDetailReducer = (
  state: CustomerDetailStateInterface = initialCustomerDetailState,
  action: BaseActionInterface
) => {
  switch (action.type) {
    case CustomerDetailAction.RECEIVE_DETAIL:
      return Object.assign({}, state, {
        ...state,
        detail: action.payload
      });
    default:
      return state;
  }
};

export const customerReducer = combineReducers({
  customerSummaryReducer,
  customerDetailReducer
});
