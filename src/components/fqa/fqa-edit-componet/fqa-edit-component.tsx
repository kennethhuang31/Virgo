import React from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import propTypes from "prop-types";
import "./fqa-edit-component.scss";
import { faqChinese } from "../../../mock/faq/faq";
interface Props {
  show: boolean;
  close: any;
  save: any;
  handleCName: any;
  handleEName: any;
  handleCAnswer: any;
  handleEAnswer: any;
  id: number;
}
const FqaEditComponent: React.FC<Props> = ({
  id,
  show,
  close,
  save,
  handleCName,
  handleEName,
  handleCAnswer,
  handleEAnswer
}) => {
  const questionDetail = faqChinese.filter((item: any) => item.number === id);
  const Detail = questionDetail.map((detail: any, index: any) => {
    return (
      <Form key={index}>
        <Form.Group as={Row} controlId="eQuestion">
          <Form.Label column sm="2">
            Question:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              defaultValue={detail.questionNameE}
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
              defaultValue={detail.questionName}
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
              defaultValue={detail.questionContentE}
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
              defaultValue={detail.questionContent}
              onChange={(event: any) => {
                handleCAnswer(event);
              }}
            ></Form.Control>
          </Col>
        </Form.Group>
      </Form>
    );
  });

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={close}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>{Detail}</Modal.Body>
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
FqaEditComponent.propTypes = {
  show: propTypes.any,
  close: propTypes.any,
  save: propTypes.any,
  handleCAnswer: propTypes.func,
  handleCName: propTypes.func,
  handleEName: propTypes.func,
  handleEAnswer: propTypes.func,
  id: propTypes.any
};
export default FqaEditComponent;
