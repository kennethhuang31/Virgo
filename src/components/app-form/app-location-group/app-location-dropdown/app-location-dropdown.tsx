import React from "react";
import "./app-location-dropdown.scss";
import { DropdownItem } from "models";
import { AppFormDropdown, FormGroup, AppTextField } from "components";

interface AppLocationDropdownPropsInterface {
  selectedCountry?: DropdownItem;
  selectedCity?: DropdownItem;
  selectedRegion?: DropdownItem;
  countryDropdown: DropdownItem[];
  cityDropdown: DropdownItem[];
  regionDropdown: DropdownItem[];
  handleCountryChange: (country: string) => void;
  handleCityChange: (city: string) => void;
  handleRegionChange: (region: string) => void;
  locationGroup: FormGroup;
  required: boolean;
  displayError: boolean;
  disableCountry: boolean;
  disableCity: boolean;
  disableRegion: boolean;
  groupStyle?: string;
}

export const AppLocationDropdown: React.FC<AppLocationDropdownPropsInterface> = (
  props: AppLocationDropdownPropsInterface
) => {
  const locationDropdownStyle =
    props.groupStyle === undefined
      ? "app-layout app-layout_between"
      : `app-layout app-layout_between ${props.groupStyle}`;
  return (
    <div className={locationDropdownStyle}>
      <AppTextField text="国家 :">
        <AppFormDropdown
          id="dropdown-country"
          placeholder="选择国家"
          data={props.countryDropdown}
          selected={props.selectedCountry}
          sort={false}
          disabled={props.disableCountry}
          required={props.required}
          formControl={props.locationGroup.controlElements[0]}
          displayError={props.displayError}
          errorMessage="国家不能为空"
          onChange={props.handleCountryChange}
        />
      </AppTextField>
      <AppTextField text="城市 :">
        <AppFormDropdown
          id="dropdown-city"
          placeholder="选择城市"
          data={props.cityDropdown}
          selected={props.selectedCity}
          sort={false}
          disabled={props.disableCity}
          required={props.required}
          formControl={props.locationGroup.controlElements[1]}
          displayError={props.displayError}
          errorMessage="城市不能为空"
          onChange={props.handleCityChange}
        />
      </AppTextField>
      <AppTextField text="地区 :">
        <AppFormDropdown
          id="dropdown-region"
          placeholder="选择地区"
          data={props.regionDropdown}
          selected={props.selectedRegion}
          sort={false}
          disabled={props.disableRegion}
          required={props.required}
          formControl={props.locationGroup.controlElements[2]}
          displayError={props.displayError}
          errorMessage="地区不能为空"
          onChange={props.handleRegionChange}
        />
      </AppTextField>
    </div>
  );
};
