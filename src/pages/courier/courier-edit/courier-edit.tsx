import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Form } from "react-bootstrap";
import { Courier } from "../../../mock/courier/courier";
import GetProductList from "../../../components/courier/get-product-list";
import PickProductList from "../../../components/courier/pick-product-list";
import SetGetDate from "../../../components/courier/set-get-date";
import SetPickDate from "../../../components/courier/set-pick-date";
import { GetList, PickList } from "../../../mock/courier/getList";
import "./courier-edit.scss";
interface Props {
  show: boolean;
  handleClose: any;
  id: any;
  validated: any;
  setValidated: any;
}

const CourierEdit: React.FC<Props> = ({
  show,
  handleClose,
  id,
  validated,
  setValidated
}) => {
  function getStartTime() {
    const today = new Date();

    if (today.getDate() < 10) {
      const day = 0 + "" + today.getDate();
      if (today.getMonth() + 1 < 3) {
        return (
          today.getFullYear() -
          1 +
          "-" +
          (12 + today.getMonth() - 2) +
          "-" +
          day
        );
      } else {
        return today.getFullYear() + "-" + (today.getMonth() - 2) + "-" + day;
      }
    } else {
      if (today.getMonth() + 1 < 3) {
        return (
          today.getFullYear() -
          1 +
          "-" +
          (12 + today.getMonth() - 2) +
          "-" +
          today.getDate()
        );
      } else {
        return (
          today.getFullYear() +
          "-" +
          (today.getMonth() - 2) +
          "-" +
          today.getDate()
        );
      }
    }
  }
  function getEndTime() {
    const today = new Date();
    if (today.getDate() < 10) {
      const day = 0 + "" + today.getDate();
      return today.getFullYear() + "-" + today.getMonth() + 1 + "-" + day;
    } else {
      return (
        today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate()
      );
    }
  }
  const editDetail = Courier.filter((item: any) => item.id === id);
  const [number, setNumber] = useState(editDetail[0].id);
  const [address, setAddress] = useState(editDetail[0].address);
  const [telephone, setTelephone] = useState(editDetail[0].phone);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [recepTel, setRecepTel] = useState("");
  const [gender, setGender] = useState(1);
  const [createTime, setCreateTime] = useState("");
  const [onTime, setOnTime] = useState("");
  const [startGetTime, setStartGetTime] = useState(getStartTime());
  const [endGetTime, setEndGetTime] = useState(getEndTime());
  const [startPickTime, setStartPickTime] = useState(getStartTime());
  const [endPickTime, setEndPickTime] = useState(getEndTime());
  const [dayGetDiff, setDayGetDiff] = useState("");
  const [dayPickDiff, setDayPickDiff] = useState("");
  const [salaryCount, setSalaryCount] = useState(0);
  const [getSalary, setGetSalary] = useState(0);
  const [pickSalary, setPickSalary] = useState(0);
  const [listGet, setListGet] = useState([]);
  const [listPick, setListPick] = useState([]);
  // console.log(number, address, email, recepTel, gender, createTime, onTime);
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    console.log(number);
  };
  useEffect(() => {
    setSalaryCount(getSalary + pickSalary);
  }, [pickSalary, getSalary]);
  function handlePickSearch() {
    const temStartDay = +new Date(startPickTime);
    const temEndDay = +new Date(endPickTime);
    const days = (temEndDay - temStartDay) / (1000 * 60 * 60 * 24) + "";
    setDayPickDiff(days);
    setListPick(PickList);
    setPickSalary(PickList[0].salaryMount);
    console.log(" Pick search");
  }

  function handleSearch() {
    const temStartDay = +new Date(startGetTime);
    const temEndDay = +new Date(endGetTime);
    const days = (temEndDay - temStartDay) / (1000 * 60 * 60 * 24) + "";
    setDayGetDiff(days);
    console.log(startGetTime);
    console.log(endGetTime);
    console.log(dayGetDiff);
    setListGet(GetList);
    setGetSalary(GetList[0].salaryMount);
    console.log("search");
  }
  function handleEndGetTime(event: any) {
    setEndGetTime(event.target.value);
    console.log(event.target.value);
  }
  function handleStartGetTime(event: any) {
    console.log(event.target.value);
    setStartGetTime(event.target.value);
  }
  function handleEndPickTime(event: any) {
    setEndPickTime(event.target.value);
  }
  function handleStartPickTime(event: any) {
    setStartPickTime(event.target.value);
  }

  const Detail = editDetail.map((item: any, index: any) => {
    return (
      <div key={index}>
        <Form
          noValidate
          validated={validated}
          onSubmit={(event: any) => handleSubmit(event)}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="id">
              <Form.Label>代理ID</Form.Label>
              <Form.Control
                required
                type="number"
                defaultValue={item.id}
                onChange={(event: any) => setNumber(event.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="address">
              <Form.Label>地址</Form.Label>
              <Form.Control
                required
                defaultValue={item.address}
                onChange={(event: any) => setAddress(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                defaultValue={item.email}
                onChange={(event: any) => setEmail(event.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="title">
              <Form.Label>名称</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(event: any) => setTitle(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="telephone">
              <Form.Label>联系电话</Form.Label>
              <Form.Control
                required
                type="number"
                onChange={(event: any) => setTelephone(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="recepTel">
              <Form.Label>Reception Tel</Form.Label>
              <Form.Control
                required
                type="number"
                onChange={(event: any) => setRecepTel(event.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>性别</Form.Label>
                <Form.Row>
                  <Col sm={2}>
                    <Form.Check
                      type="radio"
                      label="男"
                      name="gender"
                      id="1"
                      value="1"
                      onClick={(event: any) => setGender(event.target.value)}
                    ></Form.Check>
                  </Col>
                  <Col sm={2}>
                    <Form.Check
                      type="radio"
                      label="女"
                      name="gender"
                      id="2"
                      value="2"
                      onClick={(event: any) => setGender(event.target.value)}
                    ></Form.Check>
                  </Col>
                </Form.Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>创建ID时间</Form.Label>
                <Form.Control
                  required
                  type="date"
                  onChange={(event: any) => setCreateTime(event.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>上线时间</Form.Label>
                <Form.Control
                  required
                  type="date"
                  onChange={(event: any) => setOnTime(event.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Label className="text">收件历史记录</Form.Label>
          </Form.Row>
          <Form.Row>
            <SetGetDate
              startGetTime={startGetTime}
              endGetTime={endGetTime}
              handleEndGetTime={handleEndGetTime}
              handleStartGetTime={handleStartGetTime}
            ></SetGetDate>
            <Form.Group as={Col}>
              <Button onClick={handleSearch}>查询</Button>
            </Form.Group>
          </Form.Row>
          <GetProductList
            list={listGet}
            getSalary={getSalary}
            dayDiff={dayGetDiff}
            id={id}
          ></GetProductList>
          <Form.Row>
            <Form.Label className="text">取件历史记录</Form.Label>
          </Form.Row>
          <Form.Row>
            <SetPickDate
              startPickTime={startPickTime}
              endPickTime={endPickTime}
              handleStartPickTime={handleStartPickTime}
              handleEndPickTime={handleEndPickTime}
            ></SetPickDate>
            <Form.Group as={Col}>
              <Button onClick={handlePickSearch}>查询</Button>
            </Form.Group>
          </Form.Row>
          <PickProductList
            list={listPick}
            pickSalary={pickSalary}
            dayDiff={dayPickDiff}
            id={id}
          ></PickProductList>
          <Form.Row>
            <Col>
              <Form.Label>工资总计: {salaryCount}</Form.Label>
            </Col>
          </Form.Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    );
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Detail}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourierEdit;
