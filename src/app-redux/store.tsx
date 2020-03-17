import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  breadcrumbReducer,
  applicationUserReducer,
  httpRequestReducer,
  userInformationReducer,
  priceServiceLevelReducer,
  workerPermissionReducer,
  locationReducer,
  agentReducer,
  customerReducer,
  orderReducer
} from "./reducers";

const rootReducer = combineReducers({
  breadcrumbReducer,
  applicationUserReducer,
  httpRequestReducer,
  userInformationReducer,
  priceServiceLevelReducer,
  workerPermissionReducer,
  locationReducer,
  agentReducer,
  customerReducer,
  orderReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export { store };
