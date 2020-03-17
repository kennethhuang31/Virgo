import { HttpRequestAction } from "../actions";

export interface HttpRequestStateInterface {
  isFetching: boolean;
}

export const httpRequestReducer = (
  state: HttpRequestStateInterface = { isFetching: false },
  action: any
) => {
  switch (action.type) {
    case HttpRequestAction.START_FETCHING:
    case HttpRequestAction.STOP_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.payload
      });
    default:
      return state;
  }
};
