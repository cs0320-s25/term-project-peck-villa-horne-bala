import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus, Locked } from "../../types";
import { LevelInfo } from "../../types";
import {
  getModuleListLocalStorage,
  populateModuleList,
} from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";
import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../../types";

export function MThreeLvlThree() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[2].levels[2]
  );

  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in module 3 lvl 3: ", modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[2].levels[2];
      if (
        modulesList[2].levels[1].completionStatus === CompletionStatus.Complete
      ) {
        levelinfo.locked = Locked.Unlocked;
      } else {
        levelinfo.locked = Locked.Locked;
      }
      setLevelInfo(levelinfo);
      setLevelCompletionStatus(levelinfo.completionStatus);
    }
  }, [modulesList]);

  const navigate = useNavigate();

  return (
    <div className="module-page">
      <header className="module-header">
        <button className="back-button" onClick={() => navigate("/Home")}>
          Back
        </button>
        <h1 className="module-title">
          Module 3: Decision Making - Level 3: Multiple Conditions
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            Sometimes we need to check more than one condition at the same time.
            Java gives us logical operators to combine conditions:
          </p>
          <ul>
            <li>
              <span className="code-inline">&&</span> means AND: both conditions
              must be true.
            </li>
            <li>
              <span className="code-inline">||</span> means OR: at least one
              condition must be true.
            </li>
            <li>
              <span className="code-inline">!</span> means NOT: reverses the
              condition (true becomes false and vice versa).
            </li>
          </ul>
          <div className="task-highlight">
            <strong>Task:</strong> Create a variable{" "}
            <span className="code-inline">age</span> that is 20 and a boolean
            called <span className="code-inline">hasTicket</span> and create a
            conditional statement that checks if:
            <ul>
              <li>
                <span className="code-inline">age</span> is greater than or
                equal to 18
              </li>
              <li>They have a ticket</li>
            </ul>
            If both conditions are true, print{" "}
            <span className="code-inline">"You can enter the concert."</span>.
            Otherwise, print{" "}
            <span className="code-inline">"Sorry, you can’t enter."</span>. Try
            it out!
          </div>
        </div>

        <div className="editor-box">
          <CodeEditor
            initialCode=""
            questionId="module03_level03"
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
            onClick={() => navigate("/MThreeLvlTwo")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MFourLvlOne")}
          >
            Next Module
          </button>
        </div>
      )}
    </div>
  );
}

export default MThreeLvlThree;
