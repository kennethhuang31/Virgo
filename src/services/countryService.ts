import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";
import { Country } from "models";
import { MockResult } from "mock/mockResult";

class CountryService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(true)}/api/country`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  async getAll(): Promise<AxiosResponse<MockResult<Country[]>>> {
    return await Axios.get(`${this.apiEndpoint}`, this.httpRequestConfig);
  }

  async getCountryById(
    countryId: number
  ): Promise<AxiosResponse<MockResult<Country>>> {
    return await Axios.get(
      `${this.apiEndpoint}/${countryId}`,
      this.httpRequestConfig
    );
  }

  async createCountry(
    data: Country
  ): Promise<AxiosResponse<MockResult<number>>> {
    return await Axios.post(
      `${this.apiEndpoint}`,
      data,
      this.httpRequestConfig
    );
  }

  async updateCountry(
    countryId: number,
    data: Country
  ): Promise<AxiosResponse<MockResult<Country>>> {
    return await Axios.put(
      `${this.apiEndpoint}/${countryId}`,
      data,
      this.httpRequestConfig
    );
  }

  async deleteCountry(
    countryId: number
  ): Promise<AxiosResponse<MockResult<void>>> {
    return await Axios.delete(
      `${this.apiEndpoint}/${countryId}`,
      this.httpRequestConfig
    );
  }
}

export const countryService = new CountryService();
