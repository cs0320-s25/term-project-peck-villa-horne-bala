import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import {
  getModuleListLocalStorage,
  populateModuleList,
} from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";
import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../../types";
import { Locked } from "../../types";

export function MOneLvlTwo() {
  const { user } = useUser();
    const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
    const [levelCompletionStatus, setLevelCompletionStatus] =
      useState<CompletionStatus>(CompletionStatus.Incomplete);

    const [levelInfo, setLevelInfo] = useState<LevelInfo>(populateModuleList()[0].levels[1]);
    useEffect(() => {
      if (user?.id) {
        const modules = getModuleListLocalStorage(user.id);
        setModuleList(modules);
        console.log("module list in module 1 lvl 2: ", modules);
      }
    }, [user]);

    useEffect(() => {
      console.log(
        "completion status for m one lvl 2 changed to: " + levelCompletionStatus
      );
    }, [levelCompletionStatus]);
    useEffect(() => {
      if (modulesList.length > 0) {
        const levelinfo: LevelInfo = modulesList[0].levels[1];
        if (
          modulesList[0].levels[0].completionStatus ===
          CompletionStatus.Complete
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
          Module 1: Variables & Primitives - Level 2: Int vs Double
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            Java is a statically typed language which means most things need a
            type. You can create your own types but some types are already
            created in the language which are called primitive types. Last level
            we talked about
            <span className="code-inline">int</span>, which is a primitive type
            for storing non-decimal numbers. Another type is{" "}
            <span className="code-inline">double</span>, which is for storing
            decimal values.
          </p>
          <p>
            If you try to store a decimal in an{" "}
            <span className="code-inline">int</span>, Java will return an error,
            so make sure to always have a type and stick to it.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Try creating a variable called{" "}
            <span className="code-inline">amount</span> that stores the value{" "}
            <span className="code-inline">123</span> and a variable called{" "}
            <span className="code-inline">price</span>
            that stores the value <span className="code-inline">19.99</span>.
            Print out the value of <span className="code-inline">price</span>!
          </div>
        </div>

        <div className="editor-box">
         
            <CodeEditor
              initialCode=""
              questionId="module01_level02"
              level={levelInfo}
              modules={modulesList}
              setLevelCompletionStatus={setLevelCompletionStatus}
            />

          {/* <div className="editor-actions">
            <button className="clear-button">Clear Code</button>
            <button className="run-button">Run Code</button>
          </div> */}
        </div>
      </div>

      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="previous-button"
            onClick={() => navigate("/MOneLvlOne")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MOneLvlThree")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MOneLvlTwo;
