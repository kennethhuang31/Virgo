import React from "react";
import { Table } from "react-bootstrap";

interface Props {
  id: number;
  dayDiff: any;
  pickSalary: any;
  list: any;
}

const PickProductList: React.FC<Props> = ({
  id,
  dayDiff,
  pickSalary,
  list
}) => {
  const pickProductList = list.map((item: any, index: number) => {
    return (
      <div key={index}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>总天数</th>
              <th>总件数</th>
              <th>工资总数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{dayDiff}</td>
              <td>{item.listMount}</td>
              <td>{pickSalary}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  });

  return <> {pickProductList}</>;
};
export default PickProductList;
