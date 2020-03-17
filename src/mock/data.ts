import Mock from "mockjs";
import { helperService } from "services/helperService";
import {
  Country,
  City,
  Region,
  AgentLevel,
  AgentStatus,
  Agent,
  OrderStatusEnum
} from "models";
const requestRootUrl = helperService.getApiEndpoint(true);

// agent
const agentRootUrl = `${requestRootUrl}/api/agent`;
// city
const cityRootUrl = `${requestRootUrl}/api/city`;
// country
const countryRootUrl = `${requestRootUrl}/api/country`;
// region
const regionRootUrl = `${requestRootUrl}/api/region`;
// service label
const serviceLabelRootUrl = `${requestRootUrl}/api/admin/serviceLabel`;
// user
const userRootUrl = `${requestRootUrl}/api/users`;
// order
const orderRootUrl = `${requestRootUrl}/api/Order`;

// **************************************************** //
//                    Object                            //
// **************************************************** //

// **************************************************** //
//                    Function                          //
// **************************************************** //

// ** order ** //
export const getOrderSummaryMock = (): Mock.Mockjs => {
  return Mock.mock(`${orderRootUrl}/orderSummary`, "get", {
    mockData: []
  });
};

// ** agent ** //
export const getAllAgentsMock = (): Mock.Mockjs => {
  return Mock.mock(`${agentRootUrl}`, "get", {
    "mockData|5": [
      {
        "id|+1": 1,
        displayId: "@string",
        status: AgentStatus.Online,
        storeName: "@string",
        email: "agent@agent.com",
        phone: "12345678910",
        contact: {
          name: "@string",
          phone: "123456789"
        },
        onlineTime: new Date(),
        agentLevel: {
          id: 1,
          name: "@string",
          deliverCommission: 10,
          pickupCommission: 20
        },
        region: {
          id: 1,
          name: "@string",
          chinese: "@string",
          cityId: 1,
          city: {
            id: 1,
            name: "@string",
            chinese: "@string",
            countryId: 1,
            country: {
              id: 1,
              name: "@string",
              chinese: "@string"
            }
          }
        },
        bankAccount: "@string"
      }
    ]
  });
};

export const getAgentMock = (id: number): Mock.Mockjs => {
  return Mock.mock(`${agentRootUrl}/${id}`, "get", {
    mockData: {
      id: id,
      displayId: "@string",
      status: AgentStatus.Online,
      storeName: "@string",
      email: "agent@agent.com",
      phone: "12345678910",
      contact: {
        name: "@string",
        phone: "123456789"
      },
      onlineTime: new Date(),
      agentLevel: {
        id: 1,
        name: "@string",
        deliverCommission: 10,
        pickupCommission: 20
      },
      region: {
        id: 1,
        name: "@string",
        chinese: "@string",
        cityId: 1,
        city: {
          id: 1,
          name: "@string",
          chinese: "@string",
          countryId: 1,
          country: {
            id: 1,
            name: "@string",
            chinese: "@string"
          }
        }
      },
      bankAccount: "@string"
    }
  });
};

export const updateAgentMock = (id: number, data: Agent): Mock.Mockjs => {
  return Mock.mock(`${agentRootUrl}/${id}`, "put", {
    mockData: {
      id: data.id,
      displayId: data.displayId,
      status: data.status,
      storeName: data.storeName,
      email: data.email,
      phone: data.phone,
      contact: data.contact,
      onlineTime: data.onlineTime,
      agentLevel: data.agentLevel,
      region: data.region,
      bankAccount: data.bankAccount
    }
  });
};

export const getAgentLevelSettingsMock = (): Mock.Mockjs => {
  return Mock.mock(`${agentRootUrl}/levelSettings`, "get", {
    "mockData|3": [
      {
        "id|+1": 1,
        name: "@string",
        deliverCommission: 0.1,
        pickupCommission: 0.1
      }
    ]
  });
};

