import React from "react";
import "./agent-edit-modal.scss";
import { DropdownItem, Agent, AgentBriefInfo } from "models";
import {
  FormGroup,
  AppModal,
  AppButton,
  AppFormDropdown,
  AppTextField,
  AppFormInput
} from "components";
import AgentInformationCard from "../../agent-information-card/agent-information-card";

interface AgentEditModalPropsInterface {
  editForm: FormGroup;
  agentBrief: AgentBriefInfo;
  agentData: Agent;
  display: boolean;
  displayFormError: boolean;
  agentStatusDropdownData?: DropdownItem[];
  agentLevelSettingDropdownData?: DropdownItem[];
  handleClose: () => void;
  handleSave: () => void;
}

const AgentEditModal: React.FC<AgentEditModalPropsInterface> = (
  props: AgentEditModalPropsInterface
) => {
  const getModalTitle = (): string => {
    const displayId = props.agentBrief.displayId;
    return `编辑代理 ${displayId}`;
  };

  const content = () => {
    return (
      <div>
        <AgentInformationCard
          isEdit={true}
          agentData={props.agentData}
          agentDetailForm={props.editForm}
          displayEditError={props.displayFormError}
          agentStatusDropdown={props.agentStatusDropdownData}
          agentLevelSettingDropdown={props.agentLevelSettingDropdownData}
          handleSave={props.handleSave}
        />
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
      title={getModalTitle()}
      show={props.display}
      isStatic={true}
      showHeaderClose={false}
      handleHide={props.handleClose}
      content={content()}
      footer={footer()}
      modalClass="agent-edit-modal"
    />
  );
};

export default AgentEditModal;
