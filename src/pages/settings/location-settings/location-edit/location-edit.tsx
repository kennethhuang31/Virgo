import React, { useState } from "react";
import { connect } from "react-redux";
import "./location-edit.scss";
import {
  FormGroup,
  FormControl,
  AppModal,
  AppButton,
  AppFormInput,
  AppTextField
} from "components";
import { countryService, cityService, regionService } from "services";
import { LocationType, Country, City, Region } from "models";
import { updateHttpRequestStatus } from "app-redux";
import { updateCityMock, updateCountryMock, updateRegionMock } from "mock/data";

interface LocationEditPropsInterface {
  show: boolean;
  type: LocationType;
  selectedLocation?: any;
  handleClose: () => any | void;
  updateHttpRequestStatus: any;
  handleUpdatedLocation: (locationType: LocationType, data: any) => void;
}

const LocationEdit: React.FC<LocationEditPropsInterface> = (
  props: LocationEditPropsInterface
) => {
  const [displayFormError, updateFormErrorDisplay] = useState(false);
  const formGroup: FormGroup = new FormGroup("data", [
    new FormControl("name", props.selectedLocation?.name, {
      required: true,
      validator: (data: any) => {
        return data.trim() !== "";
      }
    }),
    new FormControl("chinese", props.selectedLocation?.chinese, {
      required: false
    })
  ]);

  const getModalTitle = (): string => {
    switch (props.type) {
      case LocationType.Country:
        return "修改国家";
      case LocationType.City:
        return "修改城市";
      case LocationType.Region:
        return "修改地区";
      default:
        return "";
    }
  };

  const saveLocation = () => {
    const formIsValid = formGroup.validate();
    if (!formIsValid) {
      updateFormErrorDisplay(true);
    } else {
      updateFormErrorDisplay(false);
      const formValue = formGroup.getGroupValue();
      const updatedLocation: any = {
        id: props.selectedLocation?.id,
        name: formValue.name,
        chinese: formValue.chinese
      };

      switch (props.type) {
        case LocationType.Country:
          const mockCountryResult = updateCountryMock(updatedLocation);
          props.updateHttpRequestStatus(true);
          countryService
            .updateCountry(updatedLocation.id, updatedLocation)
            .then(response => {
              console.log(mockCountryResult);
              const result = response.data.mockData;
              console.log("mock result is: ", result);

              // simulate http request
              setTimeout(() => {
                props.updateHttpRequestStatus(false);
              }, 2000);

              props.handleUpdatedLocation(LocationType.Country, result);
            });
          break;
        case LocationType.City:
          updatedLocation["countryId"] = props.selectedLocation.countryId;
          const mockCityResult = updateCityMock(updatedLocation);
          props.updateHttpRequestStatus(true);
          cityService
            .updateCity(updatedLocation.id, updatedLocation)
            .then(response => {
              console.log(mockCityResult);
              const result = response.data.mockData;
              console.log("mock result is: ", result);

              // simulate http request
              setTimeout(() => {
                props.updateHttpRequestStatus(false);
              }, 2000);

              props.handleUpdatedLocation(LocationType.City, result);
            });
          break;
        case LocationType.Region:
          updatedLocation["cityId"] = props.selectedLocation.cityId;
          const mockRegionResult = updateRegionMock(updatedLocation);
          props.updateHttpRequestStatus(true);
          regionService
            .updateRegion(updatedLocation.id, updatedLocation)
            .then(response => {
              console.log(mockRegionResult);
              const result = response.data.mockData;
              console.log("mock result is: ", result);

              // simulate http request
              setTimeout(() => {
                props.updateHttpRequestStatus(false);
              }, 2000);

              props.handleUpdatedLocation(LocationType.Region, result);
            });
          break;
      }

      props.handleClose();
    }
  };

  const bodyContent = () => {
    return (
      <div className="location-content">
        <AppTextField text="名称">
          <AppFormInput
            id="add-location-name"
            type="text"
            required={true}
            placeholder="英文名称"
            formControl={formGroup.controlElements[0]}
            displayError={displayFormError}
            errorMessage="英文名称不能为空"
          />
        </AppTextField>
        <AppTextField text="中文">
          <AppFormInput
            id="add-location-chinese"
            type="text"
            required={false}
            displayError={false}
            placeholder="中文名称"
            formControl={formGroup.controlElements[1]}
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
          onClick={saveLocation}
        />
      </div>
    );
  };

  return (
    <AppModal
      modalClass="location"
      show={props.show}
      title={getModalTitle()}
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

const mapDispatchToState = {
  updateHttpRequestStatus
};
export default connect(null, mapDispatchToState)(LocationEdit);
