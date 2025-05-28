import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus, Locked } from "../../types";
import {
  getModuleListLocalStorage,
  populateModuleList,
} from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { LevelInfo } from "../../types";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";
import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../../types";

export function MOneLvlThree() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[0].levels[2]
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in module 1 lvl 3: ", modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[0].levels[2];
      if (
        modulesList[0].levels[1].completionStatus === CompletionStatus.Complete
      ) {
        levelinfo.locked = Locked.Unlocked;
      } else {
        levelinfo.locked = Locked.Locked;
      }
      setLevelInfo(levelinfo);
      setLevelCompletionStatus(levelinfo.completionStatus);
    }
  }, [modulesList]);

  useEffect(() => {
    console.log(
      "completion status for m one lvl 3 changed to: " + levelCompletionStatus
    );
  }, [levelCompletionStatus]);

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
          Module 1: Variables & Primitives - Level 3: String Types
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            In Java, a <span className="code-inline">String</span> is a sequence of characters and are used to
            represent text. They can be created using double quotes:
            "Hello" is a <span className="code-inline">String</span>. Strings are immutable, meaning that once
            they are created, their values cannot be changed. However, you can
            create new strings based on existing ones by adding them together. 
            This process is called <span className="code-inline">concatenation</span> and is possible by adding two
            {" "}<span className="code-inline">String</span> types together.
          </p>
          <p>
            Example: If you have a variable <span className="code-inline">str1</span> that equals "Brown" and a variable <span className="code-inline">str2</span> that equals "University",
            <span className="text-highlight"> str1 + " " + str2</span> would equal "Brown University"
          </p>
          
          <div className="task-highlight">
            <strong>Task:</strong> Create two String variables called <span className="code-inline">greeting1</span> and <span className="code-inline">greeting2</span>. 
            <span className="code-inline">greeting1</span> should equal "Hello," and <span className="code-inline">greeting2</span> should equal "Java!"
            Concatenate them in such a way that when you print them together the output is "Hello, Java!".  
          </div>
        </div>

        <div className="editor-box">
          <CodeEditor
            initialCode=""
            questionId="module01_level03"
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
            onClick={() => navigate("/MOneLvlTwo")}
          >
            Previous Level
          </button>
          <button
            className="next-button"
            onClick={() => navigate("/MOneLvlFour")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MOneLvlThree;