import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Button, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { AppLoading } from "components";

// import Servicebreadcrubs from "../servicebreadcrumbs/servicebreadcrubs";

import {
  fetchDataByLevelFromServer,
  fetchDataByParentIdFromServer,
  postDataToServer,
  putDataToServer,
  deleteDataToServer
} from "app-redux/actions/creators";
import {
  ServiceLevelBrief,
  ServiceLevelPostBrief,
  ServiceLevelPutBrief
} from "../../../models";
import { Breadcrumbs } from "../../label-service/component/breadcrumbs/breadcrumbs";
import { Breadcrumb } from "models";
import { breadcrumbService } from "services/breadcrumbService";

import "./LabelFive.scss";

interface Props {
  data: ServiceLevelBrief[];
  isFetching: boolean;
  isDirty: boolean;
  breadcrumbs: Breadcrumb;

  match: { params: { productId: number; productName: string } };

  fetchDataByLevelFromServer: (level: number) => any;
  fetchDataByParentIdFromServer: (parentId: number) => any;
  postDataToServer: (data: ServiceLevelPostBrief) => any;
  putDataToServer: (
    id: number,
    data: ServiceLevelPutBrief,
    imageFormData?: any
  ) => any;
  deleteDataToServer: (id: number) => any;
}

const LabelFive: React.FC<Props> = props => {
  const [validated, setValidated] = useState<boolean>(false);
  const [createName, setCreateName] = useState<string>("");
  const [editModel, setEditModel] = useState<boolean[]>([]);
  const [editName, setEditName] = useState<string[]>([]);

  useEffect(() => {
    if (
      undefined !== props.match.params.productId &&
      !Number.isNaN(Number(props.match.params.productId))
      // undefined !== props.match.params.productName
    ) {
      props.fetchDataByParentIdFromServer(props.match.params.productId);
    } else {
      props.fetchDataByLevelFromServer(5);
    }
  }, []);

  useEffect(() => {
    if (true === props.isDirty) {
      if (
        undefined !== props.match.params.productId &&
        !Number.isNaN(Number(props.match.params.productId))
        // undefined !== props.match.params.productName
      ) {
        props.fetchDataByParentIdFromServer(props.match.params.productId);
      } else {
        props.fetchDataByLevelFromServer(5);
      }
    }
  }, [props.isDirty]);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
  };

  const handleCodeSave = (id: number) => {
    props.putDataToServer(id, { Name: editName[id], ServicePriceInfoDto: {} });

    const temp = JSON.parse(JSON.stringify(editModel));
    temp[id] = false;
    setEditModel(temp);

    // console.log(`handleCodeSave = ${id}`);
  };

  const handleCodeDelete = (id: number) => {
    props.deleteDataToServer(id);

    // console.log(`handleCodeDelete = ${id}`);
  };

  const handleCodeEdit = (id: number) => {
    const temp = JSON.parse(JSON.stringify(editModel));
    temp[id] = true;
    setEditModel(temp);

    // console.log(`handleCodeEdit = ${id}`);
  };

  const handleCodeCreate = () => {
    props.postDataToServer({
      Name: createName,
      Chinese: createName,
      ParentLabelId: props.match.params.productId,
      Order: 0,
      ImageUrl: "null",
      LabelLevel: 5
    });

    // this.setState({ createName: "" });
  };

  const productList = props.data.map((item: any, index: number) => {
    return (
      <Col xs={12} key={index}>
        {editModel[item.id] ? (
          <Form.Group as={Row}>
            <Col xs={9}>
              <Form.Control
                required
                defaultValue={item.name}
                placeholder="Product Name"
                onChange={(event: any) => {
                  const temp = JSON.parse(JSON.stringify(editName));
                  temp[item.id] = event.target.value;
                  setEditName(temp);
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                请输入Product Name
              </Form.Control.Feedback>
            </Col>
            <Col xs={1}>
              <Button variant="info" onClick={() => handleCodeSave(item.id)}>
                Save
              </Button>
            </Col>
            <Col xs={1}>
              <Button variant="info" onClick={() => handleCodeDelete(item.id)}>
                Delete
              </Button>
            </Col>
          </Form.Group>
        ) : (
          <Form.Group as={Row}>
            <Col xs={9}>
              <Link
                to={`/LabelSix/${item.id}/${item.name}`}
                onClick={(event: any) => {
                  breadcrumbService.navigateToNextLabel(
                    item.name,
                    `/LabelSix/${item.id}`
                  );
                }}
              >
                {item.name}
              </Link>
            </Col>
            <Col xs={1}>
              <Button variant="info" onClick={() => handleCodeEdit(item.id)}>
                Edit
              </Button>
            </Col>
            <Col xs={1}>
              <Button variant="info" onClick={() => handleCodeDelete(item.id)}>
                Delete
              </Button>
            </Col>
          </Form.Group>
        )}
      </Col>
    );
  });

  return (
    <Container className="create">
      <AppLoading
        show={props.isFetching}
        handleClose={() => {
          console.log("loading...");
        }}
      />
      {/* <Servicebreadcrubs> */}
      <Breadcrumbs data={props.breadcrumbs}></Breadcrumbs>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} className="hTitle">
            <h1>
              {undefined !== props.match.params.productName
                ? `${props.match.params.productName} :`
                : ""}
            </h1>
          </Col>
          <Col xs={12}>
            <Form.Group as={Row}>
              <Col xs={10}>
                <Form.Control
                  required
                  defaultValue={createName}
                  // value = {createName}
                  placeholder="Product Name"
                  onChange={(event: any) => {
                    setCreateName(event.target.value);
                  }}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  请输入Product Name
                </Form.Control.Feedback>
              </Col>
              <Col xs={2}>
                <Button variant="info" onClick={handleCodeCreate}>
                  Add
                </Button>
              </Col>
            </Form.Group>
          </Col>

          {productList}
        </Row>
      </Form>
      {/* </Servicebreadcrubs> */}
    </Container>
  );
};

const mapToStateProps = (state: any) => {
  // console.log("MainPage-->lang: ", state.reducerLang.lang);
  return {
    // lang: state.reducerLang.lang,
    data: state.priceServiceLevelReducer.data,
    isFetching: state.priceServiceLevelReducer.isFetching,
    isDirty: state.priceServiceLevelReducer.isDirty,
    breadcrumbs: state.breadcrumbReducer.breadcrumb
  };
};

const mapDispatchToProps = {
  fetchDataByLevelFromServer,
  fetchDataByParentIdFromServer,
  postDataToServer,
  putDataToServer,
  deleteDataToServer
};

export default connect(mapToStateProps, mapDispatchToProps)(LabelFive);
