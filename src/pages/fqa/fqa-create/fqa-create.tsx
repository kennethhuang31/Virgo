import React, { useState } from "react";

import FqaCreateComponent from "../../../components/fqa/fqa-create-component/fqa-create-component";
import "./faq-create.scss";

const FqaCreate: React.FC<{}> = () => {
  const [show, setShow] = useState(true);
  const [cName, setCName] = useState("a");
  const [eName, setEName] = useState("e");
  const [cAnswer, setCAnswer] = useState("aa");
  const [eAnswer, setEAnswer] = useState("bb");
  function handleShow() {
    setShow(true);
    console.log("button");
  }
  function handleClose() {
    setShow(false);
  }
  /*save create question and answer
  缺少anxios post*/
  function handleSave() {
    console.log("succeed");
    setTimeout(function() {
      setShow(false);
    }, 1000);
    setTimeout(function() {
      setShow(true);
    }, 2000);
  }

  function handleCreateCName(event: any) {
    event.persist();
    setCName(event.target.value);
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

  return (
    <FqaCreateComponent
      show={show}
      save={handleSave}
      handleCName={handleCreateCName}
      handleCAnswer={handleCreateCAnswer}
      handleEName={handleCreateEName}
      handleEAnswer={handleCreateEAnswer}
      close={handleClose}
    ></FqaCreateComponent>
  );
};

export default FqaCreate;
