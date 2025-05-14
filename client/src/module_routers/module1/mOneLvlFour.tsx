import { useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus, Locked } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";

export function MOneLvlFour() {
  const levelInfo: LevelInfo = modulesList[0].levels[3];

  // Unlock the level if the previous level is complete
  if (modulesList[0].levels[2].completionStatus === CompletionStatus.Complete) {
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
          Module 1: Variables & Primitives - Level 4: Boolean Types
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            A boolean is the simplest type of data that can only be{" "}
            <span className="code-inline">true</span> or{" "}
            <span className="code-inline">false</span>. We use booleans when our
            program needs to make yes/no or on/off decisions.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Create a boolean called{" "}
            <span className="code-inline">isJavaFun</span> and set it to{" "}
            <span className="code-inline">true</span>. Print it to show your
            excitement for coding!
          </div>
        </div>

        <div className="editor-box">
          <div className="code-editor-container">
            <CodeEditor
              initialCode=""
              questionId="module01_level04"
              level={levelInfo}
              setLevelCompletionStatus={setLevelCompletionStatus}
            />
          </div>
          <div className="editor-actions">
            <button className="clear-button">Clear Code</button>
            <button className="run-button">Run Code</button>
          </div>
        </div>
      </div>

      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="previous-button"
            onClick={() => navigate("/MOneLvlThree")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MTwoLvlOne")}
          >
            Next Module
          </button>
        </div>
      )}
    </div>
  );
}

export default MOneLvlFour;
