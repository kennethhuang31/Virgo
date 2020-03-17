import React, { useState } from "react";
import "./fqa-search.scss";
import { faqChinese } from "../../../mock/faq/faq";
import FqaEditComponent from "../../../components/fqa/fqa-edit-componet/fqa-edit-component";
import FqaCreateComponent from "../../../components/fqa/fqa-create-component/fqa-create-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Modal, Form, Col } from "react-bootstrap";

const FqaSearch: React.FC = () => {
  const [faq, setFaqList] = useState(faqChinese);
  const [chineseQuestionName, setChineseQuestionName] = useState("");
  const [englishQuestionName, setEnglishQuestionName] = useState("");
  const [chineseQuestionContent, setChineseQuestionContent] = useState("");
  const [englishQuestionContent, setEnglishQuestionContent] = useState("");
  const [show, setShow] = useState(false);
  const [cName, setCName] = useState("a");
  const [eName, setEName] = useState("e");
  const [cAnswer, setCAnswer] = useState("aa");
  const [eAnswer, setEAnswer] = useState("bb");
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(1);

  /*set random function*/
  function handleRandom() {
    const tmpFaq = JSON.parse(JSON.stringify(faqChinese));
    const tmp = tmpFaq.sort(function() {
      return 0.5 - Math.random();
    });
    setFaqList(tmp);
    console.log(tmp);
  }
  /* create modal show,close and save */
  function handleShow() {
    setShow(true);
    console.log("button");
  }
  function handleClose() {
    setShow(false);
  }

  function handleSave() {
    console.log("succeed");
    setCAnswer("");
    setCName("");
    setEAnswer("");
    setEName("");
    setTimeout(function() {
      setShow(false);
    }, 2000);
  }
  /** create chinese question,english question, chinese content
   * and english content
   */
  function handleCreateCName(event: any) {
    setCName(event.target.value);
    console.log(event.target.value);
    console.log(cName);
  }

  function handleCreateCAnswer(event: any) {
    setCAnswer(event.target.value);
    console.log(cAnswer);
  }

  function handleCreateEName(event: any) {
    setEName(event.target.value);
    console.log(eName);
  }

  function handleCreateEAnswer(event: any) {
    setEAnswer(event.target.value);
    console.log(eAnswer);
  }
  /**edit modal show,close and save  */
  function handEdit(index: any) {
    setShowEdit(true);
    setId(index);
    console.log(index);
    console.log("handedit");
  }
  function handleEditClose(index: any) {
    console.log(index);
    setShowEdit(false);
  }
  function handleEditSave() {
    console.log("edit succeed");
    setTimeout(function() {
      setShowEdit(false);
    }, 2000);
  }
  /* edit chinese name, chinese content, english name,english content */
  function handleEditCName(event: any) {
    setChineseQuestionName(event.target.value);
    console.log(chineseQuestionName);
  }
  function handleEditEName(event: any) {
    setEnglishQuestionName(event.target.value);
    console.log(englishQuestionName);
  }
  function handleEditCAnswer(event: any) {
    setChineseQuestionContent(event.target.value);
    console.log(chineseQuestionContent);
  }
  function handleEditEAnswer(event: any) {
    setEnglishQuestionContent(event.target.value);
    console.log(englishQuestionContent);
  }
  const faqList = faq.map((detail: any, index: any) => {
    return (
      <div key={detail.number}>
        <div className="content">
          <p></p>
          <Row className="title">
            {detail.number}:
            <input
              id={"cn" + index}
              className="input"
              readOnly
              defaultValue={detail.questionName}
            ></input>
            <FontAwesomeIcon
              className="icon"
              icon={faPencilAlt}
              onClick={() => {
                handEdit(detail.number);
              }}
            />
          </Row>
          <textarea
            id={"cc" + index}
            readOnly
            className="text textarea"
            defaultValue={detail.questionContent}
          ></textarea>
          <Row className="title">
            {index + 1}:
            <input
              id={"en" + index}
              className="input"
              readOnly
              defaultValue={detail.questionNameE}
            ></input>
          </Row>
          <textarea
            id={"ec" + index}
            readOnly
            className="text textarea"
            defaultValue={detail.questionContentE}
          ></textarea>
        </div>
      </div>
    );
  });
  return (
    <div>
      <Row>
        FAQ
        <FontAwesomeIcon
          className="icon"
          icon={faRandom}
          onClick={handleRandom}
        />
        <Button className="icon" onClick={handleShow}>
          Add
        </Button>
        <div className="mount">总数：{faqChinese.length} </div>
      </Row>
      <p></p>
      {faqList}
      <FqaCreateComponent
        show={show}
        save={handleSave}
        handleCName={handleCreateCName}
        handleCAnswer={handleCreateCAnswer}
        handleEName={handleCreateEName}
        handleEAnswer={handleCreateEAnswer}
        close={handleClose}
      ></FqaCreateComponent>
      <FqaEditComponent
        id={id}
        show={showEdit}
        save={handleEditSave}
        handleCName={handleEditCName}
        handleCAnswer={handleEditCAnswer}
        handleEName={handleEditEName}
        handleEAnswer={handleEditEAnswer}
        close={handleEditClose}
      ></FqaEditComponent>
    </div>
  );
};

export default FqaSearch;
