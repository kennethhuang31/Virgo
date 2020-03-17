import React, { useEffect } from "react";
import "./orders-home.scss";
import { connect } from "react-redux";
import { getOrderSummary } from "app-redux";
import { OrderSummary } from "models";
import OrdersSearch from "./orders-search/orders-search";

interface OrderPropsInterface {
  summaries: OrderSummary[];
  getOrderSummary: any;
}

const OrdersHome: React.FC<OrderPropsInterface> = (
  props: OrderPropsInterface
) => {
  useEffect(() => {
    props.getOrderSummary();
  }, []);

  return (
    <>
      <OrdersSearch summaries={props.summaries} />
    </>
  );
};

const mapDispatchToProps = {
  getOrderSummary
};

const mapStateToProps = (state: any) => {
  return {
    summaries: state.orderReducer.orderSummaryReducer.summaries
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersHome);
