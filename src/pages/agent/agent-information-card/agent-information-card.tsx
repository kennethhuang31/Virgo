import React from "react";
import "./agent-information-card.scss";
import {
  AppButton,
  BorderedContent,
  AppTextField,
  FormGroup,
  AppFormInput,
  AppFormDropdown,
  AppLocationGroupDropdown
} from "components";
import { Agent, DropdownItem } from "models";

interface AgentInformationCardPropsInterface {
  isEdit: boolean;
  agentData?: Agent;
  agentDetailForm?: FormGroup;
  displayEditError: boolean;
  agentStatusDropdown?: DropdownItem[];
  agentLevelSettingDropdown?: DropdownItem[];
  handleEdit?: () => void;
  handleSave?: () => void;
  children?: JSX.Element | JSX.Element[];
}

const AgentInformationCard: React.FC<AgentInformationCardPropsInterface> = (
  props: AgentInformationCardPropsInterface
) => {
  const getViewContent = () => {
    return (
      <>
        <div className="app-layout app-layout_between agent-info-header">
          <div className="app-layout agent-info-header-left">
            <div className="agent-info-header-left-item">
              <AppTextField text="代理ID : ">
                <span>{props.agentData?.displayId}</span>
              </AppTextField>
            </div>
            <div className="agent-info-header-left-item">
              <AppTextField text="代理状态 : ">
                <span>{props.agentData?.status}</span>
              </AppTextField>
            </div>
          </div>
          <div className="agent-info-header-right">
            <AppButton
              type="edit"
              disabled={false}
              btnType="button"
              onClick={props.handleEdit}
            />
          </div>
        </div>
        <BorderedContent all={true}>
          <div className="app-layout app-layout_between">
            <AppTextField text="店铺名称 : ">
              <span>{props.agentData?.storeName}</span>
            </AppTextField>
            <AppTextField text="EMAIL : ">
              <span>{props.agentData?.email}</span>
            </AppTextField>
            <AppTextField text="前台电话 : ">
              <span>{props.agentData?.phone}</span>
            </AppTextField>
          </div>
          <div className="app-layout app-layout_between">
            <AppTextField text="联系人名字 : ">
              <span>{props.agentData?.contact.name}</span>
            </AppTextField>
            <AppTextField text="联系人电话 : ">
              <span>{props.agentData?.contact.phone}</span>
            </AppTextField>
            <AppTextField text="上线时间 : ">
              <span>{props.agentData?.onlineTime}</span>
            </AppTextField>
          </div>
          <div className="app-layout app-layout_between">
            <AppTextField text="代理级别 : ">
              <span>
                {props.agentData?.agentLevel === undefined
                  ? "未选取"
                  : props.agentData?.agentLevel.name}
              </span>
            </AppTextField>
            <AppTextField text="所属区域 : ">
              <span>{props.agentData?.region.name}</span>
            </AppTextField>
          </div>
          <div>{props.children}</div>
        </BorderedContent>
      </>
    );
  };

  const getEditContent = () => {
    const agentStoreFormGroup: FormGroup =
      props.agentDetailForm?.controlElements[0];
    const agentContactFormGroup: FormGroup =
      props.agentDetailForm?.controlElements[1];
    const agentLocationFormGroup: FormGroup =
      props.agentDetailForm?.controlElements[2];

    const statusDropdownData: DropdownItem[] =
      props.agentStatusDropdown !== undefined ? props.agentStatusDropdown : [];
    const levelSettingDropdownData: DropdownItem[] =
      props.agentLevelSettingDropdown !== undefined
        ? props.agentLevelSettingDropdown
        : [];

    const statusValue = agentStoreFormGroup.controlElements[0].value;
    const selectedStatusDropdown = statusDropdownData.find(
      x => x.value === statusValue
    );
    const levelSettingValue = agentStoreFormGroup.controlElements[5].valie;
    const selectedLevelDropdown = levelSettingDropdownData.find(
      x => x.value === levelSettingValue
    );

    return (
      <>
        <div className="app-layout app-layout_between agent-info-header agent-info-header-edit">
          <div className="app-layout agent-info-header-left">
            <div className="agent-info-header-left-item">
              <AppTextField text="代理ID : ">
                <span>{props.agentData?.displayId}</span>
              </AppTextField>
            </div>
            <div className="agent-info-header-left-item">
              <AppTextField text="代理状态 : ">
                <AppFormDropdown
                  id="edit-status"
                  placeholder="代理状态"
                  selected={selectedStatusDropdown}
                  data={statusDropdownData}
                  sort={false}
                  disabled={false}
                  required={true}
                  formControl={agentStoreFormGroup.controlElements[0]}
                  displayError={false}
                  errorMessage="代理状态不能为空"
                />
              </AppTextField>
            </div>
          </div>
        </div>
        <BorderedContent up={true}>
          <div className="app-layout app-layout_between">
            <AppTextField text="店铺名称 : ">
              <AppFormInput
                id="edit-name"
                type="text"
                required={true}
                placeholder="店铺名称"
                formControl={agentStoreFormGroup.controlElements[1]}
                displayError={props.displayEditError}
                errorMessage="店铺名称不能为空"
              />
            </AppTextField>
            <AppTextField text="EMAIL : ">
              <AppFormInput
                id="edit-email"
                type="text"
                required={true}
                placeholder="EMAIL"
                formControl={agentStoreFormGroup.controlElements[2]}
                displayError={props.displayEditError}
                errorMessage="店铺邮箱不能为空"
              />
            </AppTextField>
            <AppTextField text="前台电话 : ">
              <AppFormInput
                id="edit-phone"
                type="text"
                required={true}
                placeholder="前台电话"
                formControl={agentStoreFormGroup.controlElements[3]}
                displayError={props.displayEditError}
                errorMessage="前台电话不能为空"
              />
            </AppTextField>
          </div>
          <div className="app-layout app-layout_between">
            <AppTextField text="联系人名字 : ">
              <AppFormInput
                id="edit-contact-name"
                type="text"
                required={true}
                placeholder="联系人名字"
                formControl={agentContactFormGroup.controlElements[0]}
                displayError={props.displayEditError}
                errorMessage="联系人名字不能为空"
              />
            </AppTextField>
            <AppTextField text="联系人电话 : ">
              <AppFormInput
                id="edit-contact-phone"
                type="text"
                required={true}
                placeholder="联系人电话"
                formControl={agentContactFormGroup.controlElements[1]}
                displayError={props.displayEditError}
                errorMessage="联系人电话不能为空"
              />
            </AppTextField>
            <AppTextField text="上线时间 : ">
              <AppFormInput
                id="edit-online"
                type="text"
                required={false}
                placeholder="上线时间"
                formControl={agentStoreFormGroup.controlElements[4]}
                displayError={props.displayEditError}
              />
            </AppTextField>
          </div>
          <div className="app-layout app-layout_between">
            <AppTextField text="代理级别 : ">
              <AppFormDropdown
                id="edit-level"
                placeholder="代理级别"
                selected={selectedLevelDropdown}
                data={levelSettingDropdownData}
                sort={false}
                disabled={false}
                required={true}
                formControl={agentStoreFormGroup.controlElements[5]}
                displayError={props.displayEditError}
                errorMessage="代理等级不能为空"
              />
            </AppTextField>
          </div>
          <div className="app-layout app-layout_between">
            <AppTextField text="银行账号 : ">
              <AppFormInput
                id="edit-bank"
                type="text"
                required={true}
                placeholder="银行账号"
                formControl={agentStoreFormGroup.controlElements[6]}
                displayError={props.displayEditError}
                errorMessage="银行账号不能为空"
              />
            </AppTextField>
          </div>
          <div className="app-layout app-layout_between">
            <AppLocationGroupDropdown
              required={true}
              locationGroup={agentLocationFormGroup}
              region={props.agentData?.region}
              displayError={props.displayEditError}
            />
          </div>
          <div>{props.children}</div>
        </BorderedContent>
      </>
    );
  };

  return (
    <>
      <div className="agent-info">
        {props.isEdit && getEditContent()}
        {!props.isEdit && getViewContent()}
      </div>
    </>
  );
};

export default AgentInformationCard;
