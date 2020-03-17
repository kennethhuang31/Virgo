import { combineReducers } from "redux";
import { LocationAction, LocationDropdownAction } from "../actions";
import { Country, City, Region, LocationType, DropdownItem } from "models";
import { dropdownHelper } from "services/helper";

export interface LocationStateInterface {
  collections: LocationCollectionsStateInterface;
  selected: SelectedLocationStateInterface;
}

export interface SelectedLocationStateInterface {
  selectedCountry: Country;
  selectedCity: City;
  selectedRegion: Region;
}

export interface LocationCollectionsStateInterface {
  countries: Country[];
  cities: City[];
  regions: Region[];
}

export interface LocationDropdownStateInterface {
  dropdownCountries: DropdownItem[];
  dropdownCities: DropdownItem[];
  dropdownRegions: DropdownItem[];
  dropdownSelectedCountry?: DropdownItem;
  dropdownSelectedCity?: DropdownItem;
  dropdownSelectedRegion?: DropdownItem;
}

const initialLocationCollectionsState: LocationCollectionsStateInterface = {
  countries: [],
  cities: [],
  regions: []
};

const initialSelectedLocationState: SelectedLocationStateInterface = {
  selectedCountry: {
    id: 0,
    name: ""
  },
  selectedCity: {
    id: 0,
    name: "",
    countryId: 0
  },
  selectedRegion: {
    id: 0,
    name: "",
    cityId: 0
  }
};

const initialLocationDropdownState: LocationDropdownStateInterface = {
  dropdownCountries: [],
  dropdownCities: [],
  dropdownRegions: [],
  dropdownSelectedCountry: undefined,
  dropdownSelectedCity: undefined,
  dropdownSelectedRegion: undefined
};

const locationCollectionReducer = (
  state: LocationCollectionsStateInterface = initialLocationCollectionsState,
  action: any
) => {
  switch (action.type) {
    case LocationAction.RECEIVE_LOCATIONS:
      switch (action.payload.locationType) {
        case LocationType.Country:
          return Object.assign({}, state, {
            ...state,
            countries: action.payload.locationData
          });
        case LocationType.City:
          return Object.assign({}, state, {
            ...state,
            cities: action.payload.locationData
          });
        case LocationType.Region:
          return Object.assign({}, state, {
            ...state,
            regions: action.payload.locationData
          });
      }
    default:
      return state;
  }
};

const selectedLocationReducer = (
  state: SelectedLocationStateInterface = initialSelectedLocationState,
  action: any
) => {
  switch (action.type) {
    case LocationAction.RECEIVE_LOCATIONS:
      switch (action.payload.locationType) {
        case LocationType.Country:
          return Object.assign({}, state, {
            ...state,
            selectedCountry: action.payload.locationData
          });
        case LocationType.City:
          return Object.assign({}, state, {
            ...state,
            selectedCity: action.payload.locationData
          });
        case LocationType.Region:
          return Object.assign({}, state, {
            ...state,
            selectedRegion: action.payload.locationData
          });
      }
    default:
      return state;
  }
};

const locationDropdownReducer = (
  state: LocationDropdownStateInterface = initialLocationDropdownState,
  action: any
) => {
  switch (action.type) {
    case LocationDropdownAction.RECEIVE_LOCATION_DROPDOWN:
      const dropdownData: DropdownItem[] = [];
      switch (action.payload.locationType) {
        case LocationType.Country:
          action.payload.locationData.forEach((country: Country) => {
            dropdownData.push(new DropdownItem(country.id, country.name));
          });
          return Object.assign({}, state, {
            ...state,
            dropdownCountries: dropdownData
          });
        case LocationType.City:
          action.payload.locationData.forEach((city: City) => {
            dropdownData.push(new DropdownItem(city.id, city.name));
          });
          return Object.assign({}, state, {
            ...state,
            dropdownCities: dropdownData
          });
        case LocationType.Region:
          action.payload.locationData.forEach((region: Region) => {
            dropdownData.push(new DropdownItem(region.id, region.name));
          });
          return Object.assign({}, state, {
            ...state,
            dropdownRegions: dropdownData
          });
      }
    case LocationDropdownAction.RECEIVE_SELECTED_LOCATION_DROPDOWN:
      switch (action.payload.locationType) {
        case LocationType.Country:
          return Object.assign({}, state, {
            ...state,
            dropdownSelectedCountry: action.payload.locationData
          });
        case LocationType.City:
          return Object.assign({}, state, {
            ...state,
            dropdownSelectedCity: action.payload.locationData
          });
        case LocationType.Region:
          return Object.assign({}, state, {
            ...state,
            dropdownSelectedRegion: action.payload.locationData
          });
      }
    case LocationDropdownAction.RESET_DROPDOWN:
      switch (action.payload) {
        case LocationType.Country:
          return Object.assign({}, state, {
            ...state,
            dropdownCities: [],
            dropdownRegions: [],
            dropdownSelectedCountry: dropdownHelper.createDefaultDropdownItem(
              "请选择国家"
            ),
            dropdownSelectedCity: dropdownHelper.createDefaultDropdownItem(
              "请选择城市"
            ),
            dropdownSelectedRegion: dropdownHelper.createDefaultDropdownItem(
              "请选择地区"
            )
          });
        case LocationType.City:
          return Object.assign({}, state, {
            ...state,
            dropdownRegions: [],
            dropdownSelectedCity: dropdownHelper.createDefaultDropdownItem(
              "请选择城市"
            ),
            dropdownSelectedRegion: dropdownHelper.createDefaultDropdownItem(
              "请选择地区"
            )
          });
        case LocationType.Region:
          return Object.assign({}, state, {
            ...state,
            dropdownSelectedRegion: dropdownHelper.createDefaultDropdownItem(
              "请选择地区"
            )
          });
      }
    default:
      return state;
  }
};

export const locationReducer = combineReducers({
  locationCollectionReducer,
  selectedLocationReducer,
  locationDropdownReducer
});
