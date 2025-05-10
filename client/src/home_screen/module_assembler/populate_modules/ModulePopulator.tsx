import { useState, useEffect, FormEventHandler } from "react";
import Module from "../components/Module";
import { modulesList } from "./ModuleData";
import { ModuleInfo } from "../../../types";

export function ModulePopulator() {
  const [modules, setModules] = useState<ModuleInfo[]>([]);


  useEffect(() => {
    setModules(modulesList);
  }, []);

  return (
    <div className="modules-container">
      {modules.length > 0 && (
        <div>
          {modules.map((moduleInfo, index) => (
            <Module modules={modules} module={moduleInfo}></Module>
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
