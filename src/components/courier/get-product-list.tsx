import React from "react";
import { Table } from "react-bootstrap";
interface Props {
  id: number;
  dayDiff: any;
  getSalary: any;
  list: any;
}
const GetProductList: React.FC<Props> = ({ id, dayDiff, getSalary, list }) => {
  const getProductList = list.map((item: any, index: number) => {
    console.log(id);
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
              <td>{getSalary}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  });

  return <> {getProductList}</>;
};
export default GetProductList;
