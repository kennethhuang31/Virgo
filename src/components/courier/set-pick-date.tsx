import React from "react";
import { Form, Col } from "react-bootstrap";
interface Props {
  startPickTime: any;
  endPickTime: any;
  handleStartPickTime: any;
  handleEndPickTime: any;
}
const SetPickDate: React.FC<Props> = ({
  handleStartPickTime,
  handleEndPickTime,
  startPickTime,
  endPickTime
}) => {
  return (
    <>
      <Form.Group as={Col} controlId="startTime">
        <Form.Control
          type="date"
          defaultValue={startPickTime}
          onChange={handleStartPickTime}
        ></Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="endTime">
        <Form.Control
          type="date"
          defaultValue={endPickTime}
          onChange={handleEndPickTime}
        ></Form.Control>
      </Form.Group>
    </>
  );
};
export default SetPickDate;
