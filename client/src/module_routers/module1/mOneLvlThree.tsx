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
        modulesList[0].levels[0].completionStatus === CompletionStatus.Complete
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
  
 
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <button onClick={() => navigate("/MOneLvlOne")}>Previous Level</button>;
      <h2> Module 1: Variables & Primitives - Level 3: String Types</h2>
      <p>
        In Java, a string is a sequence of characters. Strings are used to
        represent text and can be created using double quotes. For example,
        "Hello, World!" is a string. Strings are immutable, meaning that once
        they are created, their values cannot be changed. However, you can
        create new strings based on existing ones.
        <br></br>
        <strong>
          Task: Task: Create a “String” variable called greeting and set it to
          "Hello, Java!". Print it in the sandbox!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module01_level03"
        level={levelInfo}
        modules={modulesList}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
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
