import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";

class AuthService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(true)}/api/users`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + this.getAccessToken()
      }
    };
  }
  saveJwt(token: string): void {
    localStorage.setItem("access_token", token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }
}

export const authService = new AuthService();
