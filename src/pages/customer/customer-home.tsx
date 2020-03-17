import React, { useEffect } from "react";
import "./customer-home.scss";
import { connect } from "react-redux";
import { getCustomerSummary } from "app-redux";
import { CustomerSummary } from "models";
import CustomerSearch from "./customer-search/customer-search";

interface CustomerPropsInterface {
  summaries: CustomerSummary[];
  getCustomerSummary: any;
}

const CustomerHome: React.FC<CustomerPropsInterface> = (
  props: CustomerPropsInterface
) => {
  useEffect(() => {
    props.getCustomerSummary();
  }, []);

  return (
    <>
      <CustomerSearch summaries={props.summaries} />
    </>
  );
};

const mapDispatchToProps = {
  getCustomerSummary
};

const mapStateToProps = (state: any) => {
  return {
    summaries: state.customerReducer.customerSummaryReducer.summaries
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