export const createAgentLevelSettingMock = (data: AgentLevel): Mock.Mockjs => {
  return Mock.mock(`${agentRootUrl}/levelSettings`, "post", {
    mockData: 100
  });
};

export const updateAgentLevelSettingMock = (
  levelId: number,
  data: AgentLevel
): Mock.Mockjs => {
  return Mock.mock(`${agentRootUrl}/levelSettings/${levelId}`, "put", {
    mockData: {
      id: data.id,
      name: data.name,
      deliverCommission: data.deliverCommission,
      pickupCommission: data.pickupCommission
    }
  });
};

export const deleteAgentLevelSettingMock = (levelId: number): Mock.Mockjs => {
  return Mock.mock(`${agentRootUrl}/levelSettings/${levelId}`, "delete", {
    mockData: {}
  });
};

// ** city ** //
export const getCityMock = (countryId: number): Mock.Mockjs => {
  return Mock.mock(`${cityRootUrl}?country=${countryId}`, "get", {
    "mockData|3": [
      {
        "id|+1": 1,
        name: "@string",
        chinese: "@string",
        countryId: countryId
      }
    ]
  });
};

export const getSelectedCityMock = (
  cityId: number,
  countryId: number
): Mock.Mockjs => {
  return Mock.mock(`${cityRootUrl}/${cityId}`, "get", {
    mockData: {
      id: 1,
      name: "@string",
      chinese: "@string",
      countryId: countryId
    }
  });
};

export const createNewCityMock = (): Mock.Mockjs => {
  return Mock.mock(`${cityRootUrl}`, "post", {
    mockData: 100
  });
};

export const updateCityMock = (updatedCity: City): Mock.Mockjs => {
  return Mock.mock(`${cityRootUrl}/${updatedCity.id}`, "put", {
    mockData: {
      id: updatedCity.id,
      name: updatedCity.name,
      chinese: updatedCity.chinese,
      countryId: updatedCity.countryId
    }
  });
};

export const deleteCityMock = (id: number): Mock.Mockjs => {
  return Mock.mock(`${cityRootUrl}/${id}`, "delete", {
    mockData: {}
  });
};

// ** country ** //
export const getCountryMock = (): Mock.Mockjs => {
  return Mock.mock(`${countryRootUrl}`, "get", {
    "mockData|3": [
      {
        "id|+1": 1,
        name: "@string",
        chinese: "@string"
      }
    ]
  });
};

export const getSelectedCountryMock = (countryId: number): Mock.Mockjs => {
  return Mock.mock(`${countryRootUrl}/${countryId}`, "get", {
    mockData: {
      id: 1,
      name: "@string",
      chinese: "@string"
    }
  });
};

export const createNewCountryMock = (): Mock.Mockjs => {
  return Mock.mock(`${countryRootUrl}`, "post", {
    mockData: 100
  });
};

export const updateCountryMock = (updatedCountry: Country): Mock.Mockjs => {
  return Mock.mock(`${countryRootUrl}/${updatedCountry.id}`, "put", {
    mockData: {
      id: updatedCountry.id,
      name: updatedCountry.name,
      chinese: updatedCountry.chinese
    }
  });
};

export const deleteCountryMock = (id: number): Mock.Mockjs => {
  return Mock.mock(`${countryRootUrl}/${id}`, "delete", {
    mockData: {}
  });
};

// ** region ** //
export const getRegionMock = (cityId: number): Mock.Mockjs => {
  return Mock.mock(`${regionRootUrl}?city=${cityId}`, "get", {
    "mockData|3": [
      {
        "id|+1": 1,
        name: "@string",
        chinese: "@string",
        cityId: cityId
      }
    ]
  });
};

export const getSelectedRegionMock = (
  regionId: number,
  cityId: number
): Mock.Mockjs => {
  return Mock.mock(`${regionRootUrl}/${regionId}`, "get", {
    mockData: {
      id: 1,
      name: "@string",
      chinese: "@string",
      cityId: cityId
    }
  });
};

