import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";

class CustomerService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(
      false
    )}/api/AdminCustomer`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  async getCustomerSummary(): Promise<AxiosResponse> {
    return await Axios.get(`${this.apiEndpoint}`, this.httpRequestConfig);
  }

  async getCustomerDetail(id: string): Promise<AxiosResponse> {
    return await Axios.get(`${this.apiEndpoint}/${id}`, this.httpRequestConfig);
  }

  async topUpWallet(
    id: number,
    amount: number,
    comment: string
  ): Promise<AxiosResponse> {
    return await Axios.post(
      `${this.apiEndpoint}/AdminTopUpUserWallet/${id}`,
      {
        Amount: amount,
        Comment: comment
      },
      this.httpRequestConfig
    );
  }

  async deductWallet(
    id: number,
    amount: number,
    comment: string
  ): Promise<AxiosResponse> {
    return await Axios.post(
      `${this.apiEndpoint}/AdminDeductUserWallet/${id}`,
      {
        Amount: amount,
        Comment: comment
      },
      this.httpRequestConfig
    );
  }
}

export const customerService = new CustomerService();
