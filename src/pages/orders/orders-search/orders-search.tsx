import React from "react";
import "./orders-search.scss";
import { OrderSummary } from "models";
import { AppTitledPage } from "components";
import { useHistory } from "react-router";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface OrderSearchPropsInterface {
  summaries: OrderSummary[];
}

const OrdersSearch: React.FC<OrderSearchPropsInterface> = (
  props: OrderSearchPropsInterface
) => {
  const history = useHistory();

  const showAll = () => {
    window.location.reload();
  };

  const showDetail = (id: string) => {
    history.push({
      pathname: "/orders/detail",
      state: id
    });
  };

  return (
    <AppTitledPage title="物品搜索">
      <div className="order-search">
        <div className="order-search-showall" onClick={showAll}>
          <a href="#">ALL&gt;</a>
        </div>
        <div className="order-search-filter">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="itemQrCodeID">
                <Form.Control type="text" placeholder="条形码 ID" />
              </Form.Group>

              <Form.Group as={Col} controlId="itemEmail">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group as={Col} controlId="itemTel">
                <Form.Control type="tel" placeholder="TEL" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="itemStatus">
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

              <Form.Group as={Col} controlId="itemSortBy">
                <Form.Control as="select">
                  <option>Sort By</option>
                  <option>剩余金额由多至少排序</option>
                  <option>剩余金额由少至多排序</option>
                  <option>退款金额由多至少排序</option>
                  <option>退款金额由少至多排序</option>
                  <option>实付金额由多至少排序</option>
                  <option>实付金额由少至多排序</option>
                  <option>VALUE由多至少排序</option>
                  <option>VALUE由少至多排序</option>
                  <option>天数由多至少排序</option>
                  <option>天数由少至多排序</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="itemCancelStatus">
                <Form.Control as="select">
                  <option>客户已取消订单</option>
                  <option>拒绝客户取消订单</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="itemProblemOrderStatus">
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
                controlId="itemSum"
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
              <Form.Group as={Col} sm={5} controlId="itemSendAddress">
                <Form.Control as="select">
                  <option>送货地址选择</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} sm={5} controlId="itemReceiveAddress">
                <Form.Control as="select">
                  <option>取货地址选择</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} sm={2} controlId="itemSubmitUpper">
                <button type="submit">&nbsp;&nbsp;确认&nbsp;&nbsp;</button>
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
        <div className="order-search-list">
          <Table striped bordered hover variant="secondary">
            <thead>
              <tr>
                <th>ITEM ID</th>
                <th>EMAIL</th>
                <th>LABEL 3</th>
                <th>当前状态</th>
                <th>价格</th>
              </tr>
            </thead>
            <tbody>
              {props.summaries.map((summary: OrderSummary) => {
                return (
                  <tr
                    key={summary.id}
                    onClick={() => {
                      showDetail(summary.id);
                    }}
                  >
                    <td>{summary.id}</td>
                    <td>{summary.email}</td>
                    <td>{summary.label3}</td>
                    <td>{summary.orderStatus}</td>
                    <td>{summary.price}</td>
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

export default OrdersSearch;
