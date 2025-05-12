
import { ModuleInfo } from "../../types";
import { CompletionStatus } from "../../types"
import { fetchModules } from "../ModuleApi";

let modulesList: ModuleInfo[] = [];

export const initModules = async (userId: string) => {
  modulesList = await fetchModules(userId); // Get user's progress
};

export const getModules = (): ModuleInfo[] => {
  return modulesList;
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
