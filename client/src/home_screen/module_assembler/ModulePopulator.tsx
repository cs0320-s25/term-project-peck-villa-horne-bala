import { useState, useEffect, FormEventHandler } from "react";
import Module from "./Module"

export interface ModuleInfo {
  name: string;
  levels: LevelInfo[];
}

export interface LevelInfo {
    levelName: string
    locked: boolean
    routerPath: string
    descriptor: string
}

export function ModulePopulator(){
    const modulePractice: ModuleInfo = {
      name: "module1",
      levels: [
        {
          levelName: "primitives",
          locked: false,
          routerPath: "/MOneLOne",
          descriptor: "integers vs floats",
        },
        {
          levelName: "if statements",
          locked: false,
          routerPath: "/MOneLTwo",
          descriptor: "arrays!",
        },
        {
          levelName: "algos",
          locked: true,
          routerPath: "/MOneLTwo",
          descriptor: "bfs",
        },
      ],
    };
    return <Module module={modulePractice}></Module>;
}
export default ModulePopulator;