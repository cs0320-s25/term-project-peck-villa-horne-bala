import {
  useState,
  useEffect,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import SurveyQuestionManager from "./SurveyQuesManager";
import { ModuleInfo, Status } from "../types";
import { loadModules } from "../home_screen/ModuleApi";
import { useUser } from "@clerk/clerk-react";
import { populateModuleList } from "../home_screen/module_assembler/populate_modules/ModuleData";
import { storeModuleList } from "../home_screen/module_assembler/populate_modules/ModuleData";
import SurveyFlowPage from "./SurveyFlow";
import AnimatedBackground from "../components/AnimatedBackground";

export enum SurveyStatus {
  Intro,
  TakingSurvey,
  Complete,
}

interface SurveyProps {
  setMode: Dispatch<SetStateAction<Status>>;
  setModulesList: Dispatch<SetStateAction<ModuleInfo[]>>
}
/**
 * This function basically oversees the flow of the survey life, so from instructions, to taking the questions, to survey results
 * @param props
 * @returns
 */
export function Survey(props: SurveyProps) {
  const [moduleList, setModuleList] = useState<ModuleInfo[]>([]);
  const { user } = useUser();


  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus>(
    SurveyStatus.Intro
  );

  const beginSurvey = () => {
    setSurveyStatus(SurveyStatus.TakingSurvey);
  };

  const completeSurvey = () => {
    // this is where the api call to the decision tree logic will be inquired to interpret the upload the modules
    // if(user?.id){
    //   loadModules(user.id);
    // }
    props.setMode(Status.Homescreen);
  };

  // populating a mocked list of modules
  useEffect(() => {
    if (user?.id) {
      const modules = populateModuleList();
      localStorage.setItem(user.id, JSON.stringify(modules));
      //storeModuleList(user.id, modules);
    }
  }, []);

  // if survey status intro, show instructions; if survey status is taking survey, then we call survey question manager; if survey status complete, we show results
  return (
    <div className="survey">
      <AnimatedBackground />
      {surveyStatus == SurveyStatus.Intro && (
        <SurveyFlowPage
          text="To prepare the most effective set of lessons tailored to you, please take the following survey"
          eventHandler={beginSurvey}
          surveyText="Begin!"
        ></SurveyFlowPage>
      )}

      {surveyStatus == SurveyStatus.TakingSurvey && (
        <SurveyQuestionManager
          setModulesList = {setModuleList}
          setSurveyMode={setSurveyStatus}
        ></SurveyQuestionManager>
      )}

      {surveyStatus == SurveyStatus.Complete && (
        <SurveyFlowPage
          text="Here are your results!"
          eventHandler={completeSurvey}
          surveyText="Go Home!"
        ></SurveyFlowPage>
      )}
    </div>
  );
}
