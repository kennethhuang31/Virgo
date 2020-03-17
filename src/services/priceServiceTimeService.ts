import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import {
  ServiceLevelBrief,
  ServiceLevelPostBrief,
  ServiceLevelPutBrief
} from "../models";
import { authService } from "./authService";

class PriceServiceTimeService {
  apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(
      false
    )}/api/Admin/Service`;

    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  // get LevelData
  async getLevelData(level: number): Promise<AxiosResponse<any[]>> {
    return axios.get(`${this.apiEndpoint}`);
  }

  async getLevelDataByParentId(
    parentId: number
  ): Promise<AxiosResponse<any[]>> {
    return axios.get(
      `${this.apiEndpoint}/GetNextChildreanServiceByParentId?ParentId=${parentId}`
    );
  }

  async postLevelData(
    data: ServiceLevelPostBrief
  ): Promise<AxiosResponse<any[]>> {
    return axios.post(`${this.apiEndpoint}`, data, this.httpRequestConfig);
  }

  async putLevelData(
    id: number,
    data: ServiceLevelPutBrief
  ): Promise<AxiosResponse<any[]>> {
    return axios.put(`${this.apiEndpoint}/${id}`, data, this.httpRequestConfig);
  }

  async deleteLevelData(id: number): Promise<AxiosResponse<any[]>> {
    return axios.delete(`${this.apiEndpoint}/${id}`, this.httpRequestConfig);
  }

  async putImagesData(
    id: number,
    imageFormData: any
  ): Promise<AxiosResponse<any[]>> {
    return axios.put(
      `${this.apiEndpoint}/${id}/UploadServiceIcon`,
      imageFormData,
      this.httpRequestConfig
    );
  }
}

export const priceServiceTimeService = new PriceServiceTimeService();
