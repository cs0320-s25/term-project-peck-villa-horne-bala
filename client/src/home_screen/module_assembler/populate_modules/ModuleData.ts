import { ModuleInfo } from "../../../types";
import { CompletionStatus } from "../../../types";

export const module1: ModuleInfo = {
  name: "Variables & Primitives",
  levels: [
    {
      levelName: "What is a variable?",
      locked: false,
      routerPath: "/MoneLvlOne",
      descriptor: "variables are containers that store data in memory.",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Int VS Doubles",
      locked: false,
      routerPath: "/MOneLTwo",
      descriptor: "type differences",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "String Types",
      locked: true,
      routerPath: "/MoneLvlThree",
      descriptor: "words/sentences",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Boolean Types",
      locked: true,
      routerPath: "/MOneLTwo",
      descriptor: "true/false",
      completionStatus: CompletionStatus.Incomplete,
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
      descriptor: "add + subtract numbers",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Multiplication/Division",
      locked: true,
      routerPath: "/MTwoLvlTwo",
      descriptor: "multiply + divide ",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Modulus",
      locked: true,
      routerPath: "/MTwoLvlThree",
      descriptor: "remainder of division",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Order of Operations",
      locked: true,
      routerPath: "/MTwoLvlFour",
      descriptor: "like PEMDAS but for Java",
      completionStatus: CompletionStatus.Incomplete,
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
      descriptor: "",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Else Statement",
      locked: true,
      routerPath: "/MThreeLvlTwo",
      descriptor: "",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Multiple Conditions",
      locked: true,
      routerPath: "/MThreeLvlThree",
      descriptor: "",
      completionStatus: CompletionStatus.Incomplete,
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
      descriptor: "",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Parameters",
      locked: true,
      routerPath: "/MFourLvlTwo",
      descriptor: "",
      completionStatus: CompletionStatus.Incomplete,
    },
    {
      levelName: "Return Types",
      locked: true,
      routerPath: "/MFourvlThree",
      descriptor: "",
      completionStatus: CompletionStatus.Incomplete,
    },
  ],
};
 const populateModuleList = (): ModuleInfo[] => {
  const modules: ModuleInfo[] = [];
  modules.push(module1);
  modules.push(module2);
  modules.push(module3);
  modules.push(module4);
  return modules;
};

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

