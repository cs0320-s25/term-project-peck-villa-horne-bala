import React, {
  Component,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import AnswerChoices from "./AnswerChoices";
import Card from "react-bootstrap/Card";
import { QuestionProps } from "../types";
import "../styles/QuestionCards.css";


class Question extends Component<QuestionProps> {
  render() {
    const { currQ, onOptionChange, onSubmit, selectedAnswer } = this.props;

    return (
      <Card className="question-card">
        <Card.Title className="question-card-title">
          {currQ.question}
        </Card.Title>
        <form onSubmit={onSubmit} className="form">
            <AnswerChoices
              answerChoices={currQ.answerChoices}
              onOptionChange={onOptionChange}
              selectedAnswer={selectedAnswer}
            />
          <button className="question-btn" type="submit">SUBMIT</button>
        </form>
      </Card>
    );
  }
}

export default Question;
