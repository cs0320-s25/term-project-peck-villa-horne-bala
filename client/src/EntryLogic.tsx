import { useState, useEffect, FormEventHandler } from "react";
import Homescreen from "./home_screen/HomeScreen";
import { Survey } from "./survey/SurveyManager";

export enum Status {
  Survey = "SURVEY",
  Homescreen = "HOMESCREEN",
  InBetween = "INBETWEEN",
}

export function Intro() {
  const [mode, setMode] = useState<Status>(Status.InBetween);
  // here we will call the api to check the firebase to see if the user has taken the survey, or not and set the mode accordingly
  useEffect(() => {
    const userHasTakenSurvey = false; // Replace with actual Firebase check

    if (userHasTakenSurvey) {
      setMode(Status.Homescreen);
    } else {
      setMode(Status.Survey);
    }
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
