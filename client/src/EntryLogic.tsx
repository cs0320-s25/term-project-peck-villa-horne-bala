import { useState, useEffect, FormEventHandler } from "react";
import Homescreen from "./home_screen/HomeScreen";
import { Survey } from "./survey/SurveyManager";
import { useUser } from "@clerk/clerk-react";
import { Status } from "./types";
import {checkUserSurveyStatus} from "./survey/SurveyApi"
import { ModuleInfo } from "./types";

/**
 * This function handles the logic behind showcasing the survey or the homescreen by using enums
 * @returns 
 */
export function Intro() {
  const { user } = useUser();
  const [mode, setMode] = useState<Status>(Status.InBetween);
  const [moduleList, setModuleList] = useState<ModuleInfo[]>([]);

  // here we will call the api to check the firebase to see if the user has taken the survey, or not and set the mode accordingly
  useEffect(() => {
    if(user?.id){
      console.log(user.id)
      checkUserSurveyStatus(user.id, setMode);
    }
  }, []);

 
  return (
    <div className="main">
      {mode == Status.Homescreen && <Homescreen moduleList={moduleList}></Homescreen>}
      {mode == Status.Survey && <Survey setModulesList= {setModuleList}setMode={setMode}></Survey>}
    </div>
  );
}
export default Intro;
