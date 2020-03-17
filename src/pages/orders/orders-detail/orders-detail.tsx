import React, { useEffect, useState } from "react";
import "./orders-detail.scss";
import { Col, Row, Table } from "react-bootstrap";
import { OrderCancelStatus, OrderDetail, PickAndDeliverInfo } from "models";
import { getOrderDetail } from "app-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { AppButton } from "components";
import OrdersCancel from "./orders-cancel/orders-cancel";

interface OrderDetailPropsInterface {
  location: any;
  detail: OrderDetail;
  getOrderDetail: any;
}

const OrdersDetail: React.FC<OrderDetailPropsInterface> = (
  props: OrderDetailPropsInterface
) => {
  const res = props.location.state;
  const history = useHistory();

  const [orderCancel, updateOrderCancel] = useState(false);

  const openModal = () => {
    updateOrderCancel(true);
  };

  const closeModal = () => {
    updateOrderCancel(false);
  };

  const goBack = () => {
    history.push("/orders");
  };

  useEffect(() => {
    res ? props.getOrderDetail(res) : goBack();
  }, []);

  const detail = props.detail;
  return (
    <React.Fragment>
      <OrdersCancel
        id={detail.id}
        show={orderCancel}
        handleClose={closeModal}
      />
      <Row className="font-weight-bold">
        <Col md={1}>
          <AppButton
            type="add"
            disabled={false}
            btnType="button"
            text="返回"
            isBlock={false}
            onClick={goBack}
          />
        </Col>
        <Col md={3}>
          ITEM ID: <span className="font-weight-light">{detail.id}</span>
        </Col>
        <Col md={3}>
          二维码 ID:{" "}
          <span className="font-weight-light">{detail.scanCodeId}</span>
        </Col>
        <Col md={3}>
          ORDER ID: <span className="font-weight-light">{detail.orderId}</span>
        </Col>
        <Col md={2}>
          <AppButton
            type={(() => {
              return detail.orderCancelStatus === OrderCancelStatus.Normal
                ? "cancel"
                : "delete";
            })()}
            disabled={(() => {
              return detail.orderCancelStatus !== OrderCancelStatus.Applied;
            })()}
            btnType="button"
            text={(() => {
              return detail.orderCancelStatus === OrderCancelStatus.Canceled
                ? "已取消"
                : "客户申请取消";
            })()}
            isBlock={false}
            onClick={openModal}
          />
        </Col>
      </Row>
      <div className="content-box mt-3 p-4">
        <Row className="mt-2">
          <Col>客户名称: {detail.customerName}</Col>
          <Col>Email: {detail.email}</Col>
          <Col>电话: {detail.phone}</Col>
        </Row>
        <div className="mt-3">物品类型: {detail.itemCategory}</div>
        <div className="mt-3">SERVICE: {detail.service}</div>
        <Row className="mt-2">
          <Col>VALUE: {detail.value}</Col>
          <Col>DAYS: {detail.days}</Col>
          <Col>BRAND: {detail.brand}</Col>
        </Row>
        <div className="mt-3 font-weight-bold mb-2">物品状态：</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>C-A</th>
              <th>A1</th>
              <th>A-F</th>
              <th>F</th>
              <th>F-A</th>
              <th>A2</th>
              <th>C2</th>
              <th>WP</th>
              <th>ITW</th>
              <th>FR</th>
              <th>FINI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detail.orderStatus.CA}</td>
              <td>{detail.orderStatus.A1}</td>
              <td>{detail.orderStatus.AF}</td>
              <td>{detail.orderStatus.F}</td>
              <td>{detail.orderStatus.FA}</td>
              <td>{detail.orderStatus.A2}</td>
              <td>{detail.orderStatus.C2}</td>
              <td>{detail.orderStatus.WP}</td>
              <td>{detail.orderStatus.ITW}</td>
              <td>{detail.orderStatus.FR}</td>
              <td>{detail.orderStatus.FINI}</td>
            </tr>
          </tbody>
        </Table>
        <div className="font-weight-bold mb-2">送取货信息:</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>送件地址</th>
              <th>取件地址</th>
              <th>取件时间</th>
              <th>创建时间</th>
            </tr>
          </thead>
          <tbody>
            {detail.pickAndDeliverInfo.map(
              (item: PickAndDeliverInfo, id: number) => {
                return (
                  <tr key={id}>
                    <td>{item.deliver}</td>
                    <td>{item.pickup}</td>
                    <td>{item.time}</td>
                    <td>{item.createTime}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
        <div className="font-weight-bold mb-2">MONEY:</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>总金额</th>
              <th>钱包扣款</th>
              <th>折扣</th>
              <th>实付金额</th>
              <th>支付骑手</th>
              <th>支付代理</th>
              <th>支付工厂</th>
              <th>退款</th>
              <th>剩余金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detail.money.total}</td>
              <td>{detail.money.walletMinus}</td>
              <td>{detail.money.discount}</td>
              <td>{detail.money.payment}</td>
              <td>{detail.money.payForCourier}</td>
              <td>{detail.money.payForAgent}</td>
              <td>{detail.money.payForFactory}</td>
              <td>{detail.money.refund}</td>
              <td>{detail.money.redundant}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  getOrderDetail
};

const mapStateToProps = (state: any) => {
  return {
    detail: state.orderReducer.orderDetailReducer.detail
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersDetail);
