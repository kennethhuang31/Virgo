import React, { useState } from "react";
import { connect } from "react-redux";
import "./customer-topup.scss";
import {
  FormGroup,
  FormControl,
  AppModal,
  AppButton,
  AppFormTextarea,
  AppFormInput,
  AppTextField
} from "components";
import { customerService } from "services";
import { updateHttpRequestStatus } from "app-redux";

interface CustomerTopupPropsInterface {
  id: number;
  show: boolean;
  handleClose: () => any | void;
  updateHttpRequestStatus: any;
}

const CustomerTopup: React.FC<CustomerTopupPropsInterface> = (
  props: CustomerTopupPropsInterface
) => {
  const [displayFormError, updateFormErrorDisplay] = useState(false);

  const formGroup: FormGroup = new FormGroup("data", [
    new FormControl("amount", "", {
      required: true,
      validator: (data: any) => {
        return data.trim() !== "";
      }
    }),
    new FormControl("comment", "", {
      required: true,
      validator: (data: any) => {
        return data.trim() !== "";
      }
    })
  ]);

  const handleTopup = () => {
    const formIsValid = formGroup.validate();
    if (!formIsValid) {
      updateFormErrorDisplay(true);
    } else {
      updateFormErrorDisplay(false);
      const formValue = formGroup.getGroupValue();
      props.updateHttpRequestStatus(true);
      customerService
        .topUpWallet(props.id, formValue.amount, formValue.comment)
        .then(response => {
          console.log(response);
          props.updateHttpRequestStatus(false);
          props.handleClose();
          window.location.reload();
        });
    }
  };

  const bodyContent = () => {
    return (
      <div className="topup-content">
        <AppTextField text="金额:">
          <AppFormInput
            id="customer-topup-amount"
            type="text"
            placeholder="请输入金额数值..."
            required={true}
            formControl={formGroup.controlElements[0]}
            displayError={displayFormError}
            errorMessage="金额不能为空"
          />
        </AppTextField>
        <AppTextField text="备注信息:">
          <AppFormTextarea
            id="customer-topup-comment"
            required={true}
            placeholder="请输入备注信息..."
            formControl={formGroup.controlElements[1]}
            displayError={displayFormError}
            errorMessage="备注信息不能为空"
            row={3}
            cols={47}
          />
        </AppTextField>
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
          onClick={handleTopup}
        />
      </div>
    );
  };

  return (
    <AppModal
      modalClass="customer-topup"
      show={props.show}
      title="充值"
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

export default connect(null, mapDispatchToProps)(CustomerTopup);
