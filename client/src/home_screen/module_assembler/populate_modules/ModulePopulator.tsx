import { useState, useEffect, FormEventHandler } from "react";
import Module from "../components/Module";
import { ModuleInfo } from "../../../types";
import "../../../styles/Homescreen.css"



interface ModulePopulatorProps {
  modules:ModuleInfo[];
}
export function ModulePopulator(props:ModulePopulatorProps) {

  return (
    <div className="modules-container">
      {props.modules.length > 0 && (
        <div className="module">
          {props.modules.map((moduleInfo, index) => (
            <Module
              key={index}
              module={moduleInfo}
            ></Module>
          ))}
        </div>
      )}
    </div>
  );
}
export default ModulePopulator;
