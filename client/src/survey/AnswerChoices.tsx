import React, { Component, Dispatch, SetStateAction, useState } from "react";

interface AnsChoiceProps {
  answerChoices: string[];
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class AnswerChoices extends Component<AnsChoiceProps> {
  render() {
    const { answerChoices, onOptionChange} = this.props;
    

    return (
      <div className="options">
        {answerChoices.map((ansChoice, index) => (
          <div key={index} className="form-check">
            <input
              type="radio"
              name="answerChoice"
              value={ansChoice}
              onChange={onOptionChange}
              className="form-check-input"
            />
            <label className="form-check-label">{ansChoice}</label>
          </div>
        ))}
      </div>
    );
  }
}

export default AnswerChoices;
