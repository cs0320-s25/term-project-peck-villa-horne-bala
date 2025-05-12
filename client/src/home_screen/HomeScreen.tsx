import { useState, useEffect, FormEventHandler } from "react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import ModulePopulator from "./module_assembler/populate_modules/ModulePopulator";
import { resetModuleCompletionStatus } from "./module_assembler/populate_modules/ModuleData";
import {ModuleInfo} from "../types"
import { useUser } from "@clerk/clerk-react";
import { populateModuleList } from "./module_assembler/populate_modules/ModuleData";
import { updateModuleList } from "./module_assembler/populate_modules/ModuleData";
import { storeModuleList } from "./module_assembler/populate_modules/ModuleData";
import { modulesList } from "./module_assembler/populate_modules/ModuleData";

export function Homescreen() {
  const[moduleList, setModuleList]= useState< ModuleInfo[]>([]);
  const { user } = useUser();
  

  useEffect(() => {
    if (user?.id) {
      const modules = modulesList
      updateModuleList(user.id);
      setModuleList(modules);
    }
  }, []);

  return (
    <div className="home-screen">
      <div className="home-screen-head-bar">
        <h1> Home </h1>
        <button
          onClick={() => {
            resetModuleCompletionStatus();
            window.location.reload();
          }}
        >
          Reset
        </button>
        <br></br>
        <UserButton></UserButton>

        <ModulePopulator modules={moduleList}></ModulePopulator>
      </div>
      <div className="home-screen-module-container"></div>
    </div>
  );
}


export default Homescreen;
