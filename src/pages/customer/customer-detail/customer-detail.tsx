import React, { useEffect, useState } from "react";
import "./customer-detail.scss";
import { Col, Row, Table } from "react-bootstrap";
import {
  CustomerDetailModel,
  CustomerOrder,
  UserContact,
  WalletHistories
} from "models";
import { getCustomerDetail } from "app-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { AppButton } from "components";
import CustomerTopup from "./customer-topup/customer-topup";
import CustomerDeduct from "./customer-deduct/customer-deduct";

interface CustomerDetailPropsInterface {
  location: any;
  detail: CustomerDetailModel;
  getCustomerDetail: any;
}

const CustomerDetail: React.FC<CustomerDetailPropsInterface> = (
  props: CustomerDetailPropsInterface
) => {
  const res = props.location.state;
  const history = useHistory();

  const [topupModalCancel, updateTopupModalCancel] = useState(false);

  const topUpWallet = () => {
    updateTopupModalCancel(true);
  };

  const closeTopupModal = () => {
    updateTopupModalCancel(false);
  };

  const [deductModalCancel, updateDeductModalCancel] = useState(false);

  const deductWallet = () => {
    updateDeductModalCancel(true);
  };

  const closeDeductModal = () => {
    updateDeductModalCancel(false);
  };

  const goBack = () => {
    history.push("/customer");
  };

  useEffect(() => {
    res ? props.getCustomerDetail(res) : goBack();
  }, []);

  const detail = props.detail;
  return (
    <React.Fragment>
      <CustomerTopup
        id={detail.userId}
        show={topupModalCancel}
        handleClose={closeTopupModal}
      />
      <CustomerDeduct
        id={detail.userId}
        show={deductModalCancel}
        handleClose={closeDeductModal}
      />
      <AppButton
        type="add"
        disabled={false}
        btnType="button"
        text="返回"
        onClick={goBack}
      />
      <div className="content-box mt-3 p-4">
        <Row className="mt-2">
          <Col>客户名称: {detail.name}</Col>
          <Col>Email: {detail.email}</Col>
          <Col>注册时间: {detail.registerDate}</Col>
        </Row>
        <div className="mt-3">联系人信息: </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>用户名</th>
              <th>电话号码</th>
              <th>地址</th>
              <th>是否默认</th>
            </tr>
          </thead>
          <tbody>
            {detail.userContact.map((item: UserContact, index: number) => {
              return (
                <tr key={index}>
                  <td>{item.userName}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.isPrimary ? "默认" : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="mt-3 font-weight-bold mb-2">下单历史记录: </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>时间</th>
              <th>ORDER ID</th>
              <th>ITEM总数</th>
              <th>总支付金额 </th>
              <th>是否曾出现过问题</th>
              <th>是否曾出现取消订单</th>
            </tr>
          </thead>
          <tbody>
            {detail.order.map((item: CustomerOrder, index: number) => {
              return (
                <tr key={index}>
                  <td>{item.createdDate}</td>
                  <td>{item.orderId}</td>
                  <td> </td>
                  <td>{item.itemPrice}</td>
                  <td> </td>
                  <td>{item.cancaledItem}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="font-weight-bold mb-5 mt-5">
          <div className="app-layout app-layout_horizontal ">
            钱包流水:&nbsp;&nbsp;
            <AppButton
              type="edit"
              disabled={false}
              btnType="button"
              text="点击充值"
              onClick={topUpWallet}
            />
            &nbsp;&nbsp;
            <AppButton
              type="edit"
              disabled={false}
              btnType="button"
              text="点击扣款"
              onClick={deductWallet}
            />
            &nbsp;&nbsp; 总金额: {detail.wallet}
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>时间</th>
              <th>充值金额</th>
              <th>赠送金额</th>
              <th>退款金额</th>
              <th>剩余余额</th>
            </tr>
          </thead>
          <tbody>
            {detail.walletHistories.map(
              (item: WalletHistories, index: number) => {
                return (
                  <tr key={index}>
                    <td>{item.createdDate}</td>
                    <td>{item.cost}</td>
                    <td> </td>
                    <td> </td>
                    <td>{item.closingBalance}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  getCustomerDetail
};

const mapStateToProps = (state: any) => {
  return {
    detail: state.customerReducer.customerDetailReducer.detail
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
