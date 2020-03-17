import { HttpRequestAction } from "../constant";
import { BaseActionInterface } from "./interface";

export const updateHttpRequestStatus = (
  isFetching: boolean
): BaseActionInterface => {
  return isFetching
    ? {
        type: HttpRequestAction.START_FETCHING,
        payload: isFetching
      }
    : {
        type: HttpRequestAction.STOP_REQUEST,
        payload: isFetching
      };
};
