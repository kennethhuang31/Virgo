import React from "react";
import { Button, Col, Modal } from "react-bootstrap";
import AlertDetail from "./alert-detail";
interface Props {
  show: boolean;
  handleClose: any;
  content: string;
  changeContent: any;
  save: any;
  showAlert: boolean;
  handleAlertClose: any;
}

const ComplainDetail: React.FC<Props> = ({
  showAlert,
  handleAlertClose,
  show,
  handleClose,
  content,
  changeContent,
  save
}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complaint Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col> Please insert the Complaint Detail</Col>
          <Col className="mycol">
            <textarea
              className="textarea"
              value={content}
              onChange={changeContent}
              placeholder="print Details"
            ></textarea>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={save}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <AlertDetail
        handleAlertClose={handleAlertClose}
        showAlert={showAlert}
      ></AlertDetail>
    </div>
  );
};
export default ComplainDetail;
