import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import { LevelInfo, Locked } from "../../types";
import { CompletionStatus } from "../../types";
import {
  getModuleListLocalStorage,
  populateModuleList,
} from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";
import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../../types";


export function MTwoLvlOne() {
  const { user } = useUser();
    const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
    const [levelInfo, setLevelInfo] = useState<LevelInfo>(
      populateModuleList()[1].levels[0]
    );
  
    const [levelCompletionStatus, setLevelCompletionStatus] =
      useState<CompletionStatus>(CompletionStatus.Incomplete);
  
    useEffect(() => {
      if (user?.id) {
        const modules = getModuleListLocalStorage(user.id);
        setModuleList(modules);
        console.log("module list in module 2 lvl 1: ", modules);
      }
    }, [user]);
  
    useEffect(() => {
      if (modulesList.length > 0) {
        const levelinfo: LevelInfo = modulesList[1].levels[0];
        if (
          modulesList[0].levels[3].completionStatus === CompletionStatus.Complete
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
          Module 2: Operators - Level 1: Addition/Subtraction
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            We can use operators to add and subtract numbers. This is how we can
            calculate scores, totals, and more! In Java,{" "}
            <span className="code-inline">+</span> means addition and{" "}
            <span className="code-inline">-</span> means subtraction.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Create two variables,{" "}
            <span className="code-inline">a is equal to 100</span> and{" "}
            <span className="code-inline">b is equal to 24.362</span>. Save the result of
            their sum in a variable called{" "}
            <span className="code-inline">sum</span> and save the result of
            their difference in a variable called{" "}
            <span className="code-inline">diff</span>. Print the sum and the difference!
            When printing, you can use strings to separate variables like
            <span className="code-inline">
              System.out.println(variable1 + " and " + variable2)
            </span>
            . This makes it possible to print both variables on one line with a
            space in the middle. Try it out!
          </div>
        </div>

        <div className="editor-box">
         

            <CodeEditor
              initialCode=""
              questionId="module02_level01"
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
            onClick={() => navigate("/MOneLvlFour")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MTwoLvlTwo")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MTwoLvlOne;
