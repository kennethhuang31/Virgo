import { BreadcrumbsAction } from "../constant";
import { BaseActionInterface } from "./interface";
import { Breadcrumb } from "models";

export const updateBreadcrumbs = (data: Breadcrumb): BaseActionInterface => {
  return {
    type: BreadcrumbsAction.NAVIGATE_TO_NEXT,
    payload: data
  };
};
