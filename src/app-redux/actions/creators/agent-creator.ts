import { batch } from "react-redux";
import {
  AgentAction,
  AgentLevelSettingAction,
  AgentModalAction,
  AgentDropdownAction
} from "../constant";
import { updateHttpRequestStatus } from "app-redux";
import { agentService } from "services";
import { BaseActionInterface } from "./interface";
import { Agent, AgentLevel, AgentBriefInfo, DropdownItem } from "models";
import {
  getAgentLevelSettingsMock,
  updateAgentLevelSettingMock,
  createAgentLevelSettingMock,
  deleteAgentLevelSettingMock,
  getAllAgentsMock,
  getAgentMock,
  updateAgentMock
} from "mock/data";

// agents //
const receiveAgents = (data: Agent[]): BaseActionInterface => {
  return {
    type: AgentAction.RECEIVE_AGENTS,
    payload: data
  };
};

export const receiveSelectedAgentBrief = (
  data: AgentBriefInfo
): BaseActionInterface => {
  return {
    type: AgentAction.RECEIVE_SELECTED_AGENT_BRIEF,
    payload: data
  };
};

// TODO: use AgentDetail model
const receiveSelectedAgentDetail = (data: Agent): BaseActionInterface => {
  return {
    type: AgentAction.RECEIVE_SELECTED_AGENT_DETAIL,
    payload: data
  };
};

const updateAgentCountNumber = (data: Agent[]): BaseActionInterface => {
  const countNumber = data.length;
  return {
    type: AgentAction.UPDATE_AGENT_COUNT,
    payload: countNumber
  };
};

const receiveUpdatedAgent = (
  agentId: number,
  agentDetail: Agent
): BaseActionInterface => {
  return {
    type: AgentAction.UPDATE_AGENT_DETAIL,
    payload: {
      agentId: agentId,
      agentDetail: agentDetail
    }
  };
};

export const getAllAgents = (): ((dispatch: any) => any) => {
  // use mock data
  const mockReturnResult = getAllAgentsMock();
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      console.log(mockReturnResult);
      const response = await agentService.getAll();
      const result = response.data.mockData;
      console.log("mock result is: ", result);

      batch(() => {
        dispatch(receiveAgents(result));
        dispatch(updateAgentCountNumber(result));
      });

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getFilteredAgents = (
  filter: string
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  // TODO: change mock data
  const mockReturnResult = getAllAgentsMock();
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await agentService
      .searchAgents(filter)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);

          dispatch(receiveAgents(result));
          dispatch(updateAgentCountNumber(result));
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
};

export const getAgentDetail = (agentId: number): ((dispatch: any) => any) => {
  // use mock data
  const mockReturnResult = getAgentMock(agentId);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await agentService
      .getAgent(agentId)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);

          dispatch(receiveSelectedAgentDetail(result));
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
};

export const displayAgentComplainModal = (
  display: boolean
): BaseActionInterface => {
  return display
    ? {
        type: AgentModalAction.DISPLAY_AGENT_COMPLAIN_MODAL
      }
    : {
        type: AgentModalAction.HIDE_AGENT_COMPLAIN_MODAL
      };
};

export const displayAgentEditModal = (
  display: boolean
): BaseActionInterface => {
  return display
    ? {
        type: AgentModalAction.DISPLAY_AGENT_EDIT_MODAL
      }
    : {
        type: AgentModalAction.HIDE_AGENT_EDIT_MODAL
      };
};

