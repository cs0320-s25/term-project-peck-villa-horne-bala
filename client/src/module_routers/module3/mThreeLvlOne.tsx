import { useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus, Locked } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";

export function MThreeLvlOne() {
  const levelInfo: LevelInfo = modulesList[2].levels[0];

  // Unlock the level if the previous level is complete
  if (modulesList[1].levels[3].completionStatus === CompletionStatus.Complete) {
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
          Module 3: Decision Making - Level 1: If Statement
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            In Java, an <span className="code-inline">if</span> statement is
            used to execute a block of code only if a specified condition is
            true. It allows you to make decisions in your code. Should the
            program display a message? Is a number high enough to pass a test?
            These kinds of decisions are handled using control statements in
            Java.
          </p>
          <p>
            The <span className="code-inline">if</span> statement is the
            simplest control statement. It runs a block of code only if a
            condition is true. For example, if you want to check if a number is
            positive, you can use an <span className="code-inline">if</span>{" "}
            statement like this:
          </p>
          <p className="code-example">
            <span className="code-inline">
              if (number &gt; 0) {"{"} System.out.println("The number is
              positive!"); {"}"}
            </span>
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Create a variable{" "}
            <span className="code-inline">age</span> that is 18 and write a
            conditional statement that checks if the variable is 18 or greater.
            If it is, print{" "}
            <span className="code-inline">"You are eligible to vote"</span>.
          </div>
        </div>

        <div className="editor-box">
            <CodeEditor
              initialCode=""
              questionId="module03_level01"
              level={levelInfo}
              setLevelCompletionStatus={setLevelCompletionStatus}
            />
        </div>
      </div>

      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="previous-button"
            onClick={() => navigate("/MTwoLvlFour")}
          >
            Previous Module
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MThreeLvlTwo")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MThreeLvlOne;
