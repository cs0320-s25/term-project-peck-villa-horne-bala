import { FormatQ } from "../../types";
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
  Q17,
  Q18,
  Q19,
  Q20,
  Q21
} from "./SurveyQuestions";

export const populateSurvey = (): FormatQ[] => {
  const surveyList: FormatQ[] = [];
  surveyList.push(Q17);
  surveyList.push(Q18);
  surveyList.push(Q19);
  surveyList.push(Q20);
  surveyList.push(Q21);

  return surveyList;
};

export const populateSurveyAnswerChoices= (): number[]=>{
  const surveyAnswers: number[] = [];
  surveyAnswers.push(Q17.correctAnswerIndex)
  surveyAnswers.push(Q18.correctAnswerIndex);
  surveyAnswers.push(Q19.correctAnswerIndex);
  surveyAnswers.push(Q20.correctAnswerIndex);
  surveyAnswers.push(Q21.correctAnswerIndex);
  return surveyAnswers;
}
