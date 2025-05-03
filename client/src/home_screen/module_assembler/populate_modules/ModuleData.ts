import { ModuleInfo } from "./ModulePopulator";

const module1: ModuleInfo = {
  name: "Variables & Primitives",
  levels: [
    {
      levelName: "What is a variable?",
      locked: false,
      routerPath: "/MoneLvlOne",
      descriptor: "variables are containers that store data in memory.",
    },
    {
      levelName: "Int VS Doubles",
      locked: false,
      routerPath: "/MOneLTwo",
      descriptor: "type differences",
    },
    {
      levelName: "String Types",
      locked: true,
      routerPath: "/MoneLvlThree",
      descriptor: "words/sentences",
    },
    {
      levelName: "Boolean Types",
      locked: true,
      routerPath: "/MOneLTwo",
      descriptor: "true/false",
    },
  ],
};

const module2: ModuleInfo = {
  name: "Operators",
  levels: [
    {
      levelName: "Addition/Subtraction",
      locked: true,
      routerPath: "/MTwoLvlOne",
      descriptor: "add + subtract numbers",
    },
    {
      levelName: "Multiplication/Division",
      locked: true,
      routerPath: "/MTwoLvlTwo",
      descriptor: "multiply + divide ",
    },
    {
      levelName: "Modulus",
      locked: true,
      routerPath: "/MTwoLvlThree",
      descriptor: "remainder of division",
    },
    {
      levelName: "Order of Operations",
      locked: true,
      routerPath: "/MTwoLvlFour",
      descriptor: "like PEMDAS but for Java",
    },
  ],
};

export const populateModuleList = (): ModuleInfo[] => {
  const modules: ModuleInfo[] = [];
  modules.push(module1);
  modules.push(module2);
  return modules;
};

export default populateModuleList;
