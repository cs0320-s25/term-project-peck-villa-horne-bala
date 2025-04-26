import { FormatQ } from "../SurveyManager";
import { Q1, Q2, Q3, Q4, Q5 } from "./SurveyData";

export const populateSurvey = (): FormatQ[] => {
  const surveyList: FormatQ[] = [];
  surveyList.push(Q1);
  surveyList.push(Q2);
  surveyList.push(Q3);
  surveyList.push(Q4);
  surveyList.push(Q5);

  return surveyList;
};
