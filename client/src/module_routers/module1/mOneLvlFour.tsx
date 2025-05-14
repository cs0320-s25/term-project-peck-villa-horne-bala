import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus, Locked } from "../../types";
import { LevelInfo } from "../../types";
import {
  populateModuleList,
  getModuleListLocalStorage,
} from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";
import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../../types";

export function MOneLvlFour() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[0].levels[3]
  );

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in module 1 lvl 4: ", modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[0].levels[3];
      if (
        modulesList[0].levels[2].completionStatus === CompletionStatus.Complete
      ) {
        levelinfo.locked = Locked.Unlocked;
      } else {
        levelinfo.locked = Locked.Locked;
      }
      setLevelInfo(levelinfo);
      setLevelCompletionStatus(levelinfo.completionStatus);
    }
  }, [modulesList]);

  useEffect(()=>{
    console.log("completion status for m one lvl 4 changed to: "+ levelCompletionStatus)
  }, [levelCompletionStatus])

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
            <CodeEditor
              initialCode=""
              questionId="module01_level04"
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