export const createNewRegionMock = (): Mock.Mockjs => {
  return Mock.mock(`${regionRootUrl}`, "post", {
    mockData: 100
  });
};

export const updateRegionMock = (updatedRegion: Region): Mock.Mockjs => {
  return Mock.mock(`${regionRootUrl}/${updatedRegion.id}`, "put", {
    mockData: {
      id: updatedRegion.id,
      name: updatedRegion.name,
      chinese: updatedRegion.chinese,
      cityId: updatedRegion.cityId
    }
  });
};

export const deleteRegionMock = (id: number): Mock.Mockjs => {
  return Mock.mock(`${regionRootUrl}/${id}`, "delete", {
    mockData: {}
  });
};

// ** user ** //
export const getLoginUserMock = (): Mock.Mockjs => {
  return Mock.mock(`${userRootUrl}/login`, "post", {
    mockData: {
      result: "Succeed",
      token: "@string",
      message: "@string"
    }
  });
};

// ** service label ** //
export const getRootServiceLabelMock = (): Mock.Mockjs => {
  return Mock.mock(`${serviceLabelRootUrl}?parentLabel=`, "get", {
    "mockData|3": [
      {
        "id|+1": 1,
        name: "@string"
      }
    ]
  });
};

export const getLevelSecondServiceLabelMock = (
  parentId: number
): Mock.Mockjs => {
  return Mock.mock(`${serviceLabelRootUrl}?parentLabel=${parentId}`, "get", {
    "mockData|3": [
      {
        "id|+1": 10,
        name: "@string",
        parentLabelId: parentId
      }
    ]
  });
};

export const getLevelThreeServiceLabelMock = (
  parentId: number
): Mock.Mockjs => {
  return Mock.mock(`${serviceLabelRootUrl}?parentLabel=${parentId}`, "get", {
    "mockData|3": [
      {
        "id|+1": 20,
        name: "@string",
        parentLabelId: parentId,
        imageUrl: "@string",
        notUrgentDays: 14,
        urgentDays: 10,
        "discount|+1": 10
      }
    ]
  });
};

export const getLevelFourServiceLabelMock = (parentId: number): Mock.Mockjs => {
  return Mock.mock(`${serviceLabelRootUrl}?parentLabel=${parentId}`, "get", {
    "mockData|3": [
      {
        "id|+1": 30,
        name: "@string",
        parentLabelId: parentId
      }
    ]
  });
};

export const getLevelFiveServiceLabelMock = (parentId: number): Mock.Mockjs => {
  return Mock.mock(`${serviceLabelRootUrl}?parentLabel=${parentId}`, "get", {
    "mockData|3": [
      {
        "id|+1": 40,
        name: "@string",
        parentLabelId: parentId
      }
    ]
  });
};

export const getLevelSixServiceLabelMock = (parentId: number): Mock.Mockjs => {
  return Mock.mock(`${serviceLabelRootUrl}?parentLabel=${parentId}`, "get", {
    "mockData|3": [
      {
        "id|+1": 50,
        beforeImageUrl: "@string",
        afterImageUrl: "@string",
        content: {
          enContent: "@string",
          cnContent: "@string"
        },
        parentLabelId: parentId,
        notUrgentDays: 14,
        urgentDays: 10,
        notUrgentCost: 14,
        urgentCost: 10
      }
    ]
  });
};

export const getLevelSevenServiceLabelMock = (
  parentId: number
): Mock.Mockjs => {
  return Mock.mock(`${serviceLabelRootUrl}?parentLabel=${parentId}`, "get", {
    "mockData|3": [
      {
        "id|+1": 60,
        minValue: 20,
        maxValue: 100,
        cost: 100,
        parentLabelId: parentId
      }
    ]
  });
};
