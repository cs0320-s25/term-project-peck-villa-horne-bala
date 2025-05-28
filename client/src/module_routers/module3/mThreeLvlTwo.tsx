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

export function MThreeLvlTwo() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[2].levels[1]
  );

  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in module 3 lvl 2: ", modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[2].levels[1];
      if (
        modulesList[2].levels[0].completionStatus === CompletionStatus.Complete
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
          Module 3: Decision Making - Level 2: Else Statements
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            Else statements are used to execute a block of code if the condition
            in the <span className="code-inline">if</span> statement is false.
            This allows you to create more complex decision-making in your code.
          </p>
          <p>
            Additionally, there is another type of else statement called{" "}
            <span className="code-inline">else-if</span> that takes a condition
            and runs the code if the previous conditions were false. Always
            starting with an <span className="code-inline">if</span> statement,
            you can chain <span className="code-inline">else-if</span>{" "}
            statements to check different conditions. But remember that a
            regular <span className="code-inline">else</span> statement must
            always be placed last because it runs if all the previous conditions
            were false.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> First, create a variable{" "}
            <span className="code-inline">score</span> with the value{" "}
            <span className="code-inline">82</span>. Then create a conditional
            chain where each conditional checks:
            <ul>
              <li>
                If your grade is an A (90 or above): print{" "}
                <span className="code-inline">"Grade: A"</span>.
              </li>
              <li>
                If your grade is a B (80 or above): print{" "}
                <span className="code-inline">"Grade: B"</span>.
              </li>
              <li>
                If your grade is a C (70 or above): print{" "}
                <span className="code-inline">"Grade: C"</span>.
              </li>
              <li>
                Lastly, if all of those are false, print{" "}
                <span className="code-inline">"Grade: Incomplete"</span>.
              </li>
            </ul>
            Use the <span className="code-inline">else-if</span> statement to
            check for the other conditions. Try it out!
          </div>
        </div>

        <div className="editor-box">
            <CodeEditor
              initialCode=""
              questionId="module03_level02"
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
            onClick={() => navigate("/MThreeLvlOne")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MThreeLvlThree")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MThreeLvlTwo;
