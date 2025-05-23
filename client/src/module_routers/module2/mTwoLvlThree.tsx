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

export function MTwoLvlThree() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[1].levels[2]
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
      const levelinfo: LevelInfo = modulesList[1].levels[2];
      if (
        modulesList[1].levels[1].completionStatus === CompletionStatus.Complete
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
        <h1 className="module-title">Module 2: Operators - Level 3: Modulus</h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            The modulus operator (<span className="code-inline">%</span>) is
            used to find the remainder of a division operation. It is useful for
            determining if a number is even or odd, or for performing
            calculations that involve remainders. For example,{" "}
            <span className="code-inline">10 % 3</span> would give you{" "}
            <span className="code-inline">1</span>, because when you divide 10
            by 3, the remainder is 1.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> In the format{" "}
            <span className="code-inline">x % y</span>, find the remainder of:
            <ul>
              <li>
                <span className="code-inline">7 % 3</span>
              </li>
              <li>
                <span className="code-inline">5 % 1</span>
              </li>
              <li>
                <span className="code-inline">4 % 18</span>
              </li>
            </ul>
            Also, come up with your own way of getting the remainder{" "}
            <span className="code-inline">9</span>. Print the result of each
            modulus operation with commas in between and think about what it
            means!
            <br />
            <em>Note:</em> If the first number is less than the second, the
            modulus will always return the first number's value.
          </div>
        </div>

        <div className="editor-box">
          <CodeEditor
            initialCode=""
            questionId="module02_level03"
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
            onClick={() => navigate("/MTwoLvlTwo")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MTwoLvlFour")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MTwoLvlThree;