import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";
import { MockResult } from "mock/mockResult";
import { UserLogin } from "models";

class UserService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(true)}/api/users`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  async login(userLogin: UserLogin): Promise<any> {
    return await Axios.post(
      `${this.apiEndpoint}/login`,
      userLogin,
      this.httpRequestConfig
    );
  }

  logout() {
    return 1;
  }
}

export const userService = new UserService();
