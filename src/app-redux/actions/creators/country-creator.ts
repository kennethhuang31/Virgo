import { receiveLocations, receiveSelectedLocation } from "./location-creator";
import { updateHttpRequestStatus } from "app-redux";
import { LocationType } from "models";
import { countryService } from "services";
import { getCountryMock, getSelectedCountryMock } from "mock/data";

export const getCountries = (): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = getCountryMock();
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await countryService
      .getAll()
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);
          // place to update state
          dispatch(receiveLocations(LocationType.Country, result));
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

export const getSelectedCountry = (
  countryId: number
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = getSelectedCountryMock(countryId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await countryService
      .getCountryById(countryId)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);
          // place to update state
          dispatch(receiveSelectedLocation(LocationType.Country, result));
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
