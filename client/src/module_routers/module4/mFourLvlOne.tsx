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

export function MFourLvlOne() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[3].levels[0]
  );

  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in module 4 lvl 1: ", modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[3].levels[0];
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
          Module 4: Methods - Level 1: Method Syntax
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            Methods in Java are like mini-programs inside your program. They
            help you break your code into smaller, reusable parts. Instead of
            repeating code, you can write a method once and "call" it whenever
            you need it. This makes your programs easier to read, debug, and
            maintain.
          </p>
          <p className="code-example">
            <span className="code-inline">
              public static void sayHello() {"{"} System.out.println("Hello");{" "}
              {"}"}
            </span>
          </p>
          <p>
            <strong>Explanation:</strong>
            <ul>
              <li>
                <span className="code-inline">public static</span> – Keywords
                you'll use for now (we’ll dive deeper later).
              </li>
              <li>
                <span className="code-inline">void</span> – The return type (in
                this case, it returns nothing because it's void).
              </li>
              <li>
                <span className="code-inline">sayHello()</span> – The method
                name and parentheses.
              </li>
              <li>
                <span className="code-inline">{"{}"}</span> – The body of the
                method, where the code goes.
              </li>
            </ul>
            You can call this method in Java by doing{" "}
            <span className="code-inline">sayHello()</span> in main, and it will
            print “Hello” when it runs.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Create a method called{" "}
            <span className="code-inline">greet</span> that prints{" "}
            <span className="code-inline">"Welcome to Java"</span> and call it
            in main.
          </div>
        </div>

        <div className="editor-box">
          <div className="code-editor-container">
            <CodeEditor
              initialCode=""
              questionId="module04_level01"
              level={levelInfo}
              modules={modulesList}
              setLevelCompletionStatus={setLevelCompletionStatus}
            />
          </div>
         
        </div>
      </div>

      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="previous-button"
            onClick={() => navigate("/MThreeLvlThree")}
          >
            Previous Module
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MFourLvlTwo")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MFourLvlOne;
