import React from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import propTypes from "prop-types";
import "./fqa-create-component.scss";
interface Props {
  show: boolean;
  close: any;
  save: any;
  handleCName: any;
  handleEName: any;
  handleCAnswer: any;
  handleEAnswer: any;
}
const FqaCreateComponent: React.FC<Props> = ({
  show,
  close,
  save,
  handleCName,
  handleEName,
  handleCAnswer,
  handleEAnswer
}) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={close}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Question </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="eQuestion">
            <Form.Label column sm="2">
              Question:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(event: any) => {
                  handleEName(event);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="cQUESTION">
            <Form.Label column sm="2">
              问题:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(event: any) => {
                  handleCName(event);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="eAnswer">
            <Form.Label column sm="2">
              ANSWER:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows="5"
                onChange={(event: any) => {
                  handleEAnswer(event);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="cAnswer">
            <Form.Label column sm="2">
              答案
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows="5"
                onChange={(event: any) => {
                  handleCAnswer(event);
                }}
              ></Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={save}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
FqaCreateComponent.propTypes = {
  show: propTypes.any,
  close: propTypes.any,
  save: propTypes.any,
  handleCAnswer: propTypes.func,
  handleCName: propTypes.func,
  handleEName: propTypes.func,
  handleEAnswer: propTypes.func
};
export default FqaCreateComponent;
