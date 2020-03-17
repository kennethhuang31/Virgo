import React from "react";
import "./customer-search.scss";
import { CustomerSummary } from "models";
import { AppTitledPage } from "components";
import { useHistory } from "react-router";
import Table from "react-bootstrap/Table";
import { Button, Col, Form } from "react-bootstrap";

interface CustomerSearchPropsInterface {
  summaries: CustomerSummary[];
}

const CustomerSearch: React.FC<CustomerSearchPropsInterface> = (
  props: CustomerSearchPropsInterface
) => {
  const history = useHistory();

  const showAll = () => {
    window.location.reload();
  };

  const showDetail = (id: number) => {
    history.push({
      pathname: "/customer/detail",
      state: id
    });
  };

  return (
    <AppTitledPage title="客户列表">
      <div className="customer-search">
        <div className="customer-search-showall" onClick={showAll}>
          <a href="#">ALL&gt;</a>
        </div>
        <div className="customer-search-filter">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="customerName">
                <Form.Control type="text" placeholder="NAME" />
              </Form.Group>

              <Form.Group as={Col} controlId="customerEmail">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group as={Col} controlId="customerOrderID">
                <Form.Control type="text" placeholder="ORDER ID" />
              </Form.Group>

              <Form.Group as={Col} controlId="customerTel">
                <Form.Control type="tel" placeholder="TEL" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="customerStatus">
                <Form.Control as="select">
                  <option>当前状态选择</option>
                  <option>C-A</option>
                  <option>A1</option>
                  <option>A-F</option>
                  <option>F</option>
                  <option>F-A</option>
                  <option>A2</option>
                  <option>WP</option>
                  <option>ITW</option>
                  <option>FR</option>
                  <option>FINI</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="customerSortBy">
                <Form.Control as="select">
                  <option>Sort By</option>
                  <option>WALLET余额由多至少排序</option>
                  <option>WALLET余额由少至多排序</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="customerCancelStatus">
                <Form.Control as="select">
                  <option>客户已取消订单</option>
                  <option>拒绝客户取消订单</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="customerProblemOrderStatus">
                <Form.Control as="select">
                  <option>问题状态</option>
                  <option>问题订单</option>
                  <option>问题订单-已解决</option>
                  <option>丢失破损订单</option>
                </Form.Control>
              </Form.Group>

              <Form.Group
                className="formGroupWithLabel"
                as={Col}
                controlId="customerSum"
              >
                <Form.Label>总数: </Form.Label>
                <Form.Control
                  type="text"
                  plaintext
                  readOnly
                  defaultValue="89"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm={5} controlId="customerSendAddress">
                <Form.Control as="select">
                  <option>送货地址选择</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} sm={5} controlId="customerReceiveAddress">
                <Form.Control as="select">
                  <option>取货地址选择</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} sm={2} controlId="customerSubmit">
                <Button type="submit">&nbsp;&nbsp;确认&nbsp;&nbsp;</Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
        <div className="customer-search-list">
          <Table striped bordered hover variant="secondary">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>WALLET</th>
                <th>ORDER总数</th>
                <th>上个月下单总数</th>
                <th>取消物品次数</th>
                <th>最近一次下单时间</th>
                <th>默认地址</th>
              </tr>
            </thead>
            <tbody>
              {props.summaries.map((summary: CustomerSummary, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      showDetail(summary.userId);
                    }}
                  >
                    <td>{summary.name}</td>
                    <td>{summary.email}</td>
                    <td>{summary.wallet}</td>
                    <td>{summary.orderTimes}</td>
                    <td>{summary.orderTimesLastMonth}</td>
                    <td>{summary.canceledTime}</td>
                    <td>{summary.lastestOrderDate}</td>
                    <td>{summary.defaultAddress}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </AppTitledPage>
  );
};

export default CustomerSearch;
