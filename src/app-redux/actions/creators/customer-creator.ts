import { CustomerDetailAction, CustomerSummaryAction } from "../constant";
import { updateHttpRequestStatus } from "app-redux";
import { customerService } from "services";
import { BaseActionInterface } from "./interface";
import { CustomerDetailModel, CustomerSummary } from "models";

// customer summary //
export const receiveCustomerSummary = (
  data: CustomerSummary[]
): BaseActionInterface => {
  return {
    type: CustomerSummaryAction.RECEIVE_SUMMARY,
    payload: data
  };
};

export const getCustomerSummary = (): ((dispatch: any) => Promise<any>) => {
  // use truth data
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await customerService
      .getCustomerSummary()
      .then(
        response => {
          console.log("Customer ApiReturnResult is: ", response);
          const summaries: CustomerSummary[] = response.data;
          console.log(summaries);
          dispatch(receiveCustomerSummary(summaries));
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        dispatch(updateHttpRequestStatus(false));
      });
  };
};

// customer detail //
export const receiveCustomerDetail = (
  data: CustomerDetailModel
): BaseActionInterface => {
  return {
    type: CustomerDetailAction.RECEIVE_DETAIL,
    payload: data
  };
};

export const getCustomerDetail = (
  id: string
): ((dispatch: any) => Promise<any>) => {
  // use truth data
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await customerService
      .getCustomerDetail(id)
      .then(
        response => {
          console.log(response);
          const detail: CustomerDetailModel = response.data[0];
          console.log("Customer detail is: ", detail);
          dispatch(receiveCustomerDetail(detail));
        },
        error => {
          console.log(error);
        }
      )
      .then(_ => {
        dispatch(updateHttpRequestStatus(false));
      });
  };
};
