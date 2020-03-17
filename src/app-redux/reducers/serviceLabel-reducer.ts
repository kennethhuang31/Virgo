import { BreadcrumbsAction } from "../actions";
import { Breadcrumb } from "models";

export interface BreadcrumbStateInterface {
  breadcrumb: Breadcrumb;
}

export const breadcrumbReducer = (
  state: BreadcrumbStateInterface = {
    breadcrumb: {
      label: "All",
      url: "/labelone"
    }
  },
  action: any
): BreadcrumbStateInterface => {
  switch (action.type) {
    case BreadcrumbsAction.NAVIGATE_TO_NEXT:
      return Object.assign({}, state, {
        breadcrumb: action.payload
      });
    default:
      return state;
  }
};
