import { FormatQ } from "../routers/SurveyManager";
import {
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  Q6,
  Q7,
  Q8,
  Q9,
  Q10,
  Q11,
  Q12,
  Q13,
  Q14,
  Q15,
  Q16,
} from "./SurveyQuestions";

export const populateSurvey = (): FormatQ[] => {
  const surveyList: FormatQ[] = [];
  surveyList.push(Q1);
  surveyList.push(Q2);
  surveyList.push(Q3);
  surveyList.push(Q4);
  surveyList.push(Q5);
  // surveyList.push(Q6);

  return surveyList;
};
