import React from "react";
import "./agent-create-display.scss";
import {
  FormGroup,
  AppTitledPage,
  AppButton,
  AppFormInput,
  AppTextField,
  AppLocationGroupDropdown,
  AppFormDropdown,
  BorderedContent,
  AppFileUploader
} from "components";
import { DropdownItem } from "models";

interface AgentCreateDisplayPropsInterface {
  displayError: boolean;
  agentLevelDropdownData: DropdownItem[];
  storeFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  extraCreateError: string[];
  handleSave: () => void;
  handleReset: () => void;
  handleFileUpload: (file: File) => void;
}

const AgentCreateDisplay: React.FC<AgentCreateDisplayPropsInterface> = (
  props: AgentCreateDisplayPropsInterface
) => {
  return (
    <>
      <AppTitledPage title="创建代理">
        <div className="agent-create-form">
          <span className="agent-create-form-section">店铺信息</span>
          <BorderedContent all={true}>
            <div className="app-layout app-layout_between">
              <AppTextField text="店铺名称 : ">
                <AppFormInput
                  id="create-name"
                  type="text"
                  required={true}
                  placeholder="店铺名称"
                  formControl={props.storeFormGroup.controlElements[0]}
                  displayError={props.displayError}
                  errorMessage="店铺名称不能为空"
                />
              </AppTextField>
              <AppTextField text="店铺邮箱 : ">
                <AppFormInput
                  id="create-email"
                  type="text"
                  required={true}
                  placeholder="EMAIL"
                  formControl={props.storeFormGroup.controlElements[1]}
                  displayError={props.displayError}
                  errorMessage="店铺邮箱不能为空"
                />
              </AppTextField>
              <AppTextField text="店铺地址 : ">
                <AppFormInput
                  id="create-address"
                  type="text"
                  required={true}
                  placeholder="店铺地址"
                  formControl={props.storeFormGroup.controlElements[2]}
                  displayError={props.displayError}
                  errorMessage="店铺地址不能为空"
                />
              </AppTextField>
            </div>
            <div className="app-layout app-layout_between">
              <AppTextField text="前台电话 : ">
                <AppFormInput
                  id="create-phone"
                  type="text"
                  required={true}
                  placeholder="前台电话"
                  formControl={props.storeFormGroup.controlElements[3]}
                  displayError={props.displayError}
                  errorMessage="前台电话不能为空"
                />
              </AppTextField>
              <AppTextField text="上线时间 : ">
                <AppFormInput
                  id="create-onlineTime"
                  type="text"
                  required={false}
                  placeholder="上线时间"
                  formControl={props.storeFormGroup.controlElements[4]}
                  displayError={props.displayError}
                />
              </AppTextField>
              <AppTextField text="代理级别 : ">
                <AppFormDropdown
                  id="create-level"
                  placeholder="代理级别"
                  data={props.agentLevelDropdownData}
                  sort={false}
                  disabled={false}
                  required={true}
                  formControl={props.storeFormGroup.controlElements[5]}
                  displayError={props.displayError}
                  errorMessage="代理等级不能为空"
                />
              </AppTextField>
            </div>
            <div className="app-layout app-layout_between">
              <AppTextField text="账户信息 : ">
                <AppFormInput
                  id="create-bank"
                  type="text"
                  required={true}
                  placeholder="账户信息"
                  formControl={props.storeFormGroup.controlElements[6]}
                  displayError={props.displayError}
                  errorMessage="账户信息不能为空"
                />
              </AppTextField>
            </div>
          </BorderedContent>
          <span className="agent-create-form-section">店铺区域</span>
          <BorderedContent all={true}>
            <div>
              <AppLocationGroupDropdown
                required={true}
                locationGroup={props.locationFormGroup}
                displayError={props.displayError}
                groupStyle="app-layout_center"
              />
            </div>
          </BorderedContent>
          <span className="agent-create-form-section">联系人及账号</span>
          <BorderedContent all={true}>
            <div className="app-layout app-layout_center">
              <AppTextField text="联系人名字 : ">
                <AppFormInput
                  id="create-contact-name"
                  type="text"
                  required={true}
                  placeholder="联系人名字"
                  formControl={props.contactFormGroup.controlElements[0]}
                  displayError={props.displayError}
                  errorMessage="联系人名字不能为空"
                />
              </AppTextField>
              <AppTextField text="联系人名字电话 : ">
                <AppFormInput
                  id="create-contact-phone"
                  type="text"
                  required={true}
                  placeholder="联系人名字电话"
                  formControl={props.contactFormGroup.controlElements[1]}
                  displayError={props.displayError}
                  errorMessage="联系人名字电话不能为空"
                />
              </AppTextField>
            </div>
            <div className="app-layout app-layout_center">
              <AppTextField text="密码 : ">
                <AppFormInput
                  id="create-contact-password"
                  type="password"
                  required={true}
                  placeholder="密码"
                  formControl={props.contactFormGroup.controlElements[2]}
                  displayError={props.displayError}
                  errorMessage="密码不能为空"
                />
              </AppTextField>
              <AppTextField text="确认密码 : ">
                <AppFormInput
                  id="create-contact-confirmPassword"
                  type="password"
                  required={true}
                  placeholder="确认密码"
                  formControl={props.contactFormGroup.controlElements[3]}
                  displayError={props.displayError}
                  errorMessage="确认密码不能为空"
                />
              </AppTextField>
            </div>
            <div>
              {props.extraCreateError.indexOf("password-unmatch") > -1 && (
                <span className="error">密码不匹配</span>
              )}
            </div>
          </BorderedContent>
          <span className="agent-create-form-section">代理文件</span>
          <BorderedContent all={true}>
            <div>
              <AppTextField text="合同文件 :" fieldStyle="file-uploader">
                <AppFileUploader
                  text="上传文件"
                  handleFileUpload={props.handleFileUpload}
                />
              </AppTextField>
              <div>
                {props.extraCreateError.indexOf("no-file") > -1 && (
                  <span className="error">请选择文件</span>
                )}
              </div>
            </div>
          </BorderedContent>
        </div>
        <div className="app-layout app-layout_center create-button">
          <AppButton
            type="cancel"
            disabled={false}
            btnType="button"
            text="重置"
            onClick={props.handleReset}
          />
          <AppButton
            type="confirm"
            disabled={false}
            btnType="button"
            text="创建代理"
            onClick={props.handleSave}
          />
        </div>
      </AppTitledPage>
    </>
  );
};

export default AgentCreateDisplay;
