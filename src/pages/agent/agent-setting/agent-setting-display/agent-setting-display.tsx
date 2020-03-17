import React from "react";
import "./agent-setting-display.scss";
import { AgentLevel } from "models";
import {
  BorderedContent,
  AppTitledPage,
  FormGroup,
  AppButton,
  AppTextField,
  AppFormInput
} from "components";

interface AgentSettingDisplayPropsInterface {
  initialCreateForm: FormGroup;
  displayFormError: boolean;
  agentLevelSettings: AgentLevel[];
  handleCreate: () => void;
  handleDelete?: (data: AgentLevel) => void;
  handleModalClose?: () => void;
  displayEditModal: (data: AgentLevel) => void;
  displayDeleteConfirmModal: (data: AgentLevel) => void;
}

const AgentSettingDisplay: React.FC<AgentSettingDisplayPropsInterface> = (
  props: AgentSettingDisplayPropsInterface
) => {
  return (
    <AppTitledPage title="设置代理级别">
      <div className="level-setting">
        <BorderedContent down={true}>
          <h2>添加代理级别</h2>
          <div className="app-layout app-layout_horizontal level-setting-create">
            <div className="level-setting-form">
              <AppTextField text="代理级别 : ">
                <AppFormInput
                  id="form-level-name"
                  type="text"
                  required={true}
                  displayError={props.displayFormError}
                  placeholder="代理级别"
                  formControl={props.initialCreateForm.controlElements[0]}
                  errorMessage="代理级别名称不能为空"
                />
              </AppTextField>
              <AppTextField text="送货提成 % : ">
                <AppFormInput
                  id="form-level-deliver"
                  type="text"
                  required={true}
                  displayError={props.displayFormError}
                  placeholder="送货提成"
                  formControl={props.initialCreateForm.controlElements[1]}
                  errorMessage="提成不能小于0"
                />
              </AppTextField>
              <AppTextField text="取货提成 % : ">
                <AppFormInput
                  id="form-level-pickup"
                  type="text"
                  required={true}
                  displayError={props.displayFormError}
                  placeholder="取货提成"
                  formControl={props.initialCreateForm.controlElements[2]}
                  errorMessage="提成不能小于0"
                />
              </AppTextField>
            </div>
            <AppButton
              type="add"
              disabled={false}
              btnType="button"
              text="确定添加"
              onClick={props.handleCreate}
            />
          </div>
        </BorderedContent>
        <div className="level-setting-list">
          {props.agentLevelSettings.map((level: AgentLevel, index: number) => {
            return (
              <div
                key={index}
                className="app-layout app-layout_between level-setting-list-item"
              >
                <div className="app-layout">
                  <div className="app-layout level-setting-list-item-label">
                    <label htmlFor="level">代理级别 : </label>
                    <div id="level">{level.name}</div>
                  </div>
                  <div className="app-layout level-setting-list-item-label">
                    <label htmlFor="level">送货提成 : </label>
                    <div id="level">{level.deliverCommission} %</div>
                  </div>
                  <div className="app-layout level-setting-list-item-label">
                    <label htmlFor="level">取货提成 : </label>
                    <div id="level">{level.pickupCommission} %</div>
                  </div>
                </div>
                <div className="app-layout button-group_right">
                  <AppButton
                    type="delete"
                    disabled={false}
                    btnType="button"
                    onClick={() => props.displayDeleteConfirmModal(level)}
                  />
                  <AppButton
                    type="edit"
                    disabled={false}
                    btnType="button"
                    onClick={() => props.displayEditModal(level)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppTitledPage>
  );
};

export default AgentSettingDisplay;
