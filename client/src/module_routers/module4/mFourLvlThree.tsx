import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";


export function MFourLvlThree() {
  const levelinfo: LevelInfo = modulesList[3].levels[2];
  if (modulesList[3].levels[1].completionStatus === CompletionStatus.Complete) {
    levelinfo.locked = false;
  } else {
    levelinfo.locked = true;
  }
  console.log(levelinfo.locked);
  console.log(
    "Previous level complete?" + modulesList[3].levels[1].completionStatus
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <h2>Module 4: Operators - Level 3: Addition/Subtraction</h2>
      <p>
        We can use operators to add and subtract numbers. This is how we can
        calculate scores, totals, and more! In Java, “+” means addition and “-”
        means subtraction.
        <br></br>
        <strong>
          Task: Create two int variables, a = 100 and b = 5. Save the result of
          their sum in a variable called “sum” and save the result of their
          difference in a variable called “diff”. Print both variables! When
          printing you can use strings to separate variables like
          “System.out.println(variable1 + “ ” + variable2). This makes it
          possible to print both variables on one line with a space in the
          middle. Try it out!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module04_level03"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
    </div>
  );
}

export default MFourLvlThree;
