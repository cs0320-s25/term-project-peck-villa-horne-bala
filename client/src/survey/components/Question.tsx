import { FormatQ } from "../routers/SurveyManager";
import React, {
  Component,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import AnswerChoices from "./AnswerChoices";

interface QuestionProps {
  currQ: FormatQ;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  selectedAnswer: number;
}

class Question extends Component<QuestionProps> {
  render() {
    const { currQ, onOptionChange, onSubmit, selectedAnswer } = this.props;

    return (
      <div className="">
        <h5 className="question_index">{currQ.question}</h5>
        <form onSubmit={onSubmit} className="mt-2 mb-2">
          <AnswerChoices
            answerChoices={currQ.answerChoices}
            onOptionChange={onOptionChange}
            selectedAnswer={selectedAnswer}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default Question;
