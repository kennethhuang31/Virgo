import React, { useState } from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import axios from "axios";
import "./qrcode.scss";

const QRcode: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [count, setCount] = useState(0);
  const [qrCodeId, setqrCodeId] = useState("");

  function handleSubmit(event: any) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      // console.log(
      //   id,
      //   email,
      //   shopAddress,
      //   shopName,
      //   shopPhone,
      //   connectName,
      //   connectPhone,
      //   agentClass,
      //   location,
      //   account,
      //   allowranceClass,
      //   upTime
      // );
    }

    setValidated(true);
  }

  async function handleCount() {
    // setShow(true);
    await axios
      .get("http://192.168.178.96:5001/api/pxpay/createBarcode/" + count)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  async function handleCodeId() {
    // setShow(true);
    await axios
      .get(
        "http://192.168.178.96:5001/api/pxpay/createSpecifyBarcode/" + qrCodeId
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  async function getHistory() {
    try {
      const response = await axios.get("/user?ID=12345");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // return <div>QRcode</div>;

  return (
    <div>
      <h1>Create New QRcode</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>本次需要生成</Form.Label>
              <Form.Control
                required
                defaultValue={count}
                placeholder="代理ID"
                onChange={(event: any) => setCount(event.target.value)}
              ></Form.Control>
              <Form.Label>个二维码，下载至本地。</Form.Label>
              <Form.Control.Feedback type="invalid">
                请输入二维码个数
              </Form.Control.Feedback>

              <Button variant="info" onClick={handleCount}>
                确定
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>输入二维码ID</Form.Label>
              <Form.Control
                required
                defaultValue={qrCodeId}
                placeholder="代理ID"
                onChange={(event: any) => setqrCodeId(event.target.value)}
              ></Form.Control>
              <Form.Label>，保存此二维码图片。</Form.Label>
              <Form.Control.Feedback type="invalid">
                请输入二维ID
              </Form.Control.Feedback>

              <Button variant="info" onClick={handleCodeId}>
                确定
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>历史记录</Form.Label>
              <textarea className="history_record" name="" id=""></textarea>
            </Form.Group>
          </Col>
        </Row>
        {/* <Button variant="primary" type="submit">
          Submit
        </Button> */}
      </Form>
    </div>
  );
};

export default QRcode;
