import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { UserButton } from "@clerk/clerk-react";
import ModulePopulator from "./module_assembler/populate_modules/ModulePopulator";
import {
  resetModuleCompletionStatus,
  storeModuleList,
  updateModuleList,
  populateModuleList,
} from "./module_assembler/populate_modules/ModuleData";
import { LevelInfo, ModuleInfo, CompletionStatus, Locked } from "../types";
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
      console.log(user.id)
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


 

  // const isPrevLvlCompleted =(moduleIndex: number, lvlIndex:number): boolean=>{
  //   if (moduleIndex == 0 && lvlIndex == 0) {// first module, level one
  //     return false;
  //   } else if (lvlIndex == 0) {// first level in that module, check the prev module
  //     const prevModuleLevels: LevelInfo[] = moduleList[moduleIndex - 1].levels; //get the levels of prev module
  //     const lenOfPrevModule: number = prevModuleLevels.length; // get the total number of levels in the prev module

  //     const prevLvl: LevelInfo = prevModuleLevels[lenOfPrevModule - 1]; // get the prev level
  //     if (prevLvl.completionStatus == CompletionStatus.Complete) {
  //       // prev level has been completed
  //       return true;
  //     } // prev level has not been completed
  //     return false;

  //   }// this case will only be reached IF the prev level of this level is within the module

  //   const moduleLevels: LevelInfo[] = moduleList[moduleIndex].levels; //get the levels of this module
  //   const prevLvl: LevelInfo = moduleLevels[lvlIndex-1];
  //   if (prevLvl.completionStatus == CompletionStatus.Complete) {
  //     // prev level has been completed
  //     return true;
  //   } // prev level has not been completed
  //   return false;
  // }

  // const updateLockStatus = () => {
  //   let didChange = false;

  //   const updatedModules = moduleList.map((module, moduleIndex) => {
  //     const updatedLevels = module.levels.map((level, levelIndex) => {
  //       const isPrevUnlocked = isPrevLvlCompleted(moduleIndex, levelIndex);
  //       const shouldBeUnlocked = isPrevUnlocked
  //         ? Locked.Unlocked
  //         : level.locked;

  //       if (level.locked !== shouldBeUnlocked) {
  //         didChange = true;
  //         return {
  //           ...level,
  //           locked: shouldBeUnlocked,
  //         };
  //       }

  //       return level;
  //     });

  //     return {
  //       ...module,
  //       levels: updatedLevels,
  //     };
  //   });

  //   if (didChange) {
  //     setModuleList(updatedModules);
  //   }
  // };
  

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
