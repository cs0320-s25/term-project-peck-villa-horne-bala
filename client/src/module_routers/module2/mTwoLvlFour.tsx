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

export function MTwoLvlFour() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[1].levels[3]
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
      const levelinfo: LevelInfo = modulesList[1].levels[3];
      if (
        modulesList[1].levels[2].completionStatus === CompletionStatus.Complete
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
        <h1 className="module-title">
          Module 2: Operators - Level 4: Order of Operations
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            Order of operations is the order in which calculations are performed
            when evaluating an expression. In Java, the order of operations is
            as follows: Parentheses, Exponents, Multiplication and Division
            (from left to right), and Addition and Subtraction (from left to
            right). This means that if you have an expression like{" "}
            <span className="code-inline">2 + 3 * 4</span>, the multiplication
            will be performed first, resulting in{" "}
            <span className="code-inline">2 + 12 = 14</span>. If you want to
            change the order of operations, you can use parentheses to group
            expressions. For example,{" "}
            <span className="code-inline">(2 + 3) * 4</span> will be evaluated
            as <span className="code-inline">5 * 4 = 20</span>. This is
            important because it allows you to control how calculations are
            performed and ensure that you get the correct result.
          </p>
          <div className="task-highlight">
            <strong>Task:</strong> Create a variable{" "}
            <span className="code-inline">result</span> and set it equal to{" "}
            <span className="code-inline">5 plus 2 multiplied by 3</span>. Print{" "}
            <span className="code-inline">result</span> to see what happens!
            Then create another variable{" "}
            <span className="code-inline">fixedResult</span> that uses
            parentheses to change the order like this:{" "}
            <span className="code-inline">(5 plus 2) multiplied by 3</span>. Print{" "}
            <span className="code-inline">result</span> and{" "}
            <span className="code-inline">fixedResult</span> with a comma in
            between!
          </div>
        </div>

        <div className="editor-box">
          <CodeEditor
            initialCode=""
            questionId="module02_level04"
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
            onClick={() => navigate("/MTwoLvlThree")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MThreeLvlOne")}
          >
            Next Module
          </button>
        </div>
      )}
    </div>
  );
}

export default MTwoLvlFour;