import { PriceServiceTimeAction } from "../actions/constant";
import {
  ServiceLevelBrief,
  ServiceLevelPostBrief,
  ServiceLevelPutBrief
} from "../../models";

export interface PriceServiceLevelStateInterface {
  data: ServiceLevelBrief[] | ServiceLevelPostBrief | ServiceLevelPutBrief;
  isFetching: boolean;
  isDirty: boolean;
}

export const priceServiceLevelReducer = (
  state: PriceServiceLevelStateInterface = {
    data: [],
    isFetching: false,
    isDirty: false
  },
  action: any
): PriceServiceLevelStateInterface => {
  switch (action.type) {
    case PriceServiceTimeAction.REQUEST_FTECH_LEVEL_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PriceServiceTimeAction.RECEIVE_FTECH_LEVEL_DATA_RESULT:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: false,
        data: action.payload
      });
    case PriceServiceTimeAction.RECEIVE_FTECH_LEVEL_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: false
        // data: action.payload
      });
    case PriceServiceTimeAction.REQUEST_FTECH_LEVEL_DATA_BY_PARENT:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PriceServiceTimeAction.RECEIVE_FTECH_LEVEL_DATA_RESULT_BY_PARENT:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: false,
        data: action.payload
      });
    case PriceServiceTimeAction.RECEIVE_FTECH_LEVEL_DATA_ERROR_BY_PARENT:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: false
        // data: action.payload
      });
    case PriceServiceTimeAction.POST_LEVEL_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PriceServiceTimeAction.POST_LEVEL_DATA_RESULT:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: true //,
        // data: action.payload
      });
    case PriceServiceTimeAction.POST_LEVEL_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: true
        // data: action.payload
      });
    case PriceServiceTimeAction.PUT_LEVEL_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PriceServiceTimeAction.PUT_LEVEL_DATA_RESULT:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: true //,
        // data: action.payload
      });
    case PriceServiceTimeAction.PUT_LEVEL_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: true
        // data: action.payload
      });
    case PriceServiceTimeAction.DELETE_LEVEL_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PriceServiceTimeAction.DELETE_LEVEL_DATA_RESULT:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: true //,
        // data: action.payload
      });
    case PriceServiceTimeAction.DELETE_LEVEL_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isDirty: true
        // data: action.payload
      });
    default:
      return state;
  }
};
