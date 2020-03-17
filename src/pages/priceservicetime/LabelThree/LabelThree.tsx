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
  ServicePriceInfo,
  ServiceLevelBrief,
  ServiceLevelPostBrief,
  ServiceLevelPutBrief
} from "../../../models";
import { Breadcrumbs } from "../../label-service/component/breadcrumbs/breadcrumbs";
import { Breadcrumb } from "models";
import { breadcrumbService } from "services/breadcrumbService";

import { AppImage } from "components";

import "./LabelThree.scss";

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

const LabelThree: React.FC<Props> = props => {
  const [validated, setValidated] = useState<boolean>(false);
  const [createName, setCreateName] = useState<string>("");
  const [editModel, setEditModel] = useState<boolean[]>([]);
  const [editName, setEditName] = useState<string[]>([]);
  const [editNormalDay, setEditNormalDay] = useState<number[]>([]);
  const [editEmergencyDay, setEditEmergencyDay] = useState<number[]>([]);
  const [selectedImageFile, setSelectedImageFile] = useState<any[]>([]);

  useEffect(() => {
    if (
      undefined !== props.match.params.productId &&
      !Number.isNaN(Number(props.match.params.productId))
      // undefined !== props.match.params.productName
    ) {
      props.fetchDataByParentIdFromServer(props.match.params.productId);
    } else {
      props.fetchDataByLevelFromServer(3);
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
        props.fetchDataByLevelFromServer(3);
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
    const data: any = {
      ServicePriceInfoDto: {}
    };

    const element: any = props.data.find(element => element["id"] === id);
    if (undefined !== element) {
      data["Name"] = element["name"];
    }

    if (undefined !== editName[id]) {
      data["Name"] = editName[id];
    }

    if (undefined !== editNormalDay[id]) {
      data["ServicePriceInfoDto"]["NormalDay"] = editNormalDay[id];
    }

    if (undefined !== editEmergencyDay[id]) {
      data["ServicePriceInfoDto"]["EmergencyDay"] = editEmergencyDay[id];
    }

    if (undefined !== selectedImageFile[id]) {
      const formData = new FormData();
      formData.append(
        "imageFile",
        selectedImageFile[id]
        // ,
        // selectedImageFile[id].name
      );

      props.putDataToServer(id, data, formData);
      setSelectedImageFile([]);
    } else {
      props.putDataToServer(id, data);
    }

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
      LabelLevel: 3
    });

    // this.setState({ createName: "" });
  };

  const uploadHandler = (id: number) => {
    console.log(selectedImageFile);
    const formData = new FormData();
    formData.append("Image", selectedImageFile[id], selectedImageFile[id].name);
    // axios.post('my-domain.com/file-upload', formData);
  };

  const productList = props.data.map((item: any, index: number) => {
    return (
      <Col xs={12} key={index}>
        {editModel[item.id] ? (
          <Form.Group as={Row} className="vCenter">
            <Col xs={4}>
              <input
                type="file"
                onChange={(event: any) => {
                  const temp = JSON.parse(JSON.stringify(selectedImageFile));
                  temp[item.id] = event.target.files[0];
                  setSelectedImageFile(temp);
                }}
              />
            </Col>
            <Col xs={3}>
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
            <Col xs={1}>
              <Form.Control
                required
                // defaultValue={1}
                placeholder="ND:"
                onChange={(event: any) => {
                  const temp = JSON.parse(JSON.stringify(editNormalDay));
                  temp[item.id] = event.target.value;
                  setEditNormalDay(temp);
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                请输入ND
              </Form.Control.Feedback>
            </Col>
            <Col xs={1}>
              <Form.Control
                required
                // defaultValue={1}
                placeholder="ED:"
                onChange={(event: any) => {
                  const temp = JSON.parse(JSON.stringify(editEmergencyDay));
                  temp[item.id] = event.target.value;
                  setEditEmergencyDay(temp);
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                请输入ED
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        ) : (
          <Form.Group as={Row} className="vCenter">
            <Col xs={1}>
              <AppImage url={item.imageUrl} shape="circle" scalable={true} />
              {/* <AppImage
                url={
                  "https://www.workingclassheroes.co.uk/images/oldskoolnavy2.jpg"
                }
                shape="circle"
                scalable={true}
              /> */}
            </Col>
            <Col xs={6}>
              <Link
                to={`/LabelFour/${item.id}/${item.name}`}
                onClick={(event: any) => {
                  breadcrumbService.navigateToNextLabel(
                    item.name,
                    `/LabelFour/${item.id}`
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
            <Col xs={1}>
              <Form.Label>
                ND:{" "}
                {null !== item.servicePriceInfo
                  ? item.servicePriceInfo.normalDay
                  : ""}
              </Form.Label>
            </Col>
            <Col xs={1}>
              <Form.Label>
                ED:{" "}
                {null !== item.servicePriceInfo
                  ? item.servicePriceInfo.emergencyDay
                  : ""}
              </Form.Label>
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

export default connect(mapToStateProps, mapDispatchToProps)(LabelThree);
