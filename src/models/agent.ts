import { AgentStatus } from "./enum";
import { Region } from "./location";

export class AgentContact {
  name: string;
  phone: string;
}

export class AgentContactCreateDto {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export class AgentLevel {
  id: number;
  name: string;
  deliverCommission: number;
  pickupCommission: number;
}

export class Agent {
  id: number;
  displayId: string;
  status: AgentStatus;
  storeName: string;
  email: string;
  phone: string;
  contact: AgentContact;
  onlineTime: Date;
  agentLevel: AgentLevel;
  region: Region;
  bankAccount: string;
}

export class AgentCreateDto {
  status: AgentStatus;
  storeName: string;
  email: string;
  phone: string;
  contact: AgentContactCreateDto;
  onlineTime?: Date;
  agentLevelId: number;
  regionId: number;
  bankAccount: string;
}

export class AgentBusinessSummary {
  date: Date;
  deliveryTotalNumber: number;
  pickupTotalNumber: number;
  salary: number;
  report: number;
  itemBrokenNumber: number;
  complainTotalNumber: number;
}

export class AgentBusinessSummaryDto {
  id: number;
  summaries: AgentBusinessSummary[];
}

export class AgentFilter {
  name?: string;
  phone?: string;
  email?: string;
  agentLevelId?: number;
  countryId?: number;
  cityId?: number;
  regionId?: number;
  agentStatus?: AgentStatus;
  itemTotal?: string;
  salary?: string;
  onlineTime?: string;

  constructor(
    name?: string,
    phone?: string,
    email?: string,
    agentLevelId?: number,
    countryId?: number,
    cityId?: number,
    regionId?: number,
    agentStatus?: AgentStatus,
    itemTotal?: string,
    salary?: string,
    onlineTime?: string
  ) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.agentLevelId = agentLevelId;
    this.countryId = countryId;
    this.cityId = cityId;
    this.regionId = regionId;
    this.agentStatus = agentStatus;
    this.itemTotal = itemTotal;
    this.salary = salary;
    this.onlineTime = onlineTime;
  }

  createQuery(): string {
    let url = "?";
    if (this.name !== undefined) {
      url += `name=${this.name}`;
    }
    if (this.phone !== undefined) {
      url += `phone=${this.phone}`;
    }
    if (this.email !== undefined) {
      url += `email=${this.email}`;
    }
    if (this.agentLevelId !== undefined) {
      url += `agentLevel=${this.agentLevelId}`;
    }
    if (this.countryId !== undefined) {
      url += `country=${this.countryId}`;
    }
    if (this.cityId !== undefined) {
      url += `city=${this.cityId}`;
    }
    if (this.regionId !== undefined) {
      url += `region=${this.regionId}`;
    }
    if (this.agentStatus !== undefined) {
      url += `agentStatus=${this.agentStatus}`;
    }
    if (this.itemTotal !== undefined) {
      url += `itemTotal=${this.itemTotal}`;
    }
    if (this.salary !== undefined) {
      url += `salary=${this.salary}`;
    }
    if (this.onlineTime !== undefined) {
      url += `name=${this.onlineTime}`;
    }
    return url;
  }
}

export class AgentBriefInfo {
  id: number;
  displayId: string;
}
