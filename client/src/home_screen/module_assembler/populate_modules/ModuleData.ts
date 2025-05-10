import { ModuleInfo } from "../../../types";
import { CompletionStatus } from "../../../types";
import { fetchModules } from "../../ModuleApi";
import { useState} from "react";

export const module1: ModuleInfo = {
  name: "Variables & Primitives",
  levels: [
    {
      levelName: "What is a variable?",
      locked: false,
      routerPath: "/MOneLvlOne",
      completionStatus: CompletionStatus.Complete,
      jsonKey: "MOneLvlOne",
    },
    {
      levelName: "Int VS Doubles",
      locked: false,
      routerPath: "/MOneLvlTwo",
      completionStatus: CompletionStatus.Complete,
      jsonKey: "MOneLvlTwo",
    },
    {
      levelName: "String Types",
      locked: true,
      routerPath: "/MOneLvlThree",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MOneLvlThree",
    },
    {
      levelName: "Boolean Types",
      locked: true,
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
      locked: true,
      routerPath: "/MTwoLvlOne",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MTwoLvlOne",
    },
    {
      levelName: "Multiplication/Division",
      locked: true,
      routerPath: "/MTwoLvlTwo",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MTwoLvlTwo",
    },
    {
      levelName: "Modulus",
      locked: true,
      routerPath: "/MTwoLvlThree",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MTwoLvlThree",
    },
    {
      levelName: "Order of Operations",
      locked: true,
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
      locked: true,
      routerPath: "/MThreeLvlOne",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MThreeLvlOne",
    },
    {
      levelName: "Else Statement",
      locked: true,
      routerPath: "/MThreeLvlTwo",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MThreeLvlTwo",
    },
    {
      levelName: "Multiple Conditions",
      locked: true,
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
      locked: true,
      routerPath: "/MFourLvlOne",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MFourLvlOne",
    },
    {
      levelName: "Parameters",
      locked: true,
      routerPath: "/MFourLvlTwo",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MFourLvlTwo",
    },
    {
      levelName: "Return Types",
      locked: true,
      routerPath: "/MFourvlThree",
      completionStatus: CompletionStatus.Incomplete,
      jsonKey: "MFourvlThree",
    },
  ],
};

export const populateModuleList = (): ModuleInfo[] => {
  const modules: ModuleInfo[] = [];
  modules.push(module1);
  modules.push(module2);
  modules.push(module3);
  modules.push(module4);
  //updateModuleList(user);
  return modules;
};

const updateModuleList =(user:string)=>{
  const userProgress = fetchModules(user);
}


export const resetModuleCompletionStatus = () => {
  modulesList.forEach((module) => {
    module.levels.forEach((level) => {
      level.completionStatus = CompletionStatus.Incomplete;
      level.locked = true;
    });
  });
  modulesList[0].levels[0].locked = false;
  modulesList[0].levels[1].locked = false;
};

export const modulesList = populateModuleList();

