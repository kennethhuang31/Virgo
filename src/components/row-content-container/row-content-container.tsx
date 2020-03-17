import React from "react";
import "./row-content-container.scss";

interface RowContentContainerProps {
  children: JSX.Element[];
}

export const RowContentContainer: React.FC<RowContentContainerProps> = (
  props: RowContentContainerProps
) => {
  return (
    <>
      <div className="row-content">
        {props.children.map((value, index) => {
          return (
            <div key={index} className="content-item">
              {value}
            </div>
          );
        })}
      </div>
    </>
  );
};
