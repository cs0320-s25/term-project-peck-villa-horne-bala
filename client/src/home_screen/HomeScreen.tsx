import { useState, useEffect, FormEventHandler } from "react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import ModulePopulator from "./module_assembler/populate_modules/ModulePopulator";
import { resetModuleCompletionStatus } from "./module_assembler/populate_modules/ModuleData";
import { ModuleInfo } from "../types";
import { useUser } from "@clerk/clerk-react";
import { populateModuleList } from "./module_assembler/populate_modules/ModuleData";
import { updateModuleList } from "./module_assembler/populate_modules/ModuleData";
import { storeModuleList } from "./module_assembler/populate_modules/ModuleData";
import { modulesList } from "./module_assembler/populate_modules/ModuleData";

import "../styles/Homescreen.css";

export function Homescreen() {
  const [moduleList, setModuleList] = useState<ModuleInfo[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id ) {
        setModuleList(modulesList);
        updateModuleList(user.id);
        console.log("Default modules: saved by code editor", modulesList);
      
    }
  }, [user]);



  return (
    <div className="home-screen">
      <div className="home-screen-head-bar">
        <h1 className="home-screen-title"> Home </h1>
        <button
          className="reset-button"
          onClick={() => {
            resetModuleCompletionStatus();
            window.location.reload();
          }}
        >
          Reset
        </button>
        <UserButton></UserButton>
      </div>
      <ModulePopulator modules={moduleList}></ModulePopulator>
    </div>
  );
}

export default Homescreen;
