import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";
import { AdminUserCreateDto } from "models";
import { MockResult } from "mock/mockResult";

class AdminService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(true)}/api/admin`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  async getAdminUsers(): Promise<AxiosResponse<MockResult<any>>> {
    return await Axios.get(`${this.apiEndpoint}/users`, this.httpRequestConfig);
  }

  async createAdminUser(user: AdminUserCreateDto): Promise<AxiosResponse<any>> {
    return await Axios.post(
      `${this.apiEndpoint}/users`,
      user,
      this.httpRequestConfig
    );
  }

  async updateAdminPermission(userId: number, data: any): Promise<any> {
    return await Axios.put(
      `${this.apiEndpoint}/${userId}/updateAdminPermission`,
      data,
      this.httpRequestConfig
    );
  }

  async updateCourierRegion(userId: number, data: any): Promise<any> {
    return await Axios.put(
      `${this.apiEndpoint}/${userId}/updateCourierRegion`,
      data,
      this.httpRequestConfig
    );
  }
}

export const adminService = new AdminService();
