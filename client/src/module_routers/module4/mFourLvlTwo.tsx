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

export function MFourLvlTwo() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[3].levels[1]
  );

  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in module 4 lvl 2: ", modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[3].levels[1];
      if (
        modulesList[2].levels[2].completionStatus === CompletionStatus.Complete
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
          Module 4: Methods - Level 2: Method Parameters
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            Sometimes you want your method to do something based on input:
            that’s where parameters come in! A parameter is like a variable you
            pass into the method. When you create a method, you can define what
            type of variable must be passed in.
          </p>
          <p className="code-example">
            <span className="code-inline">
              public static void greetUser(String name) {"{"}{" "}
              System.out.println("Hello, " + name + "!"); {"}"}
            </span>
          </p>
          <p>
            Here the <span className="code-inline">String name</span> portion in
            the parentheses is telling Java that to call this method, you must
            put in a string, and that string will be used in the method to print
            out a name. When you call{" "}
            <span className="code-inline">greetUser("Alex");</span>, it prints:{" "}
            <span className="code-inline">Hello, Alex!</span>
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Write a method{" "}
            <span className="code-inline">printAge(int age)</span> that prints:{" "}
            <span className="code-inline">"You are X years old."</span> Replace{" "}
            <span className="code-inline">X</span> with the age value passed in.
            Try calling it with ages <span className="code-inline">21</span>,{" "}
            <span className="code-inline">42</span>, and{" "}
            <span className="code-inline">78</span>!
          </div>
        </div>

        <div className="editor-box">
            <CodeEditor
              initialCode=""
              questionId="module04_level02"
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
            onClick={() => navigate("/MFourLvlOne")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MFourLvlThree")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MFourLvlTwo;
