import { useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus, Locked } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { LevelInfo } from "../../types";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";

export function MOneLvlThree() {
  const levelInfo: LevelInfo = modulesList[0].levels[2];

  // Unlock the level if the previous level is complete
  if (modulesList[0].levels[1].completionStatus === CompletionStatus.Complete) {
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
          Module 1: Variables & Primitives - Level 3: String Types
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            In Java, a string is a sequence of characters. Strings are used to
            represent text and can be created using double quotes. For example,
            <span className="code-inline">"Hello, World!"</span> is a string.
            Strings are immutable, meaning that once they are created, their
            values cannot be changed. However, you can create new strings based
            on existing ones.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Create a{" "}
            <span className="code-inline">String</span> variable called
            <span className="code-inline">greeting</span> and set it to
            <span className="code-inline">"Hello, Java!"</span>. Print it in the
            sandbox!
          </div>
        </div>

        <div className="editor-box">
            <CodeEditor
              initialCode=""
              questionId="module01_level03"
              level={levelInfo}
              setLevelCompletionStatus={setLevelCompletionStatus}
            />
        </div>
      </div>

      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="previous-button"
            onClick={() => navigate("/MOneLvlTwo")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MOneLvlFour")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MOneLvlThree;
