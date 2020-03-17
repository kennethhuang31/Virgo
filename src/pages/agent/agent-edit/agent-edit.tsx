import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./agent-edit.scss";
import {
  BaseActionInterface,
  displayAgentEditModal,
  getAgentDetail,
  getAgentLevelSettings,
  updateAgentDetail
} from "app-redux";
import {
  Agent,
  AgentBriefInfo,
  DropdownItem,
  AgentLevel,
  City,
  Country,
  Region
} from "models";
import { FormGroup, FormControl } from "components";
import { dropdownHelper } from "services/helper";
import AgentEditModal from "./agent-edit-modal/agent-edit-modal";

// TODO: use correct model for agent detail

interface AgentEditPropsInterface {
  selectedAgentBrief: AgentBriefInfo;
  selectedAgentDetail: Agent;
  displayModal: boolean;
  agentStatusDropdownData: DropdownItem[];
  agentLevelSettingDropdownData: DropdownItem[];
  agentLevelSettings: AgentLevel[];
  regionList: Region[];
  getAgentDetail: (agentId: number) => (dispatch: any) => any;
  getAgentLevelSettings: () => (dispatch: any) => any;
  updateAgentDetail: (
    agentId: number,
    agentDetail: Agent
  ) => (dispatch: any) => any;
  displayAgentEditModal: (display: boolean) => BaseActionInterface;
}

const AgentEdit: React.FC<AgentEditPropsInterface> = (
  props: AgentEditPropsInterface
) => {
  const buildAgentEditForm = (): FormGroup => {
    const agentContactFormGroup = new FormGroup("contact", [
      new FormControl("name", props.selectedAgentDetail.contact.name, {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("phone", props.selectedAgentDetail.contact.phone, {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      })
    ]);

    const agentStoreInformationFormGroup = new FormGroup("storeInfo", [
      new FormControl("agentStatus", props.selectedAgentDetail.status, {
        required: true,
        validator: (data: string) => {
          return data !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
        }
      }),
      new FormControl("storeName", props.selectedAgentDetail.storeName, {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("email", props.selectedAgentDetail.email, {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("phone", props.selectedAgentDetail.phone, {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("onlineTime", props.selectedAgentDetail.onlineTime, {
        required: false
      }),
      new FormControl(
        "agentLevel",
        props.selectedAgentDetail.agentLevel === undefined
          ? dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE
          : props.selectedAgentDetail.agentLevel.name,
        {
          required: true,
          validator: (data: string) => {
            return data.trim() !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
          }
        }
      ),
      new FormControl("bankAccount", props.selectedAgentDetail.bankAccount, {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      })
    ]);

    const agentLocationFormGroup = new FormGroup("location", [
      new FormControl(
        "country",
        props.selectedAgentDetail.region.city?.country?.name,
        {
          required: true,
          validator: (data: string) => {
            return data !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
          }
        }
      ),
      new FormControl("city", props.selectedAgentDetail.region.city?.name, {
        required: true,
        validator: (data: string) => {
          return data !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
        }
      }),
      new FormControl("region", props.selectedAgentDetail.region.name, {
        required: true,
        validator: (data: string) => {
          return data !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
        }
      })
    ]);

    return new FormGroup("data", [
      agentStoreInformationFormGroup,
      agentContactFormGroup,
      agentLocationFormGroup
    ]);
  };

  const closeEditModal = () => {
    props.displayAgentEditModal(false);
  };

  const [agentEditForm, setAgentEditForm] = useState(new FormGroup("data", []));
  const [showEditFormError, setEditFormErrorDisplay] = useState(false);

  useEffect(() => {
    if (props.displayModal && props.selectedAgentBrief.id !== 0) {
      props.getAgentDetail(props.selectedAgentBrief.id);
      props.getAgentLevelSettings();
    }
  }, [props.displayModal]);

  useEffect(() => {
    if (props.selectedAgentDetail !== undefined) {
      setAgentEditForm(buildAgentEditForm());
    }
  }, [props.selectedAgentDetail]);

  const handleSave = () => {
    setEditFormErrorDisplay(false);
    const formIsValid = agentEditForm.validate();
    if (!formIsValid) {
      setEditFormErrorDisplay(true);
    } else {
      const formValue = agentEditForm.getGroupValue();
      const selectedAgentLevelSetting = props.agentLevelSettings.find(
        x => x.name === formValue.storeInfo.agentLevel
      );
      const selectedRegion = props.regionList.find(
        x => x.name === formValue.location.region
      );

      if (
        selectedAgentLevelSetting === undefined ||
        selectedRegion === undefined
      ) {
        return;
      }

      // TODO: convert formValue to detail
      const updatedAgent: Agent = {
        id: props.selectedAgentDetail.id,
        displayId: props.selectedAgentDetail.displayId,
        status: formValue.storeInfo.agentStatus,
        storeName: formValue.storeInfo.storeName,
        email: formValue.storeInfo.email,
        phone: formValue.storeInfo.phone,
        onlineTime: formValue.storeInfo.onlineTime,
        agentLevel: selectedAgentLevelSetting,
        bankAccount: formValue.storeInfo.bankAccount,
        contact: {
          name: formValue.contact.name,
          phone: formValue.contact.phone
        },
        region: selectedRegion
      };

      console.error(updatedAgent);

      props.updateAgentDetail(updatedAgent.id, updatedAgent);
    }
  };

  return (
    <>
      {props.displayModal &&
        props.selectedAgentBrief.id !== 0 &&
        agentEditForm.controlElements.length !== 0 &&
        props.agentStatusDropdownData.length !== 0 &&
        props.agentLevelSettingDropdownData.length !== 0 && (
          <AgentEditModal
            display={props.displayModal}
            editForm={agentEditForm}
            agentBrief={props.selectedAgentBrief}
            agentData={props.selectedAgentDetail}
            agentStatusDropdownData={props.agentStatusDropdownData}
            agentLevelSettingDropdownData={props.agentLevelSettingDropdownData}
            handleClose={closeEditModal}
            handleSave={handleSave}
            displayFormError={showEditFormError}
          />
        )}
    </>
  );
};

const mapDispatchToProps = {
  getAgentDetail,
  displayAgentEditModal,
  getAgentLevelSettings,
  updateAgentDetail
};

const mapStateToProps = (state: any) => {
  return {
    selectedAgentBrief: state.agentReducer.agentListReducer.selectedAgentBrief,
    selectedAgentDetail:
      state.agentReducer.agentListReducer.selectedAgentDetail,
    agentLevelSettings:
      state.agentReducer.agentLevelSettingsReducer.levelSettings,
    agentStatusDropdownData:
      state.agentReducer.agentDropdownReducer.agentStatusDropdownItems,
    agentLevelSettingDropdownData:
      state.agentReducer.agentDropdownReducer.agentLevelSettingDropdownItems,
    regionList: state.locationReducer.locationCollectionReducer.regions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentEdit);
