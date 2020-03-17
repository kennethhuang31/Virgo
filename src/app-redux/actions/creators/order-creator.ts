import { OrderDetailAction, OrderSummaryAction } from "../constant";
import { updateHttpRequestStatus } from "app-redux";
import { orderService } from "services";
import { BaseActionInterface } from "./interface";
import {
  OrderCancelStatus,
  OrderDetail,
  OrderSummary,
  PickAndDeliverInfo
} from "models";

// order summary //
export const receiveOrderSummary = (
  data: OrderSummary[]
): BaseActionInterface => {
  return {
    type: OrderSummaryAction.RECEIVE_SUMMARY,
    payload: data
  };
};

export const getOrderSummary = (): ((dispatch: any) => Promise<any>) => {
  // use truth data
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await orderService
      .getOrderSummary()
      .then(
        response => {
          // console.log("ApiReturnResult is: ", response);
          const result = response.data;
          console.log("result is: ", result);
          const summaries: OrderSummary[] = [];
          result.map((item: any) => {
            const summary: OrderSummary = {
              id: item.id,
              email: item.email,
              label3: item.itemServices[2] ? item.itemServices[2].name : "",
              orderStatus: item.status,
              price: item.price
            };
            summaries.push(summary);
          });
          // console.log(summaries);
          dispatch(receiveOrderSummary(summaries));
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

// order detail //
export const receiveOrderDetail = (data: OrderDetail): BaseActionInterface => {
  return {
    type: OrderDetailAction.RECEIVE_DETAIL,
    payload: data
  };
};

export const getOrderDetail = (
  id: string
): ((dispatch: any) => Promise<any>) => {
  // use truth data
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await orderService
      .getOrderDetail(id)
      .then(
        response => {
          console.log(response);
          const result = response.data;
          console.log("detail result is: ", result);

          const pickUpInfoHistories: PickAndDeliverInfo[] = [];
          result.pickUpInfoHistories.map((item: any) => {
            const pickAndDeliverInfo: PickAndDeliverInfo = {
              deliver: item.deliverAgentAddress,
              pickup: item.pickUpAgentAddress,
              time: item.pickUpDate,
              createTime: item.createdDate
            };
            pickUpInfoHistories.push(pickAndDeliverInfo);
          });

          let itemCategory = "";
          const list = [0, 1, 2, 3];
          for (const i in list) {
            itemCategory += `${result.itemServices[i].name}, `;
          }
          itemCategory += `${result.itemServices[4].name}`;

          let service = "";
          for (let i = 5; i < result.itemServices.length - 2; i++) {
            service += `${result.itemServices[i].name}, `;
          }
          service += `${
            result.itemServices[result.itemServices.length - 2].name
          }`;

          const orderCancelStatus = (): OrderCancelStatus => {
            if (result.status === "CANCELED") {
              return OrderCancelStatus.Canceled;
            }
            return result.isAppliedCancel
              ? OrderCancelStatus.Applied
              : OrderCancelStatus.Normal;
          };

          const detail: OrderDetail = {
            id: result.id,
            scanCodeId: result.scanCodeId,
            orderId: result.orderId,
            orderCancelStatus: orderCancelStatus(),
            orderProblemStatus: "",
            customerName: result.userContact.userName,
            email: result.email,
            phone: result.userContact.phone,
            itemCategory: itemCategory,
            service: service,
            value: `${
              result.itemServices[result.itemServices.length - 1].name
            }`,
            days: result.days,
            brand: "",
            orderStatus: {
              CA: result.itemTracking.caTime,
              A1: result.itemTracking.a1Time,
              AF: result.itemTracking.afTime,
              F: result.itemTracking.fTime,
              FA: result.itemTracking.faTime,
              A2: result.itemTracking.a2Time,
              C2: result.itemTracking.c2Time,
              WP: result.itemTracking.wp,
              ITW: result.itemTracking.itw,
              FR: result.itemTracking.fr,
              FINI: result.itemTracking.fini
            },
            pickAndDeliverInfo: pickUpInfoHistories,
            money: {
              total: result.price,
              walletMinus: "",
              discount: "",
              payment: "",
              payForCourier: "",
              payForAgent: "",
              payForFactory: "",
              refund: "",
              redundant: ""
            }
          };
          console.log("detail.orderCancelStatus: ", detail.orderCancelStatus);
          dispatch(receiveOrderDetail(detail));
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
