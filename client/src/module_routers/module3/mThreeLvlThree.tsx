import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";

export function MThreeLvlThree() {
  const levelinfo: LevelInfo = modulesList[2].levels[2];
  if (modulesList[2].levels[1].completionStatus === CompletionStatus.Complete) {
    levelinfo.locked = false;
  } else {
    levelinfo.locked = true;
  }
  console.log(levelinfo.locked);
  console.log(
    "Previous level complete?" + modulesList[2].levels[1].completionStatus
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
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
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
         {levelCompletionStatus === CompletionStatus.Complete && (
              <button onClick={() => navigate("/MFourLvlOne")}>Continue</button>
            )}
    </div>
  );
}

export default MThreeLvlThree;
