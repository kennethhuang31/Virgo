import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";
import { Region } from "models";
import { MockResult } from "mock/mockResult";

class RegionService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(true)}/api/region`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  async getAll(cityId: number): Promise<AxiosResponse<MockResult<Region[]>>> {
    return await Axios.get(
      `${this.apiEndpoint}?city=${cityId}`,
      this.httpRequestConfig
    );
  }

  async getRegionById(
    regionId: number
  ): Promise<AxiosResponse<MockResult<Region>>> {
    return await Axios.get(
      `${this.apiEndpoint}/${regionId}`,
      this.httpRequestConfig
    );
  }

  async createRegion(data: Region): Promise<AxiosResponse<MockResult<number>>> {
    return await Axios.post(
      `${this.apiEndpoint}`,
      data,
      this.httpRequestConfig
    );
  }

  async updateRegion(
    regionId: number,
    data: Region
  ): Promise<AxiosResponse<MockResult<Region>>> {
    return await Axios.put(
      `${this.apiEndpoint}/${regionId}`,
      data,
      this.httpRequestConfig
    );
  }

  async deleteRegion(
    regionId: number
  ): Promise<AxiosResponse<MockResult<void>>> {
    return await Axios.delete(
      `${this.apiEndpoint}/${regionId}`,
      this.httpRequestConfig
    );
  }
}

export const regionService = new RegionService();
