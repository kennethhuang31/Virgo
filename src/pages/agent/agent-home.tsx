import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./agent-home.scss";
import { AppTitledPage, AppTextField, AppButton } from "components";
import { Agent, AgentBriefInfo } from "models";
import {
  getAllAgents,
  getFilteredAgents,
  displayAgentEditModal,
  displayAgentComplainModal,
  receiveSelectedAgentBrief,
  BaseActionInterface
} from "app-redux";
import AgentSearch from "./agent-search/agent-search";
import AgentEdit from "./agent-edit/agent-edit";
import AgentInformationCard from "./agent-information-card/agent-information-card";

interface AgentPropsInterface {
  agentList: Agent[];
  agentTotalNumber: number;
  savedAgentFilter: string;
  displayEditModal: boolean;
  displayCreateModal: boolean;
  displayComplainModal: boolean;
  getAllAgents: any;
  getFilteredAgents: any;
  receiveSelectedAgentBrief: (data: AgentBriefInfo) => BaseActionInterface;
  displayAgentCreateModal: (display: boolean) => BaseActionInterface;
  displayAgentEditModal: (display: boolean) => BaseActionInterface;
  displayAgentComplainModal: (display: boolean) => BaseActionInterface;
}

const AgentHome: React.FC<AgentPropsInterface> = (
  props: AgentPropsInterface
) => {
  const searchAgents = () => {
    return;
  };

  const searchAllAgents = (): void => {
    props.getAllAgents();
  };

  const handleSelectedAgent = (data: Agent) => {
    const agentBrief: AgentBriefInfo = {
      id: data.id,
      displayId: data.displayId
    };
    props.receiveSelectedAgentBrief(agentBrief);
  };

  const showEditModal = (agent: Agent) => {
    handleSelectedAgent(agent);
    props.displayAgentEditModal(true);
  };

  useEffect(() => {
    searchAllAgents();
  }, []);

  return (
    <>
      <AgentEdit displayModal={props.displayEditModal} />
      <AppTitledPage title="查看代理">
        <AgentSearch
          handleSearchQuery={searchAgents}
          handleAllClicked={searchAllAgents}
        />
        {/* <AgentSetting /> */}
        <div className="agent-list">
          <div>总数 : {props.agentTotalNumber}</div>
          {props.agentList.map((agent: Agent, index: number) => {
            return (
              <AgentInformationCard
                key={index}
                isEdit={false}
                agentData={agent}
                displayEditError={false}
                handleEdit={() => showEditModal(agent)}
              >
                <div className="agent-list-children">
                  <AppTextField
                    text="银行账号 : "
                    fieldStyle="agent-list-children-bank"
                  >
                    <span>{agent.bankAccount}</span>
                  </AppTextField>

                  <div className="app-layout app-layout_between">
                    <AppTextField text="REPORT次数 : ">
                      <span>0</span>
                    </AppTextField>
                    <AppTextField text="丢失破损次数 : ">
                      <span>0</span>
                    </AppTextField>
                    <AppTextField text="客户投诉次数 : ">
                      <span>0</span>
                    </AppTextField>
                    <AppButton
                      type="add"
                      disabled={false}
                      btnType="button"
                      text="添加投诉情况"
                    />
                  </div>
                </div>
              </AgentInformationCard>
            );
          })}
        </div>
      </AppTitledPage>
    </>
  );
};

const mapDispatchToProps = {
  getAllAgents,
  getFilteredAgents,
  displayAgentEditModal,
  receiveSelectedAgentBrief,
  displayAgentComplainModal
};

const mapStateToProps = (state: any) => {
  return {
    agentList: state.agentReducer.agentListReducer.agents,
    agentTotalNumber: state.agentReducer.agentListReducer.agentTotalNumber,
    savedAgentFilter: state.agentReducer.agentListReducer.savedFilter,
    displayEditModal:
      state.agentReducer.agentModalReducer.displayAgentEditModal,
    displayCreateModal:
      state.agentReducer.agentModalReducer.displayAgentCreateModal,
    displayComplainModal:
      state.agentReducer.agentModalReducer.displayAgentComplainModal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentHome);
