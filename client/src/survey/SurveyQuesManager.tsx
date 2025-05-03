import { populateSurvey } from "./populate_survey/PopulateSurveyData";
import {
  useState,
  useEffect,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import Question from "./components/Question";
import { useNavigate } from "react-router-dom";
import { Status } from "../EntryLogic";
import { SurveyStatus } from "./SurveyManager";

export interface FormatQ {
  id: number;
  question: string;
  answerChoices: string[];
  correctAnswerContent: string;
  correctAnswerIndex: number;
}

interface SurveyManagerProps {
  setSurveyMode: Dispatch<SetStateAction<SurveyStatus>>;
}

export function SurveyQuestionManager(props: SurveyManagerProps) {
  const [questionBank, setQuestionBank] = useState<FormatQ[]>([]);
  const [responses, setResponses] = useState<number[]>([]);
  const [currQ, setCurrQ] = useState<FormatQ | null>();
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
      setSelectedAnswer(Number(e.target.value));
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (selectedAnswer == -1) {
      alert("Please Select An Answer Before Submitting!");
    } else {
      setResponses([...responses, selectedAnswer]);
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (currQ != undefined) {
      let currQuestionID = currQ.id;
      if (currQuestionID < questionBank.length) {
        setCurrQ(questionBank[currQuestionID]);
        setSelectedAnswer(-1);
      } else {
        setCurrQ(null);
        props.setSurveyMode(SurveyStatus.Complete);
      }
    }
  };

  // we only render IF the question bank and the currQ have been updated and are not undefined
  return (
    <div className="curr-question">
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

export default SurveyQuestionManager;
