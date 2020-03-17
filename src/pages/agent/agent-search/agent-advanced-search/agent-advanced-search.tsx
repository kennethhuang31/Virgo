import React from "react";
import "./agent-advanced-search.scss";
import {
  FormGroup,
  FormControl,
  AppModal,
  AppFormInput,
  AppTextField,
  AppButton,
  BorderedContent,
  AppFormDropdown
} from "components";
import { DropdownItem, AgentStatus } from "models";
import {} from "app-redux";

interface AdvancedSearchPropsInterface {
  advancedSearchGroup?: FormGroup;
  display: boolean;
  handleClose: () => void;
}

interface AdvancedSearchModalPropsInterface {
  advancedSearchGroup?: FormGroup;
  display: boolean;
  handleClose: () => void;
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalPropsInterface> = (
  props: AdvancedSearchModalPropsInterface
) => {
  const content = () => {
    return (
      <div className="advanced-modal-content">
        <BorderedContent down={true}>
          <div></div>
          <div>a</div>
          <div>b</div>
          <div className="advanced-modal-content-button button-group_right">
            <AppButton
              type="cancel"
              disabled={false}
              btnType="button"
              text="清除"
            />
            <AppButton
              type="confirm"
              disabled={false}
              btnType="button"
              text="保存"
            />
          </div>
        </BorderedContent>
        <div className="advanced-filter">asdasdads</div>
      </div>
    );
  };
  const footer = () => {
    return (
      <div className="button-group_right">
        <AppButton type="search" disabled={false} btnType="button" />
      </div>
    );
  };

  return (
    <AppModal
      title="高级查询"
      show={props.display}
      isStatic={false}
      showHeaderClose={true}
      handleHide={props.handleClose}
      content={content()}
      footer={footer()}
      modalClass="advanced-modal"
    />
  );
};

const AgentAdvancedSearch: React.FC = () => {
  const createAgentStatusDropdownData = (): DropdownItem[] => {
    return [
      new DropdownItem(1, "已上线", AgentStatus.Online.toString()),
      new DropdownItem(2, "未上线", AgentStatus.Offline.toString()),
      new DropdownItem(3, "合作终止", AgentStatus.CooperateEnded.toString())
    ];
  };

  console.warn(createAgentStatusDropdownData());
  return <div></div>;
};

export default AgentAdvancedSearch;
