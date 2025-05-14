import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { useNavigate } from "react-router-dom";
import { getModuleListLocalStorage } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import "../../styles/Module.css";
import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../../types";

export function MOneLvlOne() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelCompletionStatus, setLevelCompletionStatus] = useState<CompletionStatus | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      if (modules.length > 0 && modules[0].levels.length > 0) {
        setLevelCompletionStatus(modules[0].levels[0].completionStatus);
      }
    }
  }, [user]);

  // Guard: If data not yet loaded, show loading or nothing
  if (
    modulesList.length === 0 ||
    !modulesList[0]?.levels ||
    modulesList[0].levels.length === 0 ||
    levelCompletionStatus === null
  ) {
    return <div>Loading...</div>;
  }

  const levelInfo = modulesList[0].levels[0];

  return (
    <div className="module-page">
      <header className="module-header">
        <button className="back-button" onClick={() => navigate("/Home")}>
          Back
        </button>
        <h1 className="module-title">
          Module 1: Variables & Primitives - Level 1: What is a variable?
        </h1>
      </header>

      <div className="content-container">
        <div className="instruction-box">
          <p>
            In Java, variables are containers that store data in memory...
          </p>
          {/* (rest of instructional content omitted for brevity) */}
          <div className="task-highlight">
            <strong>Task:</strong> Try on your own creating an int type variable
            called num that stores the value 1000 and print it!
          </div>
        </div>

        <div className="editor-box">
          <CodeEditor
            initialCode=""
            questionId="module01_level01"
            level={levelInfo}
            modules={modulesList}
            setLevelCompletionStatus={setLevelCompletionStatus}
          />
        </div>
      </div>

      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="next-button"
            onClick={() => navigate("/MOneLvlTwo")}
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default MOneLvlOne;
