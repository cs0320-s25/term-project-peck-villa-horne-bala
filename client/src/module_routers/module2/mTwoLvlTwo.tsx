import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import { LevelInfo, CompletionStatus, Locked } from "../../types";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";
import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../../types";
import {
  getModuleListLocalStorage,
  populateModuleList,
} from "../../home_screen/module_assembler/populate_modules/ModuleData";

export function MTwoLvlTwo() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[1].levels[1]
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[1].levels[1];
      if (
        modulesList[1].levels[0].completionStatus === CompletionStatus.Complete
      ) {
        levelinfo.locked = Locked.Unlocked;
      } else {
        levelinfo.locked = Locked.Locked;
      }
      setLevelInfo(levelinfo);
      setLevelCompletionStatus(levelinfo.completionStatus);
    }
  }, [modulesList]);
  
  // Guard: If data not yet loaded, show loading or nothing
  if (modulesList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="module-page">
      <header className="module-header">
        <button className="back-button" onClick={() => navigate("/Home")}>
          Back
        </button>
        <h1 className="module-title">Module 2: Operators - Level 2: Multiplication and Division</h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            Multiplying (<span className="code-inline">*</span>) and dividing (<span className="code-inline">/</span>) numbers lets us solve more kinds of problems 
            like calculating the area of a rectangle or splitting a bill.
          </p>
          <p>
            <strong>Note:</strong> If you save the result of division in an int it will only save the non-decimal value. 
            For example if you do <span className="code-inline">int div = 5/2</span> then it will only save 2 instead of 2.5. 
            If you do <span className="code-inline">double div = 5/2</span> then it will save as 2.5
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Create three variables that equal, 10, 7, and 2. Print the multiplication of 10 and 7 as an int, 
            and the division of 7 and 2 as an int and double. Print it in the similar format as the last level, all on one line separated by commas!
          </div>
        </div>
        <div className="editor-box">
          <CodeEditor
            initialCode=""
            questionId="module02_level02"
            level={levelInfo}
            modules={modulesList}
            setLevelCompletionStatus={setLevelCompletionStatus}
          />
        </div>
      </div>

      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="previous-button"
            onClick={() => navigate("/MTwoLvlOne")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MTwoLvlThree")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MTwoLvlTwo;