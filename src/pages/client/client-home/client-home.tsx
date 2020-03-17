import React from "react";
import "./client-home.scss";
import { Button, Col, Container, Figure, Row } from "react-bootstrap";

const ClientHome: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>首页轮播图片展示区</Col>
      </Row>
      <Row className="justify-content-md-around mt-5">
        <Col md={4}>
          <Figure>
            <Figure.Image width={171} height={180} alt="171x180" src="#" />
          </Figure>
        </Col>
        <Row className="align-content-md-end">
          <Col>
            <Button variant="primary" size="lg" type="button">
              确定
            </Button>
          </Col>
        </Row>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col md={12}>
          <hr />
        </Col>
      </Row>
      <Row className="justify-content-md-between">
        <Col md={6}>历史记录</Col>
        <Col md={3}>总数: 89</Col>
      </Row>
      <Row className="justify-content-md-around mt-5">
        <Col md={{ offset: 2 }}>
          <Figure>
            <Figure.Image width={171} height={180} alt="171x180" src="#" />
          </Figure>
        </Col>
      </Row>
      <Row className="justify-content-md-around mt-5">
        <Col md={{ offset: 2 }}>
          <Figure>
            <Figure.Image width={171} height={180} alt="171x180" src="#" />
          </Figure>
        </Col>
      </Row>
      <Row className="justify-content-md-around mt-5">
        <Col md={{ offset: 2 }}>
          <Figure>
            <Figure.Image width={171} height={180} alt="171x180" src="#" />
          </Figure>
        </Col>
      </Row>
      <Row className="justify-content-md-around mt-5">
        <Col md={{ offset: 2 }}>
          <Figure>
            <Figure.Image width={171} height={180} alt="171x180" src="#" />
          </Figure>
        </Col>
      </Row>
      <Row className="justify-content-md-around mt-5">
        <Col md={{ offset: 2 }}>
          <Figure>
            <Figure.Image width={171} height={180} alt="171x180" src="#" />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientHome;
