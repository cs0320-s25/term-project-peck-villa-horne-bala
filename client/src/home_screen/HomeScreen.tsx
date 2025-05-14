import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { UserButton } from "@clerk/clerk-react";
import ModulePopulator from "./module_assembler/populate_modules/ModulePopulator";
import {
  resetModuleCompletionStatus,
  storeModuleList,
  updateModuleList,
  populateModuleList,
} from "./module_assembler/populate_modules/ModuleData";
import { ModuleInfo } from "../types";
import { useUser } from "@clerk/clerk-react";
import { parseModuleList } from "./module_assembler/populate_modules/ModuleData";

import "../styles/Homescreen.css";
import { populateSurvey } from "../survey/populate_survey/PopulateSurveyData";

export function Homescreen() {
  const [moduleList, setModuleList] = useState<ModuleInfo[]>([]);
  const { user } = useUser();

  // this updates the moduleList using local storage or firestore based on whether there is something in the local storage
  useEffect(() => {
    if (user?.id) {
      const cachedModules = localStorage.getItem(user.id);
      if (cachedModules) { // local storage
        const parsedModules = parseModuleList(cachedModules);
        setModuleList(parsedModules);
        const updateModules = async () => {
          await storeModuleList(user.id, moduleList);
        };
        updateModules();
      } else { // firestore
        const loadModules = async () => {
          const updatedList = await updateModuleList(user.id, moduleList); // calling api to get the module list and store that into the updated list
  
          if (updatedList) {
            setModuleList(updatedList);
          }
        };
        loadModules();
      }
    } else {
      localStorage.clear();
    }
  }, [user]);

  // this updates the firestore everytime that the list is updates
  useEffect(() => {
    if (user?.id) {
      const updateModules = async () => {
        await storeModuleList(user.id, moduleList);
      };
      updateModules();
    }
  }, [moduleList]);

  // this function is used to reset the modules so that only the first level is open
  const resetModules =()=>{
    if(user && user.id){
      resetModuleCompletionStatus(setModuleList, user.id);
    }
    window.location.reload();
  }

  return (
    <div className="home-screen">
      <div className="home-screen-head-bar">
        <h1 className="home-screen-title"> Home </h1>
        <button
          className="reset-button"
          onClick={resetModules}
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
