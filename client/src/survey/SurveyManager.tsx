import {
  useState,
  useEffect,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import SurveyQuestionManager from "./SurveyQuesManager"
import { Status } from "../types";

export enum SurveyStatus {
  Intro,
  TakingSurvey,
  Complete,
}

interface SurveyProps {
  setMode: Dispatch<SetStateAction<Status>>;
}

export function Survey(props: SurveyProps) {
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus>(
    SurveyStatus.Intro
  );

  const beginSurvey = () => {
    setSurveyStatus(SurveyStatus.TakingSurvey)
  }

  const completeSurvey =()=>{
    props.setMode(Status.Homescreen)
  }

  useEffect(()=>{
    console.log("survey stat changed: "+ surveyStatus)
  }, [surveyStatus])

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
