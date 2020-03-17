import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";
import { City } from "models";
import { MockResult } from "mock/mockResult";

class CityService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(true)}/api/city`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  async getAll(countryId: number): Promise<AxiosResponse<MockResult<City[]>>> {
    return await Axios.get(
      `${this.apiEndpoint}?country=${countryId}`,
      this.httpRequestConfig
    );
  }

  async getCityById(cityId: number): Promise<AxiosResponse<MockResult<City>>> {
    return await Axios.get(
      `${this.apiEndpoint}/${cityId}`,
      this.httpRequestConfig
    );
  }

  async createCity(data: City): Promise<AxiosResponse<MockResult<number>>> {
    return await Axios.post(
      `${this.apiEndpoint}`,
      data,
      this.httpRequestConfig
    );
  }

  async updateCity(
    cityId: number,
    data: City
  ): Promise<AxiosResponse<MockResult<City>>> {
    return await Axios.put(
      `${this.apiEndpoint}/${cityId}`,
      data,
      this.httpRequestConfig
    );
  }

  async deleteCity(cityId: number): Promise<AxiosResponse<MockResult<void>>> {
    return await Axios.delete(
      `${this.apiEndpoint}/${cityId}`,
      this.httpRequestConfig
    );
  }
}

export const cityService = new CityService();
