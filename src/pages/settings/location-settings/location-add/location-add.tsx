import React, { useState } from "react";
import { connect } from "react-redux";
import "./location-add.scss";
import {
  FormGroup,
  FormControl,
  AppModal,
  AppButton,
  AppFormInput,
  AppTextField
} from "components";
import { countryService, cityService, regionService } from "services";
import { LocationType } from "models";
import { updateHttpRequestStatus } from "app-redux";
import {
  createNewCountryMock,
  createNewCityMock,
  createNewRegionMock
} from "mock/data";

interface LocationAddPropsInterface {
  show: boolean;
  type: LocationType;
  selectedLocation?: any;
  handleClose: () => any | void;
  updateHttpRequestStatus: any;
  handleNewLocation: (locationType: LocationType, data: any) => void;
}

const LocationAdd: React.FC<LocationAddPropsInterface> = (
  props: LocationAddPropsInterface
) => {
  const [displayFormError, updateFormErrorDisplay] = useState(false);

  const formGroup: FormGroup = new FormGroup("data", [
    new FormControl("name", "", {
      required: true,
      validator: (data: any) => {
        return data.trim() !== "";
      }
    }),
    new FormControl("chinese", "", {
      required: false
    })
  ]);

  const getModalTitle = (): string => {
    switch (props.type) {
      case LocationType.Country:
        return "添加国家";
      case LocationType.City:
        return "添加城市";
      case LocationType.Region:
        return "添加地区";
      default:
        return "";
    }
  };

  const createLocation = () => {
    const formIsValid = formGroup.validate();
    if (!formIsValid) {
      updateFormErrorDisplay(true);
    } else {
      updateFormErrorDisplay(false);
      const formValue = formGroup.getGroupValue();
      const newLocation: any = {
        id: 0,
        name: formValue.name,
        chinese: formValue.chinese
      };
      switch (props.type) {
        case LocationType.Country:
          const mockCountryResult = createNewCountryMock();
          props.updateHttpRequestStatus(true);
          countryService.createCountry(newLocation).then(response => {
            console.log(mockCountryResult);
            const result = response.data.mockData;
            console.log("mock result is: ", result);

            // simulate http request
            setTimeout(() => {
              props.updateHttpRequestStatus(false);
            }, 2000);

            newLocation["id"] = result;
            props.handleNewLocation(LocationType.Country, newLocation);
          });
          break;
        case LocationType.City:
          newLocation["countryId"] = props.selectedLocation.country;
          const mockCityResult = createNewCityMock();
          props.updateHttpRequestStatus(true);
          cityService.createCity(newLocation).then(response => {
            console.log(mockCityResult);
            const result = response.data.mockData;
            console.log("mock result is: ", result);

            // simulate http request
            setTimeout(() => {
              props.updateHttpRequestStatus(false);
            }, 2000);

            newLocation["id"] = result;
            props.handleNewLocation(LocationType.City, newLocation);
          });
          break;
        case LocationType.Region:
          newLocation["cityId"] = props.selectedLocation.city;
          const mockRegionResult = createNewRegionMock();
          props.updateHttpRequestStatus(true);
          regionService.createRegion(newLocation).then(response => {
            console.log(mockRegionResult);
            const result = response.data.mockData;
            console.log("mock result is: ", result);

            // simulate http request
            setTimeout(() => {
              props.updateHttpRequestStatus(false);
            }, 2000);

            newLocation["id"] = result;
            props.handleNewLocation(LocationType.Region, newLocation);
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
          onClick={createLocation}
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

export default connect(null, mapDispatchToState)(LocationAdd);
