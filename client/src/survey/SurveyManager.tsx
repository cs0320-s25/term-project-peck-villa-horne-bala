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
  const [currQ, setCurrQ] = useState<FormatQ| null>();
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

  // // this is used to ensure everything is updating properly
  // useEffect(() => {
  //   console.log("update to responses: " + responses);
  // }, [responses]);

  // useEffect(() => {
  //   console.log("update to currQ: " + currQ?.question);
  // }, [currQ?.question]);
  
  // useEffect(()=>{
  //   console.log("update to the curr selected option: "+ selectedAnswer)
  // }, [selectedAnswer])

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currQ != undefined) {
      setSelectedAnswer(Number(e.target.value));
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setResponses([...responses, selectedAnswer]);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currQ != undefined) {
      let currQuestionID = currQ.id;
      if (currQuestionID < questionBank.length) {
        setCurrQ(questionBank[currQuestionID]);
        setSelectedAnswer(-1)
      } else {
        setCurrQ(null)
        // query right here
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
          selectedAnswer={selectedAnswer}
        ></Question>
      )}
    </div>
  );
}

export default SurveyManager;
