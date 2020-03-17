import React from "react";
import RbBreadcrumb from "react-bootstrap/Breadcrumb";
import "./breadcrumbs.scss";
import { breadcrumbService } from "services";
import { Breadcrumb, BreadcrumbBrief } from "models";

export interface BreadcrumbsPropsInterface {
  data: Breadcrumb;
}

export const Breadcrumbs: React.FC<BreadcrumbsPropsInterface> = (
  props: BreadcrumbsPropsInterface
) => {
  const breadcrumbList: BreadcrumbBrief[] = breadcrumbService.flattenBreadcrumb(
    props.data
  );
  return (
    <div className="breadcrumb">
      <RbBreadcrumb>
        {breadcrumbList.map((item, index) => {
          return (
            <RbBreadcrumb.Item
              key={index}
              href={item.url}
              active={index === breadcrumbList.length - 1}
            >
              {item.label}
            </RbBreadcrumb.Item>
          );
        })}
      </RbBreadcrumb>
    </div>
  );
};
