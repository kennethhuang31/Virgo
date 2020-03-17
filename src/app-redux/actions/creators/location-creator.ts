import Axios from "axios";
import { batch } from "react-redux";
import { LocationAction, LocationDropdownAction } from "../constant";
import { BaseActionInterface } from "./interface";
import { LocationType, Country, City, Region, DropdownItem } from "models";
import { countryService, cityService, regionService } from "services";
import { updateHttpRequestStatus } from "../creators/httpRequest-creator";

import { getCountryMock, getCityMock, getRegionMock } from "mock/data";

export const receiveLocations = (
  locationType: LocationType,
  data: any[]
): BaseActionInterface => {
  return {
    type: LocationAction.RECEIVE_LOCATIONS,
    payload: {
      locationType: locationType,
      locationData: data
    }
  };
};

export const receiveSelectedLocation = (
  locationType: LocationType,
  data: any[]
): BaseActionInterface => {
  return {
    type: LocationAction.RECEIVE_SELECTED_LOCATION,
    payload: {
      locationType: locationType,
      locationData: data
    }
  };
};

export const receiveSelectedLocationDropdown = (
  locationType: LocationType,
  data: any
): BaseActionInterface => {
  return {
    type: LocationDropdownAction.RECEIVE_SELECTED_LOCATION_DROPDOWN,
    payload: {
      locationType: locationType,
      locationData: data
    }
  };
};

const receiveLocationDropdown = (
  locationType: LocationType,
  data: any[]
): BaseActionInterface => {
  return {
    type: LocationDropdownAction.RECEIVE_LOCATION_DROPDOWN,
    payload: {
      locationType: locationType,
      locationData: data
    }
  };
};

export const resetDropdown = (
  locationType: LocationType
): BaseActionInterface => {
  return {
    type: LocationDropdownAction.RESET_DROPDOWN,
    payload: locationType
  };
};

export const getAllCountries = (): ((dispatch: any) => any) => {
  // get all countries
  const mockReturnResult = getCountryMock();
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      console.log(mockReturnResult);
      const returnResult = await countryService.getAll();
      const result = returnResult.data.mockData;
      dispatch(receiveLocations(LocationType.Country, result));

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllCities = (countryId: number): ((dispatch: any) => any) => {
  // get all cities
  const mockReturnResult = getCityMock(countryId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      console.log(mockReturnResult);
      const returnResult = await cityService.getAll(countryId);
      const result = returnResult.data.mockData;
      dispatch(receiveLocations(LocationType.City, result));

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllRegions = (cityId: number): ((dispatch: any) => any) => {
  // get all regions
  const mockReturnResult = getRegionMock(cityId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      console.log(mockReturnResult);
      const returnResult = await regionService.getAll(cityId);
      const result = returnResult.data.mockData;
      dispatch(receiveLocations(LocationType.Region, result));

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getCountryForDropdown = (): ((dispatch: any) => any) => {
  // get all countries
  const mockReturnResult = getCountryMock();
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      console.log(mockReturnResult);
      const returnResult = await countryService.getAll();
      const result = returnResult.data.mockData;
      batch(() => {
        dispatch(resetDropdown(LocationType.Country));
        dispatch(receiveLocationDropdown(LocationType.Country, result));
        dispatch(receiveLocations(LocationType.Country, result));
      });

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getCityForDropdown = (
  countryId: number
): ((dispatch: any) => any) => {
  // get all cities
  const mockReturnResult = getCityMock(countryId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      console.log(mockReturnResult);
      const returnResult = await cityService.getAll(countryId);
      const result = returnResult.data.mockData;
      batch(() => {
        dispatch(resetDropdown(LocationType.City));
        dispatch(receiveLocationDropdown(LocationType.City, result));
        dispatch(receiveLocations(LocationType.City, result));
      });

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getRegionForDropdown = (
  cityId: number
): ((dispatch: any) => any) => {
  // get all regions
  const mockReturnResult = getRegionMock(cityId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      console.log(mockReturnResult);
      const returnResult = await regionService.getAll(cityId);
      const result = returnResult.data.mockData;
      batch(() => {
        dispatch(resetDropdown(LocationType.Region));
        dispatch(receiveLocationDropdown(LocationType.Region, result));
        dispatch(receiveLocations(LocationType.Region, result));
      });

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getCountryCityForDropdown = (
  countryId: number
): ((dispatch: any) => any) => {
  // get countries and cities
  const countryMockReturnResult = getCountryMock();
  const cityMockReturnResult = getCityMock(countryId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      console.log(countryMockReturnResult);
      console.log(cityMockReturnResult);

      const [countries, cities] = await Axios.all([
        countryService.getAll(),
        cityService.getAll(countryId)
      ]);

      const countryResult: Country[] = countries.data.mockData;
      const cityResult: City[] = cities.data.mockData;

      const selectedCountry = countryResult.find(x => x.id === countryId);
      if (selectedCountry === undefined) {
        return;
      }

      batch(() => {
        dispatch(receiveLocationDropdown(LocationType.Country, countryResult));
        dispatch(receiveLocationDropdown(LocationType.City, cityResult));
        dispatch(
          receiveSelectedLocationDropdown(
            LocationType.Country,
            new DropdownItem(selectedCountry?.id, selectedCountry?.name)
          )
        );
        dispatch(receiveLocations(LocationType.Country, countryResult));
        dispatch(receiveLocations(LocationType.City, cityResult));
      });

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getCountryCityRegionForDropdown = (
  countryId: number,
  cityId: number
): ((dispatch: any) => any) => {
  // get countries and cities
  const countryMockReturnResult = getCountryMock();
  const cityMockReturnResult = getCityMock(countryId);
  const regionMockReturnResult = getRegionMock(cityId);
  console.log(countryMockReturnResult);
  console.log(cityMockReturnResult);
  console.log(regionMockReturnResult);

  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      const [countries, cities, regions] = await Axios.all([
        countryService.getAll(),
        cityService.getAll(countryId),
        regionService.getAll(cityId)
      ]);

      const countryResult: Country[] = countries.data.mockData;
      const cityResult: City[] = cities.data.mockData;
      const regionResult: Region[] = regions.data.mockData;

      const selectedCountry = countryResult.find(x => x.id === countryId);
      const selectedCity = cityResult.find(x => x.id === cityId);
      if (selectedCountry === undefined || selectedCity === undefined) {
        return;
      }

      batch(() => {
        dispatch(receiveLocationDropdown(LocationType.Country, countryResult));
        dispatch(receiveLocationDropdown(LocationType.City, cityResult));
        dispatch(receiveLocationDropdown(LocationType.Region, regionResult));
        dispatch(
          receiveSelectedLocationDropdown(
            LocationType.Country,
            new DropdownItem(selectedCountry.id, selectedCountry.name)
          )
        );
        dispatch(
          receiveSelectedLocationDropdown(
            LocationType.City,
            new DropdownItem(selectedCity.id, selectedCity.name)
          )
        );
        dispatch(receiveLocations(LocationType.Country, countryResult));
        dispatch(receiveLocations(LocationType.City, cityResult));
        dispatch(receiveLocations(LocationType.Region, regionResult));
      });

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};
