import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";
import { WorkerPermission } from "models";

export class WorkerService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(true)}/api/`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  // CheckAppConfig(): any {
  //   return this.requestURL;
  // }
  // GetAdminUsers(): WorkerPermission[] {
  //   return [
  //     {
  //       selected: false,
  //       name: "CreateScanCode",
  //       displayName: "二维码生成功能"
  //     },
  //     {
  //       selected: true,
  //       name: "SearchScanCode",
  //       displayName: "二维码生成功能"
  //     }
  //   ];
  // }
}
