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

export function MThreeLvlThree() {
  const { user } = useUser();
  const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(
    populateModuleList()[1].levels[3]
  );

  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(CompletionStatus.Incomplete);

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in module 3 lvl 3: ", modules);
    }
  }, [user]);

  useEffect(() => {
    if (modulesList.length > 0) {
      const levelinfo: LevelInfo = modulesList[2].levels[2];
      if (
        modulesList[2].levels[1].completionStatus === CompletionStatus.Complete
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
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <button onClick={() => navigate("/MThreeLvlTwo")}>Previous Level</button>
      <h2>Module 3: Operators - Multiple Conditions</h2>
      <p>
        Sometimes we need to check more than one condition at the same time.
        Java gives us logical operators to combine conditions:
        <ul>
          <li>&& means AND: – both conditions must be true </li>
          <li>|| means OR – at least one condition must be true. </li>
          <li>
            ! means NOT – reverses the condition (true becomes false and vice
            versa).
          </li>
        </ul>
        <br></br>
        <strong>
          Task: create a variable “age” that is 20 and create a conditional
          statement that checks if age is greater than or equal to 18 and if
          they have a ticket. If so print “You can enter the concert”, if not
          print “You cannot enter the concert”. Try it out!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module03_level03"
        level={levelInfo}
        modules={modulesList}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MFourLvlOne")}>Continue</button>
      )}
    </div>
  );
}

export default MThreeLvlThree;
