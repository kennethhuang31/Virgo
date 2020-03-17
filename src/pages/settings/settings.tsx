import React from "react";
import { RowContentContainer } from "components";
import "./settings.scss";

import { UserMockData, WorkerPermissionMockData } from "../../mock";

const Settings: React.FC = () => {
  // TODO: set state for "select all" checkbox
  function allSelected() {
    console.log("ALL selected");
  }
  function permissionSelected(name: string | undefined) {
    if (name === undefined) {
      return;
    }
    console.log("Worker permission checkbox: ", name);
  }

  return (
    <>
      <div>setting...</div>

      {/* <div className="setting">
        <div className="setting_section">
          <h2>设置权限</h2>
          <RowContentContainer>
            <span className="setting_section_text">员工</span>
            <div>
              <Checkbox
                id="all"
                textPosition="right"
                text="全选"
                readOnly={false}
                selected={false}
                selectedCallback={allSelected}
              />
            </div>
          </RowContentContainer>
          <div className="permission">
            {WorkerPermissionMockData.map((value, index) => {
              return (
                <Checkbox
                  id={index}
                  key={index}
                  textPosition="right"
                  text={value.displayName}
                  readOnly={false}
                  selected={value.selected}
                  selectedCallback={() => permissionSelected(value.name)}
                />
              );
            })}
          </div>
        </div>
        <div className="setting_section">
          <h2>设置角色区域</h2>
          <RowContentContainer>
            <span className="setting_section_text">角色</span>
          </RowContentContainer>
        </div>
      </div> */}
    </>
  );
};

export default Settings;
