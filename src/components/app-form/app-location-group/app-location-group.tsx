import React, { useState, useEffect } from "react";
import { connect, batch } from "react-redux";
import "./app-location-group.scss";
import { DropdownItem, Region, City, Country, LocationType } from "models";
import {
  getCountryForDropdown,
  getCityForDropdown,
  getRegionForDropdown,
  getCountryCityForDropdown,
  getCountryCityRegionForDropdown,
  receiveSelectedLocationDropdown,
  BaseActionInterface
} from "app-redux";
import { FormGroup } from "../model";
import { FormControl } from "../model";
import { AppLocationDropdown } from "./app-location-dropdown/app-location-dropdown";

interface AppLocationGroupPropsInterface {
  region?: Region;
  city?: City;
  country?: Country;
  required?: boolean;
  locationGroup: FormGroup;
  countryDropdown: DropdownItem[];
  cityDropdown: DropdownItem[];
  regionDropdown: DropdownItem[];
  selectedCountry: DropdownItem;
  selectedCity: DropdownItem;
  selectedRegion: DropdownItem;
  displayError?: boolean;
  disableCountry?: boolean;
  disableCity?: boolean;
  disableRegion?: boolean;
  groupStyle?: string;
  handleCountryUpdate?: (countryId: number) => void;
  handleCityUpdate?: (cityId: number) => void;
  handleRegionUpdate?: (regionId: number) => void;
  receiveSelectedLocationDropdown: (
    locationType: LocationType,
    data: any
  ) => BaseActionInterface;
  getCountryForDropdown: () => (dispatch: any) => any;
  getCityForDropdown: (countryId: number) => (dispatch: any) => any;
  getRegionForDropdown: (cityId: number) => (dispatch: any) => any;
  getCountryCityForDropdown: (countryId: number) => (dispatch: any) => any;
  getCountryCityRegionForDropdown: (
    countryId: number,
    cityId: number
  ) => (dispatch: any) => any;
}

const AppLocationGroup: React.FC<AppLocationGroupPropsInterface> = (
  props: AppLocationGroupPropsInterface
) => {
  const countryOnChange = (name: string) => {
    const selectedCountry = props.countryDropdown.find(x => x.name === name);
    if (selectedCountry !== undefined) {
      const countryId = selectedCountry.id;
      props.getCityForDropdown(countryId);

      if (props.handleCountryUpdate !== undefined) {
        props.handleCountryUpdate(countryId);
      }
    }
  };
  const cityOnChange = (name: string) => {
    const selectedCity = props.cityDropdown.find(x => x.name === name);
    if (selectedCity !== undefined) {
      const cityId = selectedCity.id;
      props.getRegionForDropdown(cityId);

      if (props.handleCityUpdate !== undefined) {
        props.handleCityUpdate(cityId);
      }
    }
  };
  const regionOnChange = (name: string) => {
    const selectedRegion = props.regionDropdown.find(x => x.name === name);
    if (selectedRegion !== undefined) {
      const regionId = selectedRegion.id;
      if (props.handleRegionUpdate !== undefined) {
        props.handleRegionUpdate(regionId);
      }
    }
  };

  useEffect(() => {
    if (props.region !== undefined) {
      const cityId = props.region.cityId;
      const countryId = props.region.city?.countryId;
      props.receiveSelectedLocationDropdown(
        LocationType.Region,
        new DropdownItem(props.region.id, props.region.name)
      );
      if (countryId !== undefined) {
        props.getCountryCityRegionForDropdown(countryId, cityId);
      }
    } else if (props.city !== undefined) {
      const countryId = props.city.countryId;
      props.getCountryCityForDropdown(countryId);
    } else {
      props.getCountryForDropdown();
    }
  }, []);

  return (
    <AppLocationDropdown
      locationGroup={props.locationGroup}
      countryDropdown={props.countryDropdown}
      cityDropdown={props.cityDropdown}
      regionDropdown={props.regionDropdown}
      selectedCountry={props.selectedCountry}
      selectedCity={props.selectedCity}
      selectedRegion={props.selectedRegion}
      required={props.required === undefined ? false : props.required}
      displayError={
        props.displayError === undefined ? false : props.displayError
      }
      disableCountry={
        props.disableCountry === undefined ? false : props.disableCountry
      }
      disableCity={props.disableCity === undefined ? false : props.disableCity}
      disableRegion={
        props.disableRegion === undefined ? false : props.disableRegion
      }
      handleCountryChange={countryOnChange}
      handleCityChange={cityOnChange}
      handleRegionChange={regionOnChange}
      groupStyle={props.groupStyle}
    />
  );
};

const mapDispatchToProps = {
  receiveSelectedLocationDropdown,
  getCountryForDropdown,
  getCityForDropdown,
  getRegionForDropdown,
  getCountryCityForDropdown,
  getCountryCityRegionForDropdown
};

const mapStateToProps = (state: any) => {
  return {
    countryDropdown:
      state.locationReducer.locationDropdownReducer.dropdownCountries,
    cityDropdown: state.locationReducer.locationDropdownReducer.dropdownCities,
    regionDropdown:
      state.locationReducer.locationDropdownReducer.dropdownRegions,
    selectedCountry:
      state.locationReducer.locationDropdownReducer.dropdownSelectedCountry,
    selectedCity:
      state.locationReducer.locationDropdownReducer.dropdownSelectedCity,
    selectedRegion:
      state.locationReducer.locationDropdownReducer.dropdownSelectedRegion
  };
};

const AppLocationGroupDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLocationGroup);

export { AppLocationGroupDropdown };
