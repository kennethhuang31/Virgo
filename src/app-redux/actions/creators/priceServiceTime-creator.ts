import { store } from "../../store";
import { PriceServiceTimeAction } from "../constant";
import { BaseActionInterface } from "./interface";
import {
  ServiceLevelBrief,
  ServiceLevelPostBrief,
  ServiceLevelPutBrief
} from "../../../models";
import { priceServiceTimeService } from "../../../services";

export const requestLevelData = (): BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.REQUEST_FTECH_LEVEL_DATA
  };
};

export const receiveLevelData = (
  data: ServiceLevelBrief[]
): BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.RECEIVE_FTECH_LEVEL_DATA_RESULT,
    payload: data
  };
};

export const receiveLevelDataError = (): // data: ServiceLevelBrief[]
BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.RECEIVE_FTECH_LEVEL_DATA_ERROR
    // payload: data
  };
};

export function fetchDataByLevelFromServer(level: number): () => Promise<void> {
  return async () => {
    store.dispatch(requestLevelData());
    return await priceServiceTimeService.getLevelData(level).then(
      response => {
        const result = response["data"];

        // console.log(result);
        store.dispatch(receiveLevelData(result));
      },
      error => {
        console.warn("error is: ", error);
        store.dispatch(receiveLevelDataError());
      }
    );
  };
}

export const requestLevelDataByParentId = (): BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.REQUEST_FTECH_LEVEL_DATA_BY_PARENT
  };
};

export const receiveLevelDataByParentId = (
  data: ServiceLevelBrief[]
): BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.RECEIVE_FTECH_LEVEL_DATA_RESULT_BY_PARENT,
    payload: data
  };
};

export const receiveLevelDataErrorByParentId = (): // data: ServiceLevelBrief[]
BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.RECEIVE_FTECH_LEVEL_DATA_ERROR_BY_PARENT
    // payload: data
  };
};

export function fetchDataByParentIdFromServer(
  parentId: number
): () => Promise<void> {
  return async () => {
    store.dispatch(requestLevelDataByParentId());
    return await priceServiceTimeService.getLevelDataByParentId(parentId).then(
      response => {
        const result = response["data"];

        // console.log(result);
        store.dispatch(receiveLevelDataByParentId(result));
      },
      error => {
        console.warn("error is: ", error);
        store.dispatch(receiveLevelDataErrorByParentId());
      }
    );
  };
}

export const postLevelData = (): BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.POST_LEVEL_DATA
  };
};

export const postLevelDataResult = (): // data: ServiceLevelBrief[]
BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.POST_LEVEL_DATA_RESULT //,
    // payload: data
  };
};

export const postLevelDataResultError = (): // data: ServiceLevelBrief[]
BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.POST_LEVEL_DATA_ERROR //,
    // payload: data
  };
};

export function postDataToServer(
  data: ServiceLevelPostBrief
): () => Promise<void> {
  return async () => {
    store.dispatch(postLevelData());
    return await priceServiceTimeService.postLevelData(data).then(
      response => {
        const result = response["data"];

        // console.log(result);
        store.dispatch(postLevelDataResult(/*result*/));
      },
      error => {
        console.warn("error is: ", error);
        store.dispatch(postLevelDataResultError());
      }
    );
  };
}

export const putLevelData = (): BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.PUT_LEVEL_DATA
  };
};

export const putLevelDataResult = (): // data: ServiceLevelBrief[]
BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.PUT_LEVEL_DATA_RESULT //,
    // payload: data
  };
};

export const putLevelDataResultError = (): // data: ServiceLevelBrief[]
BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.PUT_LEVEL_DATA_ERROR //,
    // payload: data
  };
};

export function putDataToServer(
  id: number,
  data: ServiceLevelPutBrief,
  imageFormData?: any
): () => Promise<void> {
  return async () => {
    store.dispatch(putLevelData());

    if (undefined !== imageFormData) {
      const p1 = priceServiceTimeService.putLevelData(id, data);
      const p2 = priceServiceTimeService.putImagesData(id, imageFormData);

      Promise.all([p1, p2]).then(
        response => {
          // const result = response["data"];

          console.log(response);
          store.dispatch(putLevelDataResult(/*result*/));
        },
        error => {
          console.warn("error is: ", error);
          store.dispatch(putLevelDataResultError());
        }
      );
    } else {
      store.dispatch(putLevelData());
      return await priceServiceTimeService.putLevelData(id, data).then(
        response => {
          const result = response["data"];

          // console.log(result);
          store.dispatch(putLevelDataResult(/*result*/));
        },
        error => {
          console.warn("error is: ", error);
          store.dispatch(putLevelDataResultError());
        }
      );
    }
  };
}

export const deleteLevelData = (): BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.DELETE_LEVEL_DATA
  };
};

export const deleteLevelDataResult = (): // data: ServiceLevelBrief[]
BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.DELETE_LEVEL_DATA_RESULT //,
    // payload: data
  };
};

export const deleteLevelDataResultError = (): // data: ServiceLevelBrief[]
BaseActionInterface => {
  return {
    type: PriceServiceTimeAction.DELETE_LEVEL_DATA_ERROR //,
    // payload: data
  };
};

export function deleteDataToServer(id: number): () => Promise<void> {
  return async () => {
    store.dispatch(deleteLevelData());
    return await priceServiceTimeService.deleteLevelData(id).then(
      response => {
        const result = response["data"];

        // console.log(result);
        store.dispatch(deleteLevelDataResult(/*result*/));
      },
      error => {
        console.warn("error is: ", error);
        store.dispatch(deleteLevelDataResultError());
      }
    );
  };
}