export const updateAgentDetail = (
  agentId: number,
  agentDetail: Agent
): ((dispatch: any) => any) => {
  // use mock data
  const mockReturnResult = updateAgentMock(agentId, agentDetail);
  console.log(mockReturnResult);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    try {
      const returnResult = await agentService.updateAgent(agentId, agentDetail);
      const result = returnResult.data.mockData;

      // use return result or agentDetail
      batch(() => {
        dispatch(receiveUpdatedAgent(agentId, result));
        dispatch(displayAgentEditModal(false));
      });

      // TODO: remove the timeout when it's interacting with backend
      setTimeout(() => {
        console.log("simulate http request...");
        dispatch(updateHttpRequestStatus(false));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
};

// agent level settings //
const receiveAgentLevelSettings = (data: AgentLevel[]): BaseActionInterface => {
  return {
    type: AgentLevelSettingAction.RECEIVE_LEVEL_SETTINGS,
    payload: data
  };
};

const receiveAgentLevelSettingDropdown = (
  data: AgentLevel[]
): BaseActionInterface => {
  const dropdown: DropdownItem[] = [];
  data.forEach((level: AgentLevel) => {
    const levelDropdown = new DropdownItem(level.id, level.name);
    dropdown.push(levelDropdown);
  });
  return {
    type: AgentDropdownAction.RECEIVE_AGENT_LEVEL_SETTING_DROPDOWN,
    payload: dropdown
  };
};

const receiveNewAgentLevelSetting = (data: AgentLevel): BaseActionInterface => {
  return {
    type: AgentLevelSettingAction.CREATE_LEVEL_SETTING,
    payload: data
  };
};

const receiveUpdatedAgentLevelSetting = (
  id: number,
  data: AgentLevel
): BaseActionInterface => {
  return {
    type: AgentLevelSettingAction.UPDATE_LEVEL_SETTING,
    payload: {
      id: id,
      data: data
    }
  };
};

const receiveDeletedAgentLevelSetting = (id: number): BaseActionInterface => {
  return {
    type: AgentLevelSettingAction.DELETE_LEVEL_SETTING,
    payload: id
  };
};

export const selectAgentLevelSettingForEdit = (
  data: AgentLevel
): BaseActionInterface => {
  return {
    type: AgentLevelSettingAction.SELECT_LEVEL_SETTING,
    payload: data
  };
};

export const displayAgentLevelSettingEditModal = (
  display: boolean
): BaseActionInterface => {
  return display
    ? {
        type: AgentLevelSettingAction.DISPLAY_LEVEL_SETTING_EDIT_MODAL
      }
    : {
        type: AgentLevelSettingAction.HIDE_LEVEL_SETTING_EDIT_MODAL
      };
};

export const displayAgentLevelSettingDeleteConfirmModal = (
  display: boolean
): BaseActionInterface => {
  return display
    ? {
        type: AgentLevelSettingAction.DISPLAY_LEVEL_SETTING_CONFIRM_MODAL
      }
    : {
        type: AgentLevelSettingAction.HIDE_LEVEL_SETTING_CONFIRM_MODAL
      };
};

export const getAgentLevelSettings = (): ((dispatch: any) => any) => {
  // use mock data
  const mockReturnResult = getAgentLevelSettingsMock();
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await agentService
      .getAgentLevelSettings()
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);

          batch(() => {
            dispatch(receiveAgentLevelSettings(result));
            dispatch(receiveAgentLevelSettingDropdown(result));
          });
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
};

export const updateAgentLevelSetting = (
  id: number,
  data: AgentLevel
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = updateAgentLevelSettingMock(id, data);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await agentService
      .updateAgentLevelSetting(id, data)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);

          // receive new updated
          dispatch(receiveUpdatedAgentLevelSetting(result.id, result));
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
};

export const createAgentLevelSetting = (
  data: AgentLevel
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = createAgentLevelSettingMock(data);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await agentService
      .createAgentLevelSetting(data)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);

          const newAgentLevel: AgentLevel = {
            id: result,
            name: data.name,
            pickupCommission: data.pickupCommission,
            deliverCommission: data.deliverCommission
          };
          // receive new updated
          dispatch(receiveNewAgentLevelSetting(newAgentLevel));
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
};

export const deleteAgentLevelSetting = (
  id: number
): ((dispatch: any) => Promise<any>) => {
  // use mock data
  const mockReturnResult = deleteAgentLevelSettingMock(id);
  return async dispatch => {
    dispatch(updateHttpRequestStatus(true));
    return await agentService
      .deleteAgentLevelSetting(id)
      .then(
        response => {
          console.log(mockReturnResult);
          const result = response.data.mockData;
          console.log("mock result is: ", result);

          // receive new updated
          dispatch(receiveDeletedAgentLevelSetting(id));
        },
        error => {
          console.log("error is: ", error);
        }
      )
      .then(_ => {
        // TODO: remove the timeout when it's interacting with backend
        setTimeout(() => {
          console.log("simulate http request...");
          dispatch(updateHttpRequestStatus(false));
        }, 2000);
      });
  };
};
