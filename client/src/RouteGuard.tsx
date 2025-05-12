import { getModules } from "../src/home_screen/module_assembler/module_store";

const isLevelUnlocked = (moduleIndex: number, levelIndex: number) => {
  const modules = getModules();
  return !modules[moduleIndex].levels[levelIndex].locked;
};