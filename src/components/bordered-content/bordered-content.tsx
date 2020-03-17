import React from "react";
import "./bordered-content.scss";

export interface BorderedContentPropsInterface {
  all?: boolean;
  left?: boolean;
  right?: boolean;
  up?: boolean;
  down?: boolean;
  children?: JSX.Element[] | JSX.Element;
}

export const BorderedContent: React.FC<BorderedContentPropsInterface> = (
  props: BorderedContentPropsInterface
) => {
  const borderClass = (): string => {
    let styles = "bordered-content";
    if (props.all) {
      return styles + " border-all";
    }
    if (props.up) {
      styles += " border-up";
    }
    if (props.down) {
      styles += " border-down";
    }
    if (props.left) {
      styles += " border-left";
    }
    if (props.right) {
      styles += " border-right";
    }
    return styles;
  };
  return (
    <>
      <div className={borderClass()}>{props.children}</div>
    </>
  );
};
