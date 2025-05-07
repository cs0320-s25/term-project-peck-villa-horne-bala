import { useState, useEffect, FormEventHandler } from "react";
import Homescreen from "./home_screen/HomeScreen";
import { Survey } from "./survey/SurveyManager";
import { useUser } from "@clerk/clerk-react";

export enum Status {
  Survey = "SURVEY",
  Homescreen = "HOMESCREEN",
  InBetween = "INBETWEEN",
}

export function Intro() {
  const { user } = useUser();
  const [mode, setMode] = useState<Status>(Status.InBetween);
  // here we will call the api to check the firebase to see if the user has taken the survey, or not and set the mode accordingly
  useEffect(() => {
    const checkUserSurveyStatus = async () => {
      try {
        console.log(user);

        const response = await fetch(
          `http://localhost:3232/Survey?uid=${user}`
        );
        const result = await response.json();
        console.log("Result: "+ result);
  
        const userHasTakenSurvey: boolean = result.takenSurvey;
        console.log("boolean: "+userHasTakenSurvey);

        if (userHasTakenSurvey) {
          setMode(Status.Homescreen);
        } else {
          setMode(Status.Survey);
        }
      } catch (error) {
        console.error("Failed to check survey status:", error);
      }
    };

    checkUserSurveyStatus();
  }, []);

  useEffect(() => {
    console.log("stat changed: " + mode);
  }, [mode]);

  return (
    <div className="main">
      {mode == Status.Homescreen && <Homescreen></Homescreen>}
      {mode == Status.Survey && <Survey setMode={setMode}></Survey>}
    </div>
  );
}
export default Intro;
