import React from "react";
import "./client-case.scss";
import { Button, Col, Container, Figure, Row } from "react-bootstrap";

const ClientCase: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-between">
        <Col md={2}>
          <Row className="justify-content-md-around">
            <Col md={3}>CASE</Col>
            <Col md={3}>
              <Button variant="primary" type="button">
                ADD
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={2}>总数: 89</Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col className="w-75 h-50 p-5 border border-secondary" md={10}>
          <Row className="justify-content-md-left">
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Row>属性:</Row>
              <Row>LABLE 1:</Row>
              <Row>LABLE 3:</Row>
              <Row>LABLE 4:</Row>
              <Row>LABLE 5:</Row>
              <Row>LABLE 6:</Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col className="w-75 h-50 p-5 border border-secondary" md={10}>
          <Row className="justify-content-md-left">
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Row>属性:</Row>
              <Row>LABLE 1:</Row>
              <Row>LABLE 3:</Row>
              <Row>LABLE 4:</Row>
              <Row>LABLE 5:</Row>
              <Row>LABLE 6:</Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col className="w-75 h-50 p-5 border border-secondary" md={10}>
          <Row className="justify-content-md-left">
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Row>属性:</Row>
              <Row>LABLE 1:</Row>
              <Row>LABLE 3:</Row>
              <Row>LABLE 4:</Row>
              <Row>LABLE 5:</Row>
              <Row>LABLE 6:</Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col className="w-75 h-50 p-5 border border-secondary" md={10}>
          <Row className="justify-content-md-left">
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Row>属性:</Row>
              <Row>LABLE 1:</Row>
              <Row>LABLE 3:</Row>
              <Row>LABLE 4:</Row>
              <Row>LABLE 5:</Row>
              <Row>LABLE 6:</Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col className="w-75 h-50 p-5 border border-secondary" md={10}>
          <Row className="justify-content-md-left">
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Figure>
                <Figure.Image width={171} height={180} alt="171x180" src="#" />
                <Figure.Caption>BEFORE</Figure.Caption>
              </Figure>
            </Col>
            <Col md={3}>
              <Row>属性:</Row>
              <Row>LABLE 1:</Row>
              <Row>LABLE 3:</Row>
              <Row>LABLE 4:</Row>
              <Row>LABLE 5:</Row>
              <Row>LABLE 6:</Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientCase;
