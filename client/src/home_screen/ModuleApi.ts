import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";


export const loadModules = async (user: string) => {
  try {
    const response = await fetch(
      `http://localhost:3232/LoadModules?uid=${user}`
    );
  } catch (error) {
    console.error("Failed to check survey status:", error);
  }
};


export const fetchModules = async (user: string) => {
  try {
    const response = await fetch(
      `http://localhost:3232/FetchModules?uid=${user}`
    );
    const json = await response.json();
    const userProgress = json.userProgress;
    return userProgress;
  } catch (error) {
    console.error("Failed to check survey status:", error);
  }
};
