import { useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import { LevelInfo, Locked } from "../../types";
import { CompletionStatus } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";

export function MTwoLvlOne() {
  const levelInfo: LevelInfo = modulesList[1].levels[0];

  // Unlock the level if the previous level is complete
  if (
    modulesList[0].levels[3].completionStatus === CompletionStatus.Complete &&
    modulesList[0].levels[3].locked === Locked.Unlocked
  ) {
    levelInfo.locked = Locked.Unlocked;
  } else {
    levelInfo.locked = Locked.Locked;
  }

  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelInfo.completionStatus);
  const navigate = useNavigate();

  return (
    <div className="module-page">
      <header className="module-header">
        <button className="back-button" onClick={() => navigate("/Home")}>
          Back
        </button>
        <h1 className="module-title">
          Module 2: Operators - Level 1: Addition/Subtraction
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            We can use operators to add and subtract numbers. This is how we can
            calculate scores, totals, and more! In Java,{" "}
            <span className="code-inline">+</span> means addition and{" "}
            <span className="code-inline">-</span> means subtraction.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Create two variables,{" "}
            <span className="code-inline">a = 100</span> and{" "}
            <span className="code-inline">b = 24.362</span>. Save the result of
            their sum in a variable called{" "}
            <span className="code-inline">sum</span> and save the result of
            their difference in a variable called{" "}
            <span className="code-inline">diff</span>. Print both variables!
            When printing, you can use strings to separate variables like
            <span className="code-inline">
              System.out.println(variable1 + " and " + variable2)
            </span>
            . This makes it possible to print both variables on one line with a
            space in the middle. Try it out!
          </div>
        </div>

        <div className="editor-box">
            <CodeEditor
              initialCode=""
              questionId="module02_level01"
              level={levelInfo}
              setLevelCompletionStatus={setLevelCompletionStatus}
            />
        </div>
      </div>

      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="previous-button"
            onClick={() => navigate("/MOneLvlFour")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MTwoLvlTwo")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MTwoLvlOne;
