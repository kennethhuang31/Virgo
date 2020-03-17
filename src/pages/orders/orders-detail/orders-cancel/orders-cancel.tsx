import React, { useState } from "react";
import { connect } from "react-redux";
import "./orders-cancel.scss";
import {
  FormGroup,
  FormControl,
  AppModal,
  AppButton,
  AppFormTextarea
} from "components";
import { orderService } from "services";
import { updateHttpRequestStatus } from "app-redux";

interface OrdersCancelPropsInterface {
  id: string;
  show: boolean;
  handleClose: () => any | void;
  updateHttpRequestStatus: any;
}

const OrdersCancel: React.FC<OrdersCancelPropsInterface> = (
  props: OrdersCancelPropsInterface
) => {
  const [displayFormError, updateFormErrorDisplay] = useState(false);

  const formGroup: FormGroup = new FormGroup("data", [
    new FormControl("comment", "", {
      required: true,
      validator: (data: any) => {
        return data.trim() !== "";
      }
    })
  ]);

  const handleCancel = () => {
    const formIsValid = formGroup.validate();
    if (!formIsValid) {
      updateFormErrorDisplay(true);
    } else {
      updateFormErrorDisplay(false);
      const formValue = formGroup.getGroupValue();
      props.updateHttpRequestStatus(true);
      orderService.cancelOrder(props.id, formValue.comment).then(response => {
        console.log(response);
        props.updateHttpRequestStatus(false);
        props.handleClose();
        window.location.reload();
      });
    }
  };

  const bodyContent = () => {
    return (
      <div className="cancel-content">
        <AppFormTextarea
          id="order-cancel-comment"
          required={true}
          placeholder="备注信息..."
          formControl={formGroup.controlElements[0]}
          displayError={displayFormError}
          errorMessage="备注信息不能为空"
          row={7}
        />
      </div>
    );
  };

  const footerContent = () => {
    return (
      <div className="app-layout app-layout-horizontal button-group_right">
        <AppButton
          type="cancel"
          disabled={false}
          btnType="button"
          onClick={() => {
            updateFormErrorDisplay(false);
            props.handleClose();
          }}
        />
        <AppButton
          type="save"
          disabled={false}
          btnType="button"
          onClick={handleCancel}
        />
      </div>
    );
  };

  return (
    <AppModal
      modalClass="order-cancel"
      show={props.show}
      title="取消订单"
      isStatic={true}
      showHeaderClose={false}
      handleHide={() => {
        console.log("close");
      }}
      content={bodyContent()}
      footer={footerContent()}
    />
  );
};

const mapDispatchToProps = {
  updateHttpRequestStatus
};

export default connect(null, mapDispatchToProps)(OrdersCancel);
