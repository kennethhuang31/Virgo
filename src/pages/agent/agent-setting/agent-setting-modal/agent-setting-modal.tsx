import React, { useState, useEffect } from "react";
import "./agent-setting-modal.scss";
import {
  FormControl,
  FormGroup,
  AppModal,
  AppButton,
  AppTextField,
  AppFormInput
} from "components";

interface AgentSettingModalPropsInterface {
  display: boolean;
  initialEditForm: FormGroup;
  displayEditFormError: boolean;
  handleClose: (data?: any) => any;
  handleSave: (data?: any) => any;
}

const AgentSettingModal: React.FC<AgentSettingModalPropsInterface> = (
  props: AgentSettingModalPropsInterface
) => {
  const content = () => {
    return (
      <div className="level-setting-modal-create">
        <AppTextField text="代理级别 : ">
          <AppFormInput
            id="form-level-name"
            type="text"
            required={true}
            displayError={props.displayEditFormError}
            placeholder="代理级别"
            formControl={props.initialEditForm.controlElements[0]}
            errorMessage="代理级别名称不能为空"
          />
        </AppTextField>
        <AppTextField text="送货提成 % : ">
          <AppFormInput
            id="form-level-deliver"
            type="text"
            required={true}
            displayError={props.displayEditFormError}
            placeholder="送货提成"
            formControl={props.initialEditForm.controlElements[1]}
            errorMessage="提成不能小于0"
          />
        </AppTextField>
        <AppTextField text="取货提成 % : ">
          <AppFormInput
            id="form-level-pickup"
            type="text"
            required={true}
            displayError={props.displayEditFormError}
            placeholder="取货提成"
            formControl={props.initialEditForm.controlElements[2]}
            errorMessage="提成不能小于0"
          />
        </AppTextField>
      </div>
    );
  };

  const footer = () => {
    return (
      <div className="app-layout button-group_right">
        <AppButton
          type="cancel"
          disabled={false}
          btnType="button"
          onClick={props.handleClose}
        />
        <AppButton
          type="save"
          disabled={false}
          btnType="button"
          onClick={props.handleSave}
        />
      </div>
    );
  };
  return (
    <AppModal
      title="修改代理级别"
      show={props.display}
      isStatic={true}
      showHeaderClose={false}
      handleHide={props.handleClose}
      content={content()}
      footer={footer()}
      modalClass="level-setting-modal"
    />
  );
};

export default AgentSettingModal;
