import { Locked, ModuleInfo } from "../../../types";
import { CompletionStatus } from "../../../types";
import { fetchModules } from "../../ModuleApi";
import { Dispatch, SetStateAction, useState} from "react";
import { useUser } from "@clerk/clerk-react";


export const module1: ModuleInfo = {
  name: "Variables & Primitives",
  levels: [
    {
      levelName: "What is a variable?",
      locked: Locked.Unlocked,
      routerPath: "/MOneLvlOne",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MOneLvlOne",
    },
    {
      levelName: "Int VS Doubles",
      locked: Locked.Locked,
      routerPath: "/MOneLvlTwo",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MOneLvlTwo",
    },
    {
      levelName: "String Types",
      locked: Locked.Locked,
      routerPath: "/MOneLvlThree",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MOneLvlThree",
    },
    {
      levelName: "Boolean Types",
      locked: Locked.Locked,
      routerPath: "/MOneLvlFour",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MOneLvlFour",
    },
  ],
};

export const module2: ModuleInfo = {
  name: "Operators",
  levels: [
    {
      levelName: "Addition/Subtraction",
      locked: Locked.Locked,
      routerPath: "/MTwoLvlOne",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MTwoLvlOne",
    },
    {
      levelName: "Multiplication/Division",
      locked: Locked.Locked,
      routerPath: "/MTwoLvlTwo",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MTwoLvlTwo",
    },
    {
      levelName: "Modulus",
      locked: Locked.Locked,
      routerPath: "/MTwoLvlThree",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MTwoLvlThree",
    },
    {
      levelName: "Order of Operations",
      locked: Locked.Locked,
      routerPath: "/MTwoLvlFour",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MTwoLvlFour",
    },
  ],
};

export const module3: ModuleInfo = {
  name: "Decision Making",
  levels: [
    {
      levelName: "If Statement",
      locked: Locked.Locked,
      routerPath: "/MThreeLvlOne",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MThreeLvlOne",
    },
    {
      levelName: "Else Statement",
      locked: Locked.Locked,
      routerPath: "/MThreeLvlTwo",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MThreeLvlTwo",
    },
    {
      levelName: "Multiple Conditions",
      locked: Locked.Locked,
      routerPath: "/MThreeLvlThree",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MThreeLvlThree",
    },
  ],
};

const module4: ModuleInfo = {
  name: "Methods",
  levels: [
    {
      levelName: "Method Syntax",
      locked: Locked.Locked,
      routerPath: "/MFourLvlOne",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MFourLvlOne",
    },
    {
      levelName: "Parameters",
      locked: Locked.Locked,
      routerPath: "/MFourLvlTwo",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MFourLvlTwo",
    },
    {
      levelName: "Return Types",
      locked: Locked.Locked,
      routerPath: "/MFourLvlThree",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MFourvlThree",
    },
  ],
};

const finalModule: ModuleInfo = {
  name: "Final Module!",
  levels: [
    {
      levelName: "Final Level",
      locked: Locked.Locked,
      routerPath: "/finalLvl",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "finalLvl",
    },
  ],
};

export const populateModuleList = (): ModuleInfo[] => {
  const modules: ModuleInfo[] = [];
  modules.push(module1);
  modules.push(module2);
  modules.push(module3);
  modules.push(module4);
  modules.push(finalModule);
  //updateModuleList(user);
  return modules;
};
export const getModuleListLocalStorage= (user:string): ModuleInfo[]=>{
  const storedData: string | null = localStorage.getItem(user);
  if(storedData){
    const listFromLocalStorage: ModuleInfo[] = parseModuleList(storedData);
    console.log(listFromLocalStorage);
    return listFromLocalStorage;
  }
  return populateModuleList();
}

export const storeModuleList = async (user: string, modules: ModuleInfo[]) => {
  const modulesString = JSON.stringify({ modules });
  try {
    if (user) {
      const response = await fetch(
        `http://localhost:3232/storeModules?uid=${user}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: modulesString,
        }
      );
      console.log("Modulesc stored successfully:" + response.status);
    }
  } catch (error) {
    console.error("Error storing modules:", error);
  }
};

export const sendSurveyResults = async (user: string, responses: number[], surveyAnswerKey: number[]) => {
  try {
    const responseString = responses.join('|');
    const response = await fetch(`http://localhost:3232/SurveyResults?uid=${user}&response=${responses}`);
    console.log("Survey results sent successfully:" + response.status);
  } catch (error) {
    console.error("Error sending survey results:", error);
  }
};

export const updateModuleList = async (user: string, modulesList: ModuleInfo[]):Promise<ModuleInfo[] > => {
  try {
    const response = await fetch(
      `http://localhost:3232/restoreProgress?uid=${user}`
    );
    if (response.ok) {
      const data = await response.json();

      modulesList.forEach((module) => {
        const backendModule = data.modules[module.name];
        if (backendModule) {
          module.levels = module.levels.map((level) => {
            const backendLevel = backendModule[level.levelName];
            if (backendLevel) {
              return {
                ...level,
                locked: backendLevel[0],
                completionStatus: backendLevel[1],
              };
            }
            return level;
          });
        }
      });

      localStorage.setItem(user, JSON.stringify(modulesList));
      await storeModuleList(user, modulesList); 
      
      console.log("Modules list updated:", modulesList);
      return modulesList;
    }
  } catch (error) {
    console.error("Error restoring modules:", error);
  }
  return modulesList;
}; 


export const resetModuleCompletionStatus = (
  setModules: Dispatch<SetStateAction<ModuleInfo[]>>, user: string
) => {
  const mockedModules= populateModuleList();
  setModules(mockedModules);
  localStorage.setItem(user, JSON.stringify(mockedModules));
  storeModuleList(user, mockedModules);
};

export function parseModuleList(rawJson: string): ModuleInfo[] {
  const parsed = JSON.parse(rawJson);

  return parsed.map((module: any) => ({
    name: module.name,
    levels: module.levels.map((level: any) => ({
      levelName: level.levelName,
      routerPath: level.routerPath,
      locked: level.locked as "Locked" | "Unlocked", // match Locked type
      completionStatus: level.completionStatus as "Complete" | "Incomplete", // match CompletionStatus type
      jsonKey: level.jsonKey,
    })),
  }));
}
