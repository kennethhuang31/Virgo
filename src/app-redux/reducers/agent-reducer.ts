import { combineReducers } from "redux";
import {
  AgentLevelSettingAction,
  AgentModalAction,
  AgentAction,
  AgentDropdownAction
} from "../actions";
import {
  Agent,
  AgentLevel,
  AgentBriefInfo,
  DropdownItem,
  AgentStatus
} from "models";

interface AgentDropdownStateInterface {
  agentStatusDropdownItems: DropdownItem[];
  agentLevelSettingDropdownItems: DropdownItem[];
}

interface AgentLevelSettingStateInterface {
  levelSettings: AgentLevel[];
  selectedAgentLevel: AgentLevel;
  displayEditModal: boolean;
  displayConfirmModal: boolean;
}

interface AgentListStateInterface {
  agents: Agent[];
  agentTotalNumber: number;
  savedFilter: string;
  selectedAgentBrief?: AgentBriefInfo;
  selectedAgentDetail?: Agent;
}

interface AgentModalStateInterface {
  displayAgentCreateModal: boolean;
  displayAgentEditModal: boolean;
  displayAgentComplainModal: boolean;
}

const initialAgentDropdownState: AgentDropdownStateInterface = {
  agentStatusDropdownItems: [
    new DropdownItem(1, "已上线", AgentStatus.Online),
    new DropdownItem(2, "未上线", AgentStatus.Offline),
    new DropdownItem(3, "合作终止", AgentStatus.CooperateEnded)
  ],
  agentLevelSettingDropdownItems: []
};

const initialAgentListState: AgentListStateInterface = {
  agents: [],
  agentTotalNumber: 0,
  savedFilter: "",
  selectedAgentBrief: undefined,
  selectedAgentDetail: undefined
};

const initialAgentModalState: AgentModalStateInterface = {
  displayAgentCreateModal: false,
  displayAgentEditModal: false,
  displayAgentComplainModal: false
};

const initialAgentLevelSettingsState: AgentLevelSettingStateInterface = {
  levelSettings: [],
  selectedAgentLevel: {
    id: 0,
    name: "",
    deliverCommission: 0,
    pickupCommission: 0
  },
  displayEditModal: false,
  displayConfirmModal: false
};

const agentDropdownReducer = (
  state: AgentDropdownStateInterface = initialAgentDropdownState,
  action: any
) => {
  switch (action.type) {
    case AgentDropdownAction.RECEIVE_AGENT_LEVEL_SETTING_DROPDOWN:
      return Object.assign({}, state, {
        ...state,
        agentLevelSettingDropdownItems: action.payload
      });
    default:
      return state;
  }
};

const agentModalReducer = (
  state: AgentModalStateInterface = initialAgentModalState,
  action: any
) => {
  switch (action.type) {
    case AgentModalAction.DISPLAY_AGENT_EDIT_MODAL:
      return Object.assign({}, state, {
        ...state,
        displayAgentEditModal: true
      });
    case AgentModalAction.HIDE_AGENT_EDIT_MODAL:
      return Object.assign({}, state, {
        ...state,
        displayAgentEditModal: false
      });
    case AgentModalAction.DISPLAY_AGENT_COMPLAIN_MODAL:
      return Object.assign({}, state, {
        ...state,
        displayAgentComplainModal: true
      });
    case AgentModalAction.HIDE_AGENT_COMPLAIN_MODAL:
      return Object.assign({}, state, {
        ...state,
        displayAgentComplainModal: false
      });
    default:
      return state;
  }
};

const agentListReducer = (
  state: AgentListStateInterface = initialAgentListState,
  action: any
) => {
  switch (action.type) {
    case AgentAction.RECEIVE_AGENTS:
      return Object.assign({}, state, {
        ...state,
        agents: action.payload
      });
    case AgentAction.UPDATE_AGENT_COUNT:
      return Object.assign({}, state, {
        ...state,
        agentTotalNumber: action.payload
      });
    case AgentAction.RECEIVE_SELECTED_AGENT_BRIEF:
      return Object.assign({}, state, {
        ...state,
        selectedAgentBrief: action.payload
      });
    case AgentAction.RECEIVE_SELECTED_AGENT_DETAIL:
      return Object.assign({}, state, {
        ...state,
        selectedAgentDetail: action.payload
      });
    case AgentAction.UPDATE_AGENT_DETAIL:
      const originalAgents = state.agents;
      const updatedIndex = originalAgents.findIndex(
        x => x.id === action.payload.agentId
      );
      originalAgents[updatedIndex] = action.payload.agentDetail;
      return Object.assign({}, state, {
        ...state,
        agents: originalAgents
      });
    default:
      return state;
  }
};

const agentLevelSettingsReducer = (
  state: AgentLevelSettingStateInterface = initialAgentLevelSettingsState,
  action: any
) => {
  switch (action.type) {
    case AgentLevelSettingAction.SELECT_LEVEL_SETTING:
      return Object.assign({}, state, {
        ...state,
        selectedAgentLevel: action.payload
      });
    case AgentLevelSettingAction.DISPLAY_LEVEL_SETTING_EDIT_MODAL:
      return Object.assign({}, state, {
        ...state,
        displayEditModal: true
      });
    case AgentLevelSettingAction.HIDE_LEVEL_SETTING_EDIT_MODAL:
      return Object.assign({}, state, {
        ...state,
        displayEditModal: false
      });
    case AgentLevelSettingAction.DISPLAY_LEVEL_SETTING_CONFIRM_MODAL:
      return Object.assign({}, state, {
        ...state,
        displayConfirmModal: true
      });
    case AgentLevelSettingAction.HIDE_LEVEL_SETTING_CONFIRM_MODAL:
      return Object.assign({}, state, {
        ...state,
        displayConfirmModal: false
      });
    case AgentLevelSettingAction.RECEIVE_LEVEL_SETTINGS:
      return Object.assign({}, state, {
        ...state,
        levelSettings: action.payload
      });
    case AgentLevelSettingAction.UPDATE_LEVEL_SETTING:
      const levelSettingsForUpdate = state.levelSettings;
      const updatedIndex = levelSettingsForUpdate.findIndex(
        x => x.id === action.payload.id
      );
      levelSettingsForUpdate[updatedIndex] = {
        id: action.payload.id,
        name: action.payload.data.name,
        deliverCommission: action.payload.data.deliverCommission,
        pickupCommission: action.payload.data.pickupCommission
      };
      return Object.assign({}, state, {
        ...state,
        levelSettings: levelSettingsForUpdate
      });
    case AgentLevelSettingAction.CREATE_LEVEL_SETTING:
      const levelSettingsForCreate = state.levelSettings;
      return Object.assign({}, state, {
        ...state,
        levelSettings: [...levelSettingsForCreate, action.payload]
      });
    case AgentLevelSettingAction.DELETE_LEVEL_SETTING:
      const levelSettingsForDelete = state.levelSettings;
      const deleteIndex = levelSettingsForDelete.findIndex(
        x => x.id === action.payload
      );
      levelSettingsForDelete.splice(deleteIndex, 1);
      return Object.assign({}, state, {
        ...state,
        levelSettings: levelSettingsForDelete
      });
    default:
      return state;
  }
};

export const agentReducer = combineReducers({
  agentLevelSettingsReducer,
  agentModalReducer,
  agentListReducer,
  agentDropdownReducer
});
