import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";
import { MockResult } from "mock/mockResult";

class ServiceLabelService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(
      true
    )}/api/admin/serviceLabel`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  // return service labels
  async getServiceLabelsByParentId<T>(
    labelId?: number
  ): Promise<AxiosResponse<MockResult<T>>> {
    return await Axios.get(
      `${this.apiEndpoint}?parentLabel=${labelId}`,
      this.httpRequestConfig
    );
  }
}

export const serviceLabelService = new ServiceLabelService();
