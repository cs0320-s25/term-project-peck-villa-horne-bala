import { useState,useEffect } from "react";
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

export function MFourLvlThree() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[3].levels[2]
  );

  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in module 4 lvl 3: ", modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[3].levels[2];
      if (
        modulesList[3].levels[1].completionStatus === CompletionStatus.Complete
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
          Module 4: Methods - Level 3: Return Types
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            Not all methods just print things; some return values. This means
            the method calculates something and gives you a result back. To do
            this, you change the return type from{" "}
            <span className="code-inline">void</span> to the type you're
            returning (like <span className="code-inline">int</span>,{" "}
            <span className="code-inline">double</span>, or{" "}
            <span className="code-inline">String</span>), and you use the{" "}
            <span className="code-inline">return</span> keyword.
          </p>
          <p className="code-example">
            <span className="code-inline">
              public static int add(int a, int b) {"{"} return a + b; {"}"}
            </span>
          </p>
          <p>
            This method takes two integers, adds them, and returns the result.
            You can call it like this:
            <span className="code-inline">
              int result = add(5, 3);
            </span> and <span className="code-inline">result</span> will be{" "}
            <span className="code-inline">8</span>.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Write a method called{" "}
            <span className="code-inline">square(int number)</span> that returns
            the square of a number. Print the result by calling the method with{" "}
            <span className="code-inline">4</span> as the parameter in a print
            statement.
          </div>
        </div>

        <div className="editor-box">
            <CodeEditor
              initialCode=""
              questionId="module04_level03"
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
            onClick={() => navigate("/MFourLvlTwo")}
          >
            Previous Level
          </button>
          <button className="next-button" onClick={() => navigate("/finalLvl")}>
           Time for the Final Level!!
          </button>
        </div>
      )}
    </div>
  );
}

export default MFourLvlThree;
