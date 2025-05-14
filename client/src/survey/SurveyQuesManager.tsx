import {
  populateSurvey,
  populateSurveyAnswerChoices,
} from "./populate_survey/PopulateSurveyData";
import {
  useState,
  useEffect,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import Question from "../components/Question";
import { SurveyStatus } from "./SurveyManager";
import { SurveyManagerProps } from "../types";
import { FormatQ } from "../types";
import { useUser } from "@clerk/clerk-react";
import {updateFirestoreUserSurveyStatus} from "./SurveyApi";
import "../styles/QuestionCards.css"
import { sendSurveyResults } from "../home_screen/module_assembler/populate_modules/ModuleData";
/**
 * This function is in charge of going through the survey questions.
 * @param props 
 * @returns 
 */
export function SurveyQuestionManager(props: SurveyManagerProps) {
  const [questionBank, setQuestionBank] = useState<FormatQ[]>([]);
  const [responses, setResponses] = useState<number[]>([]);
  const [currQ, setCurrQ] = useState<FormatQ | null>();
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const { user } = useUser();

  //populates the question bank upon refresh
  useEffect(() => {
    const survey = populateSurvey();
    setQuestionBank(survey);
  //  console.log("responses: " + responses);

  }, []);

  useEffect(() => {
    console.log("responses: " + responses);
  }, [responses]);

  // populates the current question once the question bank is created
  useEffect(() => {
    if (questionBank.length != 0) {
      setCurrQ(questionBank[0]);
    }
  }, [questionBank]);

  // this is what updates the visual component of the answer choices
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currQ != undefined) {
      console.log("selected answer: " + e.target.value);
      console.log(selectedAnswer);
      setResponses([...responses, Number(e.target.value)]);
      setSelectedAnswer(Number(e.target.value));
    }
  };

  // checks that the user has submited an answer, stores the answer, and brings up the next question
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (selectedAnswer == -1) {
      alert("Please Select An Answer Before Submitting!");
    } else {
      handleNextQuestion();
    }
  };

  // sets up curr question as the next question IF not the end of the survey. If survey completed, then we load survey status complete to firebase
  const handleNextQuestion = async () => {
    if (currQ != undefined) {
      let currQuestionID = currQ.id;
      if (currQuestionID < questionBank.length) {
        setCurrQ(questionBank[currQuestionID]);
        setSelectedAnswer(-1);
        console.log("responses: " + responses);
      } else { // the survey has been completed
        setCurrQ(null);
        if (user?.id) {
          const surveyAnswerKey = populateSurveyAnswerChoices();
          console.log("survey answer key: "+ surveyAnswerKey);
          console.log("responses: " + responses);
          updateFirestoreUserSurveyStatus(user.id);
          sendSurveyResults(user.id, responses, surveyAnswerKey);
  

        }
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
