import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./agent-create.scss";
import { FormGroup, FormControl } from "components";
import {
  DropdownItem,
  LocationType,
  AgentCreateDto,
  AgentStatus
} from "models";
import { dropdownHelper, agentService } from "services";
import {
  BaseActionInterface,
  getAgentLevelSettings,
  resetDropdown
} from "app-redux";
import AgentCreateDisplay from "./agent-create-display/agent-create-display";

interface AgentCreatePropsInterface {
  agentLevelSettingDropdownData: DropdownItem[];
  regionDropdownData: DropdownItem[];
  getAgentLevelSettings: any;
  resetDropdown: (locationType: LocationType) => BaseActionInterface;
}

const AgentCreate: React.FC<AgentCreatePropsInterface> = (
  props: AgentCreatePropsInterface
) => {
  const buildAgentCreateForm = (): FormGroup => {
    const agentContactFormGroup = new FormGroup("contact", [
      new FormControl("name", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("phone", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("password", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("confirmPassword", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      })
    ]);

    const agentLocationFormGroup = new FormGroup("location", [
      new FormControl("country", dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE, {
        required: true,
        validator: (data: string) => {
          return data !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
        }
      }),
      new FormControl("city", dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE, {
        required: true,
        validator: (data: string) => {
          return data !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
        }
      }),
      new FormControl("region", dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE, {
        required: true,
        validator: (data: string) => {
          return data !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
        }
      })
    ]);

    const agentStoreInformationFormGroup = new FormGroup("storeInfo", [
      new FormControl("storeName", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("email", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("storeAddress", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("phone", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      }),
      new FormControl("onlineTime", "", {
        required: false
      }),
      new FormControl(
        "agentLevel",
        dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE,
        {
          required: true,
          validator: (data: string) => {
            return data.trim() !== dropdownHelper.DEFAULT_DROPDOWN_OPTION_VALUE;
          }
        }
      ),
      new FormControl("bankAccount", "", {
        required: true,
        validator: (data: string) => {
          return data.trim() !== "";
        }
      })
    ]);

    const createForm = new FormGroup("data", [
      agentStoreInformationFormGroup,
      agentContactFormGroup,
      agentLocationFormGroup
    ]);

    return createForm;
  };

  const extraFormErrorList: string[] = [];
  const [agentCreateForm, setCreateForm] = useState(buildAgentCreateForm());
  const [fileIsSelected, setFileSelected] = useState(false);
  const [displayFormError, setFormError] = useState(false);
  const [extraFormError, setExtraFormError] = useState(extraFormErrorList);

  useEffect(() => {
    props.getAgentLevelSettings();
  }, []);

  const handleFileUpload = (file: File) => {
    if (file.size !== 0) {
      setFileSelected(true);
    }
    return;
  };

  const handleSave = () => {
    setFormError(false);
    const formIsValid = agentCreateForm.validate();
    setExtraFormError([]);
    if (!formIsValid) {
      setFormError(true);
    } else {
      setFormError(false);
      const formValue = agentCreateForm.getGroupValue();
      console.error(formValue);
      // check password
      if (formValue.contact.password !== formValue.contact.confirmPassword) {
        const errors = extraFormError;
        errors.push("password-unmatch");
        setExtraFormError(errors);
      }
      // check file
      if (!fileIsSelected) {
        const errors = extraFormError;
        errors.push("no-file");
        setExtraFormError(errors);
      }
      if (extraFormError.length !== 0) {
        return;
      }

      // create agent then upload file using new id
      // TODO: use upload file api later
      const selectedRegion = props.regionDropdownData.find(
        x => x.name === formValue.location.region
      );
      const selectedLevel = props.agentLevelSettingDropdownData.find(
        x => x.name === formValue.storeInfo.agentLevel
      );
      if (selectedRegion === undefined || selectedLevel === undefined) {
        return;
      }

      const newAgent: AgentCreateDto = {
        status: AgentStatus.Offline,
        storeName: formValue.storeInfo.storeName,
        email: formValue.storeInfo.email,
        phone: formValue.storeInfo.phone,
        bankAccount: formValue.storeInfo.bankAccount,
        regionId: selectedRegion.id,
        agentLevelId: selectedLevel.id,
        contact: {
          name: formValue.contact.name,
          phone: formValue.contact.phone,
          password: formValue.contact.password,
          confirmPassword: formValue.contact.confirmPassword
        }
      };

      console.error(newAgent);

      // try {
      //   const newAgentId = agentService.createAgent(newAgent);
      // } catch (err) {
      //   console.error(err);
      // }
    }
  };

  const handleReset = () => {
    setFormError(false);
    props.resetDropdown(LocationType.Country);
    setCreateForm(buildAgentCreateForm());
  };

  return (
    <AgentCreateDisplay
      displayError={displayFormError}
      agentLevelDropdownData={props.agentLevelSettingDropdownData}
      storeFormGroup={agentCreateForm.controlElements[0]}
      contactFormGroup={agentCreateForm.controlElements[1]}
      locationFormGroup={agentCreateForm.controlElements[2]}
      extraCreateError={extraFormError}
      handleSave={handleSave}
      handleReset={handleReset}
      handleFileUpload={handleFileUpload}
    />
  );
};

const mapDispatchToProps = {
  getAgentLevelSettings,
  resetDropdown
};

const mapStateToProps = (state: any) => {
  return {
    agentLevelSettingDropdownData:
      state.agentReducer.agentDropdownReducer.agentLevelSettingDropdownItems,
    regionDropdownData:
      state.locationReducer.locationDropdownReducer.dropdownRegions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentCreate);
