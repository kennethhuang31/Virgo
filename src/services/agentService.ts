import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { helperService } from "./helperService";
import { authService } from "./authService";
import {
  Agent,
  AgentBusinessSummaryDto,
  AgentLevel,
  AgentCreateDto
} from "models";
import { MockResult } from "mock/mockResult";

class AgentService {
  private apiEndpoint: string;
  private httpRequestConfig: AxiosRequestConfig;
  constructor() {
    this.apiEndpoint = `${helperService.getApiEndpoint(true)}/api/agent`;
    this.httpRequestConfig = {
      headers: {
        Authorization: "Bearer " + authService.getAccessToken()
      }
    };
  }

  async getAll(): Promise<AxiosResponse<MockResult<Agent[]>>> {
    return await Axios.get(`${this.apiEndpoint}`, this.httpRequestConfig);
  }

  async searchAgents(
    query: string
  ): Promise<AxiosResponse<MockResult<Agent[]>>> {
    return await Axios.get(
      `${this.apiEndpoint}${query}`,
      this.httpRequestConfig
    );
  }

  async getAgent(agentId: number): Promise<AxiosResponse<MockResult<Agent>>> {
    return await Axios.get(
      `${this.apiEndpoint}/${agentId}`,
      this.httpRequestConfig
    );
  }

  async updateAgent(
    agentId: number,
    data: any
  ): Promise<AxiosResponse<MockResult<Agent>>> {
    return await Axios.put(
      `${this.apiEndpoint}/${agentId}`,
      data,
      this.httpRequestConfig
    );
  }

  async createAgent(
    data: AgentCreateDto
  ): Promise<AxiosResponse<MockResult<number>>> {
    return await Axios.post(
      `${this.apiEndpoint}`,
      data,
      this.httpRequestConfig
    );
  }

  async getAgentLevelSettings(): Promise<
    AxiosResponse<MockResult<AgentLevel[]>>
  > {
    return await Axios.get(
      `${this.apiEndpoint}/levelSettings`,
      this.httpRequestConfig
    );
  }

  async createAgentLevelSetting(
    data: AgentLevel
  ): Promise<AxiosResponse<MockResult<number>>> {
    return await Axios.post(
      `${this.apiEndpoint}/levelSettings`,
      data,
      this.httpRequestConfig
    );
  }

  async updateAgentLevelSetting(
    levelId: number,
    data: AgentLevel
  ): Promise<AxiosResponse<MockResult<AgentLevel>>> {
    return await Axios.put(
      `${this.apiEndpoint}/levelSettings/${levelId}`,
      data,
      this.httpRequestConfig
    );
  }

  async deleteAgentLevelSetting(
    levelId: number
  ): Promise<AxiosResponse<MockResult<void>>> {
    return await Axios.delete(
      `${this.apiEndpoint}/levelSettings/${levelId}`,
      this.httpRequestConfig
    );
  }

  async getAgentBusinessSummary(
    agentId: number
  ): Promise<AxiosResponse<MockResult<AgentBusinessSummaryDto>>> {
    return await Axios.get(
      `${this.apiEndpoint}/${agentId}/businessSummary`,
      this.httpRequestConfig
    );
  }
}

export const agentService = new AgentService();
