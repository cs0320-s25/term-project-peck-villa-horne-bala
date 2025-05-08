import { useState, useEffect, FormEventHandler } from "react";
import Module from "../components/Module";
import populateModuleList from "./ModuleData";
import { ModuleInfo } from "../../../types";

export function ModulePopulator() {
  const [modules, setModules] = useState<ModuleInfo[]>([]);

  useEffect(() => {
    setModules(populateModuleList);
  }, []);

  return (
    <div className="modules-container">
      {modules.length > 0 && (
        <div>
          {modules.map((moduleInfo, index) => (
            <Module module={moduleInfo}></Module>
          ))}
        </div>
      )}
    </div>
  );
}

{
  /* <Module module={modulePractice}></Module>; */
}
export default ModulePopulator;
