import React, { useState } from "react";
import { Card, Row, Button, Col, ListGroup } from "react-bootstrap";
import { Courier } from "../../../mock/courier/courier";
import ComplainDetail from "../../../components/courier/complain-detail";
import CourierEdit from "../courier-edit/courier-edit";
import "./courier-detail.scss";

const CourierDetail: React.FC<{}> = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(1);
  const [validated, setValidated] = useState(false);
  function handleAlertClose() {
    setShowAlert(false);
  }
  function handleEditClose() {
    setEdit(false);
    setValidated(false);
  }
  function handleSave() {
    console.log(content);
    if (content === "") {
      setShowAlert(true);
    } else {
      setTimeout(function() {
        setShow(false);
      }, 1000);
    }
    setContent("");
  }
  function changeContent(e: any) {
    setContent(e.target.value);
  }
  function handleClick() {
    console.log("check detail");
  }
  function handleEdit(event: any, id: any) {
    setEdit(true);
    setId(id);
    console.log("edit informaiton");
    console.log(event);
    console.log(id);
  }
  function handleDetail() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }
  const courierDetail = Courier.map((detail: any, index: any) => {
    return (
      <div key={index}>
        <Card className="card">
          <ListGroup>
            <ListGroup.Item className="listItem">
              <Row>
                <Col>
                  <h3>Courier Information</h3>
                </Col>

                <Button
                  className="item"
                  variant="info"
                  size="sm"
                  onClick={handleClick}
                >
                  Check
                </Button>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>代理id:{detail.id}</Col>
                <Col>开始时间：{detail.startTime}</Col>
                <Col>Email：{detail.email}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>地址：{detail.address}</Col>
                <Col>区域：{detail.reigon}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col> 电话：{detail.tel}</Col>
                <Col>代理：{detail.agent}</Col>
                <Col>提成：{detail.commission}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>取件数:{detail.getAmountCustomer}</Col>
                <Col>收件数：{detail.getAmountFactory}</Col>
                <Col>工资：{detail.salary}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>银行账户：{detail.bankAccount}</ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Report 总数:{detail.report}</Col>
                <Col>丢件数:{detail.lost}</Col>
                <Col>
                  客户投诉次数:{detail.complaint}
                  <Button variant="info" onClick={handleDetail}>
                    Add Complain Detail
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="info"
                onClick={(event: any) => handleEdit(event, detail.id)}
              >
                Edit
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  });

  return (
    <div>
      {courierDetail}
      <ComplainDetail
        show={show}
        handleClose={handleClose}
        content={content}
        changeContent={changeContent}
        save={handleSave}
        showAlert={showAlert}
        handleAlertClose={handleAlertClose}
      />
      <CourierEdit
        validated={validated}
        setValidated={setValidated}
        show={edit}
        handleClose={handleEditClose}
        id={id}
      />
    </div>
  );
};

export default CourierDetail;
