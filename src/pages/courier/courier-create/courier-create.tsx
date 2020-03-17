import React from "react";
import { Form, Col, Button, Row, FormCheck } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import "./courier-create.scss";

interface Props {
  submit: boolean;
}

const CourierCreate: React.FC<{}> = () => {
  const [jobPosition, setJobPosition] = useState("1");
  const [controlArea, setcontrolArea] = useState("1");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setstartTime] = useState("");
  const [ird, setIrd] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [salary, setSalary] = useState("");
  const [commission, setCommission] = useState("");
  const [bonus, setBonus] = useState("");
  const [area, setArea] = useState([]);
  const [driverLic, setDriverLic] = useState("");
  const [contract, setContract] = useState("");
  const [validated, setValidated] = useState(false);

  const fqArea = [
    { id: 1, value: "City Centre" },
    { id: 2, value: "North Shore" },
    { id: 3, value: "Epsom" }
  ];

  const selFqArea: any = [...area];
  let driverPreview: any = {};

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleDriveChange = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      // driverPreview.file = file
      driverPreview = reader.result;
      setDriverLic(driverPreview);
    };
    reader.readAsDataURL(file);
  };

  let driverLicPreview = (
    <div
      style={{
        borderStyle: "solid",
        borderWidth: "1px",
        width: "24rem",
        height: "15rem"
      }}
    >
      {" "}
      Please upload a Dirver Liciense img.{" "}
    </div>
  );
  if (driverLic) {
    driverLicPreview = (
      <div>
        <img
          src={driverLic}
          alt="driver"
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            width: "24rem",
            height: "15rem"
          }}
        />
      </div>
    );
  }

  const handleContractChange = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      // driverPreview.file = file
      // driverPreview = reader.result
      const result: any = reader.result;
      setContract(result);
    };
    reader.readAsDataURL(file);
  };
  let contractPreview = (
    <div
      style={{
        borderStyle: "solid",
        borderWidth: "1px",
        width: "24rem",
        height: "15rem"
      }}
    >
      {" "}
      Please upload contract file.{" "}
    </div>
  );
  if (contract) {
    contractPreview = (
      <div>
        <img
          src={contract}
          alt="contract"
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            width: "24rem",
            height: "15rem"
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <Container className="create">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col xs={5}>
              <Form.Group as={Row} controlId="jobPosition">
                <Form.Label column sm={1.5}>
                  职位:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    as="select"
                    size="lg"
                    required
                    defaultValue={jobPosition}
                    onChange={(e: any) => setJobPosition(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Control>
                  <Form.Control.Feedback>OK</Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={6}>
              <Form.Group as={Row} controlId="controlArea">
                <Form.Label column sm={1.5}>
                  管理区域:{" "}
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    as="select"
                    size="lg"
                    required
                    defaultValue={controlArea}
                    onChange={(e: any) => setcontrolArea(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Control>
                  <Form.Control.Feedback>OK</Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={5}>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm={1.5}>
                  Email:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type="email"
                    size="lg"
                    placeholder="Enter email"
                    defaultValue={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    输入并确认邮箱格式
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={6}>
              <Form.Group as={Row} controlId="tel">
                <Form.Label column sm={1.5}>
                  联系电话:{" "}
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Phone Number"
                    defaultValue={tel}
                    onChange={(e: any) => setTel(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    不能为空
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={5}>
              <Form.Group as={Row} controlId="firstname">
                <Form.Label column sm={1.5}>
                  FirstName:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="First Name"
                    defaultValue={firstName}
                    onChange={(e: any) => setFirstName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    不能为空
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={6}>
              <Form.Group as={Row} controlId="lastname">
                <Form.Label column sm={1.5}>
                  LastName:{" "}
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Last Name"
                    defaultValue={lastName}
                    onChange={(e: any) => setLastName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    不能为空
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group as={Row} controlId="address">
                <Form.Label column sm={1.5}>
                  家庭住址:{" "}
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    size="lg"
                    defaultValue={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Col>

            {/* 上传照片 */}
            <Col xs={6}>
              <Form.Group as={Row} controlId="driverLicense">
                <Form.Label column sm={1.5}>
                  驾照上传：
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="file"
                    name="driver"
                    onChange={(e: any) => handleDriveChange(e)}
                  />
                  {driverLicPreview}
                </Col>
              </Form.Group>
            </Col>

            <Col xs={6}>
              <Form.Group as={Row} controlId="contractUp">
                <Form.Label column sm={1.5}>
                  合同上传：
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="file"
                    name="contract"
                    onChange={(e: any) => handleContractChange(e)}
                  />
                  {contractPreview}
                </Col>
              </Form.Group>
            </Col>
            {/* 111 */}

            <Col xs={4}>
              <Form.Group as={Row} controlId="startTime">
                <Form.Label column sm={1.5}>
                  入职时间:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type="date"
                    size="lg"
                    defaultValue={startTime}
                    onChange={(e: any) => setstartTime(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    不能为空
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group as={Row} controlId="ird">
                <Form.Label column sm={1.5}>
                  税号:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type="text"
                    pattern="[0-9]*"
                    size="lg"
                    defaultValue={ird}
                    onChange={(e: any) => setIrd(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    请确认输入,仅数字
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group as={Row} controlId="bankAccount">
                <Form.Label column sm={1.5}>
                  银行账户:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type="text"
                    size="lg"
                    defaultValue={bankAccount}
                    onChange={(e: any) => setBankAccount(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    不能为空
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group as={Row} controlId="salary">
                <Form.Label column sm={1.5}>
                  底薪:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    style={{ marginLeft: "20px" }}
                    type="text"
                    size="lg"
                    defaultValue={salary}
                    onChange={(e: any) => setSalary(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    不能为空
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group as={Row} controlId="commission">
                <Form.Label column sm={1.5}>
                  提成:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type="text"
                    size="lg"
                    defaultValue={commission}
                    onChange={(e: any) => setCommission(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group as={Row} controlId="bonus">
                <Form.Label column sm={1.5}>
                  福利:{" "}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type="text"
                    style={{ marginLeft: "21px" }}
                    size="lg"
                    defaultValue={bonus}
                    onChange={(e: any) => setBonus(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} style={{ padding: "0" }}>
              <Form.Label>放权区域: </Form.Label>
              <FormCheck>
                {fqArea.map((fa, index) => (
                  <Form.Check
                    type={"checkbox"}
                    custom
                    inline
                    label={fa.value}
                    value={fa.id}
                    key={index}
                    id={fa.value}
                    style={{ marginRight: "3rem" }}
                    onChange={(e: any) => {
                      if (e.target.checked) {
                        selFqArea.push(e.target.value);
                        // console.log(selFqArea)
                      } else {
                        const i = selFqArea.indexOf(e.target.value);
                        // console.log(i)
                        selFqArea.splice(i, 1);
                        // console.log(selFqArea)
                      }
                      setArea(selFqArea);
                    }}
                  />
                ))}
              </FormCheck>
            </Col>
          </Row>

          <Button type="submit">Submit form</Button>
        </Form>
      </Container>
    </div>
  );
};

export default CourierCreate;
