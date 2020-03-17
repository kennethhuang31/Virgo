import React from "react";
import Modal from "react-bootstrap/Modal";
import "./app-confirm-modal.scss";
import { AppModal } from "components";

interface AppConfirmModalPropsInterface {
  type?: string;
  display: boolean;
  message?: string;
  handleConfirm: () => void;
  handleClose: () => void;
  modalStyle?: string;
}

export const AppConfirmModal: React.FC<AppConfirmModalPropsInterface> = (
  props: AppConfirmModalPropsInterface
) => {
  const content = () => {
    let defaultMessage = "";
    if (props.type !== undefined) {
      switch (props.type) {
        case "delete":
          defaultMessage = "确定要删除吗？";
          break;
      }
    }
    const text = props.message !== undefined ? props.message : defaultMessage;
    return <div className="confirm-modal-content">{text}</div>;
  };

  const modalDisplay =
    props.modalStyle !== undefined
      ? `confirm-modal ${props.modalStyle}`
      : "confirm-modal";

  return (
    <Modal
      show={props.display}
      onHide={props.handleClose}
      centered
      dialogClassName={modalDisplay}
      backdrop="static"
    >
      <Modal.Body>{content()}</Modal.Body>
      <Modal.Footer>
        <div
          className="confirm-modal-footer confirm-modal-footer-cancel"
          onClick={props.handleClose}
        >
          取消
        </div>
        <div
          className="confirm-modal-footer confirm-modal-footer-confirm"
          onClick={props.handleConfirm}
        >
          确定
        </div>
      </Modal.Footer>
    </Modal>
  );
};
