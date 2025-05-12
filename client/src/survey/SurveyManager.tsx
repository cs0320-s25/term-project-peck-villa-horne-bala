import {
  useState,
  useEffect,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import SurveyQuestionManager from "./SurveyQuesManager"
import { Status } from "../types";
import {loadModules} from "../home_screen/ModuleApi";
import { useUser } from "@clerk/clerk-react";
import { populateModuleList } from "../home_screen/module_assembler/populate_modules/ModuleData";
import { storeModuleList } from "../home_screen/module_assembler/populate_modules/ModuleData";

export enum SurveyStatus {
  Intro,
  TakingSurvey,
  Complete,
}

interface SurveyProps {
  setMode: Dispatch<SetStateAction<Status>>;
}

export function Survey(props: SurveyProps) {
  const {user}= useUser();
  
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus>(
    SurveyStatus.Intro
  );

  const beginSurvey = () => {
    setSurveyStatus(SurveyStatus.TakingSurvey)
  }

  const completeSurvey =()=>{
    // this is where the api call to the decision tree logic will be inquired to interpret the upload the modules
    if(user?.id){
      loadModules(user.id);
    }
    props.setMode(Status.Homescreen)
  }

useEffect(() => {
    if (user?.id) {
      populateModuleList();
      storeModuleList(user.id);
    }
  }, []);

  return (
    <div className="survey">
      {surveyStatus == SurveyStatus.Intro && (
        <div className="survey-intro">
          <h3>
            {" "}
            To prepare an appropriate set of lessons tailored to your level,
            please take the following survey!{" "}
          </h3>
          <button onClick={beginSurvey}>Begin!</button>
        </div>
      )}

      {surveyStatus == SurveyStatus.TakingSurvey && (
        <SurveyQuestionManager
          setSurveyMode={setSurveyStatus}
        ></SurveyQuestionManager>
      )}

      {surveyStatus == SurveyStatus.Complete && (
        <div className="survey-results">
          {" "}
          <h3> Here are your results!</h3>
          <button onClick={completeSurvey}> Go Home!</button>
        </div>
      )}
    </div>
  );
}
