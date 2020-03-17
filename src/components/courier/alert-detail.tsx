import React from "react";
import { Modal, Button } from "react-bootstrap";
interface Props {
  showAlert: boolean;
  handleAlertClose: any;
}
const AlertDetail: React.FC<Props> = ({ showAlert, handleAlertClose }) => {
  return (
    <Modal show={showAlert} onHide={handleAlertClose}>
      <Modal.Header closeButton>
        <Modal.Title>Print Content Please</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please insert details please.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAlertClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AlertDetail;
