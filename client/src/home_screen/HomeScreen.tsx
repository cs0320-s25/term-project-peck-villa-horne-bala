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
      const savedModules = localStorage.getItem(user.id);
      console.log("Saved modules: ", savedModules);
        setModuleList(modulesList);
        console.log("Default modules: ", modulesList);
      
    }
  }, [user]);

  // Save moduleList to localStorage whenever it changes
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(user.id, JSON.stringify(moduleList));
    }
  }, [moduleList, user]);



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
