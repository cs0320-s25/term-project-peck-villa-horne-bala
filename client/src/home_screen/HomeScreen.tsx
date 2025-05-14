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
  const [cacheList, setCacheList] = useState<ModuleInfo[]>([]);
  const { user } = useUser();

  // useEffect(() => {
  //   if (user?.id ) {
  //     const storedData:string | null= localStorage.getItem(user.id);
  //     if (storedData==null) {
  //       // first time they sign in
  //       setModuleList(modulesList);
  //       updateModuleList(user.id);
  //     } else if (storedData != null) {
  //       const listFromLocalStorage: ModuleInfo[] = parseModuleList(storedData);
  //       setModuleList(listFromLocalStorage);
  //     }
  //     getModuleList(user.id);
  //     //console.log("Default modules: saved by code editor", modulesList);
  //   }
  // }, [user]);

  useEffect(() => {
    if (user?.id) {
      const cachedModules = localStorage.getItem(user.id);
      if (cachedModules) {
        const parsedModules = parseModuleList(cachedModules);
        console.log("parsedModules from local storage");
        setModuleList(parsedModules);
        const updateModules = async () => {
          await storeModuleList(user.id, moduleList);
        };
        updateModules();
      } else {
        const loadModules = async () => {
          const updatedList = await updateModuleList(user.id, moduleList);
          console.log(
            "fetching the module list from firestore!!: " + updatedList
          );
          if (updatedList) {
            setModuleList(updatedList);
            console.log("updared module list from firestore: " + moduleList);
          }
        };
        loadModules();
      }
    } else {
      console.log("user cleared when refreshing");
      localStorage.clear();
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      const updateModules = async () => {
        await storeModuleList(user.id, moduleList);
      };
      updateModules();
    }
  }, [moduleList]);

  // useEffect(() => {
  //   if (user?.id) {
  //     const cachedModules = localStorage.getItem(user.id);
  //     if (cachedModules) {
  //       const parsedModules = parseModuleList(cachedModules);
  //       console.log("parsedModules from local storage");
  //       setModuleList(parsedModules);
  //       const updateModules = async () => {
  //         await storeModuleList(user.id, moduleList);
  //       };
  //       updateModules();
  //     }
  //   }
  // }, [cacheList]);

  return (
    <div className="home-screen">
      <div className="home-screen-head-bar">
        <h1 className="home-screen-title"> Home </h1>
        <button
          className="reset-button"
          onClick={() => {
            const resetModules = resetModuleCompletionStatus(moduleList);
            if (resetModules != null && user && user.id) {
              setModuleList(resetModules);
              localStorage.setItem(user.id, JSON.stringify(resetModules));
              storeModuleList(user.id, resetModules);
            }

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
