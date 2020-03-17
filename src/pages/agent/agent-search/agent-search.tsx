import React, { useState } from "react";
import { connect } from "react-redux";
import "./agent-search.scss";
import {
  FormGroup,
  FormControl,
  AppFormInput,
  AppFormDropdown,
  AppButton,
  BorderedContent,
  AppTextField
} from "components";
import { Agent } from "models";
import AgentAdvancedSearch from "./agent-advanced-search/agent-advanced-search";

interface AgentSearchPropsInterface {
  handleSearchQuery: any;
  handleAllClicked: () => void;
}

const AgentSearch: React.FC<AgentSearchPropsInterface> = (
  props: AgentSearchPropsInterface
) => {
  const [displayAdvancedSearch, setAdvancedSearchDisplay] = useState(false);
  const [isAdvancedSearch, useAdvancedSearch] = useState(false);

  const searchFilterForm = new FormGroup("filter", [
    new FormControl("name", "", { required: false }),
    new FormControl("phone", "", { required: false }),
    new FormControl("email", "", { required: false })
  ]);

  const searchAgents = (useFilter: boolean, filter?: any) => {
    console.log("search agents: ", filter);
  };
  const createSearchQuery = (): string => {
    return "";
  };
  const showAdvancedSearch = () => {
    setAdvancedSearchDisplay(true);
  };
  return (
    <>
      {/* <AgentAdvancedSearch
        display={displayAdvancedSearch}
        handleClose={() => {
          setAdvancedSearchDisplay(false);
        }}
      /> */}
      <div className="agent-search">
        <div className="agent-search-all" onClick={props.handleAllClicked}>
          ALL
        </div>
        <div className="agent-search-fields">
          <AppTextField text="店铺名称:" fieldStyle="agent-search-field">
            <AppFormInput
              id="agent-name"
              type="text"
              required={false}
              placeholder="店铺名称"
              displayError={false}
              formControl={searchFilterForm.controlElements[0]}
            />
          </AppTextField>
          <AppTextField text="前台电话:" fieldStyle="agent-search-field">
            <AppFormInput
              id="agent-phone"
              type="text"
              required={false}
              placeholder="前台电话"
              displayError={false}
              formControl={searchFilterForm.controlElements[1]}
            />
          </AppTextField>
          <AppTextField text="邮箱:" fieldStyle="agent-search-field">
            <AppFormInput
              id="agent-email"
              type="text"
              required={false}
              placeholder="邮箱"
              displayError={true}
              formControl={searchFilterForm.controlElements[2]}
            />
          </AppTextField>
        </div>
        <div
          className="agent-search-advanced"
          onClick={() => {
            setAdvancedSearchDisplay(true);
          }}
        >
          高级查询
        </div>
        <div className="search-button">
          <AppButton type="search" disabled={false} btnType="button" />
        </div>
      </div>
    </>
  );
};

export default AgentSearch;
