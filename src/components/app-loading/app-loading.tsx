import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./app-loading.scss";
import { AppSpinner } from "../app-spinner/app-spinner";

export interface LoadingPropsInterface {
  show?: boolean;
  handleClose: () => any | void;
}

export const AppLoading: React.FC<LoadingPropsInterface> = (
  props: LoadingPropsInterface
) => {
  const [timer, updateTimer] = useState(-1);
  const getDotContent = (value: number) => {
    if (value === 3) {
      updateTimer(-1);
    }
    let dotContent = "";
    switch (timer) {
      case 0:
        dotContent = "。";
        break;
      case 1:
        dotContent = "。。";
        break;
      case 2:
        dotContent = "。。。";
        break;
    }
    return dotContent;
  };

  useEffect(() => {
    const increment = setInterval(() => {
      updateTimer(timer => timer + 1);
    }, 1000);
    return () => clearInterval(increment);
  }, []);

  return (
    <Modal
      show={props.show === undefined ? false : props.show}
      onHide={props.handleClose}
      centered
      dialogClassName="loading-modal"
    >
      <Modal.Body>
        <AppSpinner />
      </Modal.Body>
      <Modal.Footer className="loading-text">
        正在获取数据，请稍后
        {getDotContent(timer)}
      </Modal.Footer>
    </Modal>
  );
};
