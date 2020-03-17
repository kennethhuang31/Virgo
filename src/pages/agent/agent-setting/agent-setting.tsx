import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./agent-setting.scss";
import {
  getAgentLevelSettings,
  updateAgentLevelSetting,
  createAgentLevelSetting,
  deleteAgentLevelSetting,
  selectAgentLevelSettingForEdit,
  displayAgentLevelSettingEditModal,
  displayAgentLevelSettingDeleteConfirmModal,
  BaseActionInterface
} from "app-redux";
import { AgentLevel } from "models";
import { dataHelper } from "services";
import { AppConfirmModal, FormGroup, FormControl } from "components";
import AgentSettingDisplay from "./agent-setting-display/agent-setting-display";
import AgentSettingModal from "./agent-setting-modal/agent-setting-modal";

interface AgentSettingPropsInterface {
  agentLevelSettings: AgentLevel[];
  selectedAgentLevel: AgentLevel;
  displayEditModal: boolean;
  displayDeleteConfirmModal: boolean;
  getAgentLevelSettings: any;
  updateAgentLevelSetting: any;
  createAgentLevelSetting: any;
  deleteAgentLevelSetting: any;
  selectAgentLevelSettingForEdit: (data: AgentLevel) => BaseActionInterface;
  displayAgentLevelSettingEditModal: (display: boolean) => BaseActionInterface;
  displayAgentLevelSettingDeleteConfirmModal: (
    display: boolean
  ) => BaseActionInterface;
}

const AgentSetting: React.FC<AgentSettingPropsInterface> = (
  props: AgentSettingPropsInterface
) => {
  // create form
  const createInitialLevelSettingForm = () => {
    return new FormGroup("newLevelSetting", [
      new FormControl("name", "", {
        required: true,
        validator: (name: string): boolean => {
          return name.trim() !== "";
        }
      }),
      new FormControl("deliverCommission", 0, {
        required: true,
        validator: (deliverCommission: number): boolean => {
          return deliverCommission > 0;
        }
      }),
      new FormControl("pickupCommission", 0, {
        required: true,
        validator: (pickupCommission: number): boolean => {
          return pickupCommission > 0;
        }
      })
    ]);
  };

  // edit form
  const createLevelSettingEditForm = () => {
    return new FormGroup("levelSettingEdit", [
      new FormControl("name", props.selectedAgentLevel.name, {
        required: true,
        validator: (name: string): boolean => {
          return name.trim() !== "";
        }
      }),
      new FormControl(
        "deliverCommission",
        props.selectedAgentLevel.deliverCommission,
        {
          required: true,
          validator: (deliverCommission: number): boolean => {
            return deliverCommission > 0;
          }
        }
      ),
      new FormControl(
        "pickupCommission",
        props.selectedAgentLevel.pickupCommission,
        {
          required: true,
          validator: (pickupCommission: number): boolean => {
            return pickupCommission > 0;
          }
        }
      )
    ]);
  };

  const [showFormError, setFormErrorDisplay] = useState(false);
  const [showEditFormError, setEditFormErrorDisplay] = useState(false);
  const [createForm, setCreateForm] = useState(createInitialLevelSettingForm());
  const [editForm, setEditForm] = useState(createLevelSettingEditForm());

  const handleNewAgentLevel = () => {
    const formIsValid = createForm.validate();
    if (!formIsValid) {
      setFormErrorDisplay(true);
    } else {
      const formValue = createForm.getGroupValue();
      const newAgentLevelSetting: AgentLevel = {
        id: 0,
        name: formValue.name,
        deliverCommission: dataHelper.parseStringToNumber(
          formValue.deliverCommission
        ),
        pickupCommission: dataHelper.parseStringToNumber(
          formValue.pickupCommission
        )
      };
      props.createAgentLevelSetting(newAgentLevelSetting).then(() => {
        setCreateForm(createInitialLevelSettingForm);
        setFormErrorDisplay(false);
      });
    }
  };

  const handleAgentLevelUpdate = () => {
    setEditFormErrorDisplay(false);
    const formIsValid = editForm.validate();
    if (!formIsValid) {
      setEditFormErrorDisplay(true);
    } else {
      const formValue = editForm.getGroupValue();
      const updatedAgentLevelSetting: AgentLevel = {
        id: props.selectedAgentLevel.id,
        name: formValue.name,
        deliverCommission: dataHelper.parseStringToNumber(
          formValue.deliverCommission
        ),
        pickupCommission: dataHelper.parseStringToNumber(
          formValue.pickupCommission
        )
      };

      props
        .updateAgentLevelSetting(
          updatedAgentLevelSetting.id,
          updatedAgentLevelSetting
        )
        .then(() => {
          setEditFormErrorDisplay(false);
          props.displayAgentLevelSettingEditModal(false);
        });
    }
  };

  const handleAgentLevelDelete = (id: number) => {
    props.deleteAgentLevelSetting(id);
  };

  const displayEditModal = (data: AgentLevel) => {
    props.selectAgentLevelSettingForEdit(data);
    props.displayAgentLevelSettingEditModal(true);
  };

  const displayConfirmModal = (data: AgentLevel) => {
    props.selectAgentLevelSettingForEdit(data);
    props.displayAgentLevelSettingDeleteConfirmModal(true);
  };

  useEffect(() => {
    props.getAgentLevelSettings();
  }, []);

  useEffect(() => {
    setEditForm(createLevelSettingEditForm());
  }, [props.displayEditModal]);

  return (
    <>
      <AppConfirmModal
        type="delete"
        display={props.displayDeleteConfirmModal}
        handleConfirm={() => {
          props.displayAgentLevelSettingDeleteConfirmModal(false);
          handleAgentLevelDelete(props.selectedAgentLevel.id);
        }}
        handleClose={() => {
          props.displayAgentLevelSettingDeleteConfirmModal(false);
        }}
      />
      <AgentSettingModal
        display={props.displayEditModal}
        displayEditFormError={showEditFormError}
        initialEditForm={editForm}
        handleClose={() => {
          props.displayAgentLevelSettingEditModal(false);
        }}
        handleSave={handleAgentLevelUpdate}
      />
      <AgentSettingDisplay
        displayFormError={showFormError}
        initialCreateForm={createForm}
        agentLevelSettings={props.agentLevelSettings}
        handleCreate={handleNewAgentLevel}
        handleDelete={displayConfirmModal}
        displayEditModal={displayEditModal}
        displayDeleteConfirmModal={displayConfirmModal}
      />
    </>
  );
};

const mapDispatchToProps = {
  getAgentLevelSettings,
  updateAgentLevelSetting,
  createAgentLevelSetting,
  deleteAgentLevelSetting,
  selectAgentLevelSettingForEdit,
  displayAgentLevelSettingEditModal,
  displayAgentLevelSettingDeleteConfirmModal
};

const mapStateToProps = (state: any) => {
  return {
    agentLevelSettings:
      state.agentReducer.agentLevelSettingsReducer.levelSettings,
    selectedAgentLevel:
      state.agentReducer.agentLevelSettingsReducer.selectedAgentLevel,
    displayEditModal:
      state.agentReducer.agentLevelSettingsReducer.displayEditModal,
    displayDeleteConfirmModal:
      state.agentReducer.agentLevelSettingsReducer.displayConfirmModal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentSetting);
