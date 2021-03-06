export const AgentAction = {
  GET_ALL_AGENTS: "GET_ALL_AGENTS",
  GET_FILTERED_AGENTS: "GET_FILTERED_AGENTS",
  RECEIVE_AGENTS: "RECEIVE_AGENTS",
  RECEIVE_SELECTED_AGENT_BRIEF: "RECEIVE_SELECTED_AGENT_BRIEF",
  RECEIVE_SELECTED_AGENT_DETAIL: "RECEIVE_SELECTED_AGENT_DETAIL",
  UPDATE_AGENT_COUNT: "UPDATE_AGENT_COUNT",
  UPDATE_AGENT_DETAIL: "UPDATE_AGENT_DETAIL",
  VIEW_AGENT_DETAIL: "VIEW_AGENT_DETAIL"
};

export const AgentModalAction = {
  DISPLAY_AGENT_EDIT_MODAL: "DISPLAY_AGENT_EDIT_MODAL",
  HIDE_AGENT_EDIT_MODAL: "HIDE_AGENT_EDIT_MODAL",
  DISPLAY_AGENT_COMPLAIN_MODAL: "DISPLAY_AGENT_COMPLAIN_MODAL",
  HIDE_AGENT_COMPLAIN_MODAL: "HIDE_AGENT_COMPLAIN_MODAL"
};

export const AgentLevelSettingAction = {
  GET_LEVEL_SETTINGS: "GET_AGENT_LEVEL_SETTINGS",
  RECEIVE_LEVEL_SETTINGS: "RECEIVE_LEVEL_SETTINGS",
  UPDATE_LEVEL_SETTING: "UPDATE_LEVEL_SETTING",
  CREATE_LEVEL_SETTING: "CREATE_LEVEL_SETTING",
  DELETE_LEVEL_SETTING: "DELETE_LEVEL_SETTING",
  SELECT_LEVEL_SETTING: "SELECT_LEVEL_SETTING",
  DISPLAY_LEVEL_SETTING_EDIT_MODAL: "DISPLAY_EDIT_MODAL",
  HIDE_LEVEL_SETTING_EDIT_MODAL: "HIDE_EDIT_MODAL",
  DISPLAY_LEVEL_SETTING_CONFIRM_MODAL: "DISPLAY_LEVEL_SETTING_CONFIRM_MODAL",
  HIDE_LEVEL_SETTING_CONFIRM_MODAL: "HIDE_LEVEL_SETTING_CONFIRM_MODAL"
};

export const AgentFilterAction = {
  GET_FILTER_VALUE: "GET_FILTER_VALUE",
  UPDATE_FILTER_VALUE: "UPDATE_FILTER_VALUE"
};

export const AgentDropdownAction = {
  RECEIVE_AGENT_LEVEL_SETTING_DROPDOWN: "RECEIVE_AGENT_LEVEL_SETTING_DROPDOWN"
};
