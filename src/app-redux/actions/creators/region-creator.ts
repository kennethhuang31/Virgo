import { receiveLocations, receiveSelectedLocation } from "./location-creator";
import { updateHttpRequestStatus } from "app-redux";
import { LocationType } from "models";
import { regionService } from "services";
import { getRegionMock, getSelectedRegionMock } from "mock/data";

export const getRegions = (
  cityId: number
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = getRegionMock(cityId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await regionService
      .getAll(cityId)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);
          // place to update state
          dispatch(receiveLocations(LocationType.Region, result));
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

// TODO: remove cityId when not using mock data
export const getSelectedRegion = (
  regionId: number,
  cityId: number
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = getSelectedRegionMock(regionId, cityId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await regionService
      .getRegionById(regionId)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);
          // place to update state
          dispatch(receiveSelectedLocation(LocationType.Region, result));
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
