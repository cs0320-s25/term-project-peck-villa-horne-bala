import { useUser } from "@clerk/clerk-react";
import { Status } from "../types";
import { Dispatch, SetStateAction } from "react";

// this function is what cheks if the survey has been taken; calls the api which checks firestore
export const checkUserSurveyStatus = async (user: string, setMode: Dispatch<SetStateAction<Status>>) => {
  try {
    const response = await fetch(`http://localhost:3232/Survey?uid=${user}`);
    const result = await response.json();
    const userHasTakenSurvey: boolean = result.takenSurvey;

    if (userHasTakenSurvey) {
      setMode(Status.Homescreen);
    } else {
      setMode(Status.Survey);
    }
  } catch (error) {
    console.error("Failed to check survey status:", error);
  }
};

// this function updates if the user has taken the survey; calls api and sets firestore survey field to true
export const updateFirestoreUserSurveyStatus = async (user: string) => {
    try {
      const response = await fetch(
        `http://localhost:3232/Survey?uid=${user}&surveyCompleted=true`
      );
      const result = await response.json();
    } catch (error) {
      console.error("Failed to check survey status:", error);
    }
};
