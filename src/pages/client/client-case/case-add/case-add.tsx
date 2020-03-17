import React, { useState } from "react";
import "./case-add.scss";
import {
  Button,
  Col,
  Container,
  Figure,
  Form,
  Modal,
  Row
} from "react-bootstrap";

const CaseAdd: React.FC = () => {
  return (
    <Modal>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <>
          <Form>
            <Container>
              <Row>增加新的案例</Row>
              <Row className="justify-content-md-center">
                <Col md={10}>
                  <Row className="justify-content-md-center mt-5">
                    <Col>
                      <Figure>
                        <Figure.Image
                          width={171}
                          height={180}
                          alt="171x180"
                          bg-light
                          src="#"
                        />
                        <Figure.Caption>BEFORE</Figure.Caption>
                      </Figure>
                    </Col>
                    <Col>
                      <Figure>
                        <Figure.Image
                          width={171}
                          height={180}
                          alt="171x180"
                          bg-light
                          src="#"
                        />
                        <Figure.Caption>BEFORE</Figure.Caption>
                      </Figure>
                    </Col>
                  </Row>

                  <Row className="mt-5">属性:</Row>

                  <Form.Row className="justify-content-md-center mt-3">
                    <Col md={6}>
                      <Form.Group as={Row} controlId="caseLabel1">
                        <Form.Label>LABEL 1: </Form.Label>
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            plaintext
                            defaultValue="HOUSEHOLD RELATE PRODUCTS"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Row className="justify-content-md-center mt-3">
                    <Col md={6}>
                      <Form.Group as={Row} controlId="caseLabel3">
                        <Form.Label>LABEL 3: </Form.Label>
                        <Col md={6}>
                          <Form.Control as="select">
                            <option>CHOOSE LABLE 3</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Row className="justify-content-md-center mt-3">
                    <Col md={6}>
                      <Form.Group as={Row} controlId="caseLabel4">
                        <Form.Label>LABEL 4: </Form.Label>
                        <Col md={6}>
                          <Form.Control as="select">
                            <option>MAN</option>
                            <option>WOMAN</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Row className="justify-content-md-center mt-3">
                    <Col md={6}>
                      <Form.Group as={Row} controlId="caseLabel5">
                        <Form.Label>LABEL 5: </Form.Label>
                        <Col md={6}>
                          <Form.Control as="select">
                            <option>RESURRECTION</option>
                            <option>REPAIR</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Row className="justify-content-md-center mt-3">
                    <Col md={6}>
                      <Form.Group as={Row} controlId="caseLabel6">
                        <Form.Label>LABEL 6: </Form.Label>
                        <Col md={6}>
                          <Form.Control as="select">
                            <option>CHOOSE LABLE 6</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Row className="justify-content-md-end mt-3">
                    <Button
                      className="w-25 rounded-pill"
                      variant="primary"
                      type="submit"
                    >
                      确认
                    </Button>
                  </Form.Row>
                </Col>
              </Row>
            </Container>
          </Form>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default CaseAdd;
