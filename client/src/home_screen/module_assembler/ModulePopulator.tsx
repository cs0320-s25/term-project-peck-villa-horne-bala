import { useState, useEffect, FormEventHandler } from "react";

export interface ModuleInfo {
  name: string;
  levels: LevelInfo[];
}

export interface LevelInfo {
    levelName: string
    locked: boolean
    routerPath: string
}

export function ModulePopulator(){
    const[userAccess, setUserAccess]= useState<boolean>(false);
    return (<div></div>)
}
export default ModulePopulator;