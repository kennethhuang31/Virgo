import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";

class OrderService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(false)}/api/AdminOrder`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  async getOrderSummary(): Promise<AxiosResponse> {
    return await Axios.get(`${this.apiEndpoint}`, this.httpRequestConfig);
  }

  async getOrderDetail(id: string): Promise<AxiosResponse> {
    return await Axios.get(`${this.apiEndpoint}/${id}`, this.httpRequestConfig);
  }

  async cancelOrder(id: string, comment: string): Promise<AxiosResponse> {
    return await Axios.delete(
      `${this.apiEndpoint}/ConfrimedCancelItem/${id}?Comment=${comment}`,
      this.httpRequestConfig
    );
  }
}

export const orderService = new OrderService();
