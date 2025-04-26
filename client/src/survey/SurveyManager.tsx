import { populateSurvey } from "./populate_survey/PopulateSurveyData";
import { useState, useEffect, FormEventHandler } from "react";
import Question from "./Question";

export interface FormatQ {
  id: number;
  question: string;
  answerChoices: string[];
  correctAnswerContent: string;
  correctAnswerIndex: number;
}

export function SurveyManager() {
  const [questionBank, setQuestionBank] = useState<FormatQ[]>([]);
  const [responses, setResponses] = useState<number[]>([]);
  const [currQ, setCurrQ] = useState<FormatQ>();
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);

  //populates the question bank upon refresh
  useEffect(() => {
    const survey = populateSurvey();
    setQuestionBank(survey);
  }, []);

  // populates the current question once the question bank is created
  useEffect(() => {
    if (questionBank.length != 0) {
      setCurrQ(questionBank[0]);
    }
  }, [questionBank]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currQ != undefined) {
      const chosenAnswer = e.target.value;
      for (let i = 0; i < currQ.answerChoices.length; i++) {
        if (currQ.answerChoices[i] == chosenAnswer) {
          setSelectedAnswer(i);
          break;
        }
      }
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setResponses([...responses, selectedAnswer]);
    {handleNextQuestion}
    console.log("Form submitted!");
  };

  const handleNextQuestion = () => {
    console.log("next question called")
    if (currQ != undefined) {
      let currQuestionID = currQ.id;
      if(currQuestionID < questionBank.length){
        currQuestionID = currQuestionID+1
        setCurrQ(questionBank[currQuestionID])
      } else{
        return(<h1> survey done!</h1>)
      }
    }
  };

  // we only render IF the question bank and the currQ have been updated and are not undefined
  return (
    <div>
      {questionBank.length != 0 && currQ != undefined && (
        <Question
          currQ={currQ}
          onOptionChange={handleOptionChange}
          onSubmit={onSubmit}
        ></Question>
      )}
    </div>
  );
}

export default SurveyManager;
