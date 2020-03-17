import React, { useState } from "react";
import "./expand-item.scss";

export interface ExpandItemPropsInterface<T> {
  key?: number;
  expanded: boolean;
  data: T;
  render: (data: any) => JSX.Element;
  onClick?: (() => any | void) | ((data: any) => any | void);
}

export const ExpandItem: React.FC<ExpandItemPropsInterface<any>> = (
  props: ExpandItemPropsInterface<any>
) => {
  const [expand, setExpand] = useState(props.expanded);
  const expandItem = () => {
    setExpand(!expand);
  };
  return (
    <div>
      <div
        onClick={
          props.data.children.length === 0
            ? () => {
                props.onClick && props.onClick(props.data);
              }
            : expandItem
        }
      >
        {props.render(props.data)}
      </div>
      {expand && (
        <div>
          {props.data.children.map((child: any, index: number) => {
            return (
              <ExpandItem
                key={index}
                expanded={false}
                data={child}
                render={props.render}
                onClick={props.onClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
