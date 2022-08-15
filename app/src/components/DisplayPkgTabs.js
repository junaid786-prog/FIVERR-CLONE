import React, { useState } from "react"
import DisplayPkg from "./DisplayPkg"

const DisplayPkgTabs = ({ service }) => {
  const [tabIndex, setTabIndex] = useState(1)
  return (
    <div className="pkgs_tabs">
      <div className="pkgs_tabs_top">
        <button
          onClick={() => setTabIndex(1)}
          className={tabIndex === 1 && "btn_active"}
        >
          Basic
        </button>
        <button
          onClick={() => setTabIndex(2)}
          className={tabIndex === 2 && "btn_active"}
        >
          Standard
        </button>
        <button
          onClick={() => setTabIndex(3)}
          className={tabIndex === 3 && "btn_active"}
        >
          Premium
        </button>
      </div>
      <div className="pkgs_tabs_bottom">
        {tabIndex === 1 &&
        service &&
        service.packages &&
        service.packages[0] ? (
          <DisplayPkg pkg={service.packages[0]} />
        ) : tabIndex === 2 && service.packages && service.packages[1] ? (
          <DisplayPkg pkg={service.packages[1]} />
        ) : (
          tabIndex === 3 &&
          service.packages &&
          service.packages[2] && <DisplayPkg pkg={service.packages[0]} />
        )}
      </div>
    </div>
  )
}

export default DisplayPkgTabs
