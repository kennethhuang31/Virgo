import React from "react";
import "./table-header.scss";
import { TableHeader } from "models";

export interface TableHeaderPropsInterface {
  header: TableHeader;
  children?: JSX.Element;
}

export const TableHeaderItem: React.FC<TableHeaderPropsInterface> = (
  props: TableHeaderPropsInterface
) => {
  const headerContent = props.header.displayCount ? (
    <span>
      {props.header.displayName} {props.header.countNumber}
    </span>
  ) : (
    <span>{props.header.displayName}</span>
  );
  return (
    <>
      <th>
        {headerContent} {props.header.sort && props.children}
      </th>
    </>
  );
};
