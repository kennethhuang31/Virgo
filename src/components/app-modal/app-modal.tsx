import React from "react";
import Modal from "react-bootstrap/Modal";
import "./app-modal.scss";

export interface ModalPropsInterface {
  title?: string;
  show: boolean;
  modalClass?: string;
  isStatic: boolean;
  showHeaderClose: boolean;
  showFooterClose?: boolean;
  handleHide: (data?: any) => any | void;
  content: React.ComponentClass | React.FunctionComponent | JSX.Element;
  footer: React.ComponentClass | React.FunctionComponent | JSX.Element;
}

export const AppModal: React.FC<ModalPropsInterface> = (
  props: ModalPropsInterface
) => {
  const backdrop = props.isStatic ? "static" : true;
  const modalHeader = props.showHeaderClose ? (
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
  ) : (
    <Modal.Header>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
  );
  const modalStyle =
    props.modalClass === undefined
      ? "app-modal"
      : `app-modal ${props.modalClass}`;
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleHide}
        dialogClassName={modalStyle}
        backdrop={backdrop}
        centered
      >
        {modalHeader}
        <Modal.Body>{props.content}</Modal.Body>
        <Modal.Footer>{props.footer}</Modal.Footer>
      </Modal>
    </div>
  );
};
