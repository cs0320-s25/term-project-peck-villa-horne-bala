import { useState, useEffect, FormEventHandler } from "react";
import Module from "../components/Module";
import { ModuleInfo } from "../../../types";
import { updateModuleList } from "./ModuleData";
import { userInfo } from "os";
import { useUser } from "@clerk/clerk-react";




interface ModulePopulatorProps {
  modules:ModuleInfo[];
}
export function ModulePopulator(props:ModulePopulatorProps) {

  return (
    <div className="modules-container">
      {props.modules.length > 0 && (
        <div>
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
