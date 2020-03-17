import React from "react";
import { Form, Col } from "react-bootstrap";

interface Props {
  startGetTime: any;
  endGetTime: any;
  handleStartGetTime: any;
  handleEndGetTime: any;
}
const SetGetDate: React.FC<Props> = ({
  handleStartGetTime,
  handleEndGetTime,
  startGetTime,
  endGetTime
}) => {
  return (
    <>
      <Form.Group as={Col} controlId="startTime">
        <Form.Control
          type="date"
          defaultValue={startGetTime}
          onChange={handleStartGetTime}
        ></Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="endTime">
        <Form.Control
          type="date"
          defaultValue={endGetTime}
          onChange={handleEndGetTime}
        ></Form.Control>
      </Form.Group>
    </>
  );
};
export default SetGetDate;
