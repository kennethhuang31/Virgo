import { receiveLocations, receiveSelectedLocation } from "./location-creator";
import { updateHttpRequestStatus } from "app-redux";
import { LocationType } from "models";
import { cityService } from "services";
import { getCityMock, getSelectedCityMock } from "mock/data";

export const getCities = (
  countryId: number
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = getCityMock(countryId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await cityService
      .getAll(countryId)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);
          // place to update state
          dispatch(receiveLocations(LocationType.City, result));
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
};

// TODO: remove countryId when not using mock data
export const getSelectedCity = (
  cityId: number,
  countryId: number
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = getSelectedCityMock(cityId, countryId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await cityService
      .getCityById(cityId)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);
          // place to update state
          dispatch(receiveSelectedLocation(LocationType.City, result));
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
};
