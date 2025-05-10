import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";

export function MThreeLvlTwo() {
  const levelinfo: LevelInfo = modulesList[2].levels[1];
  if (modulesList[2].levels[0].completionStatus === CompletionStatus.Complete) {
    levelinfo.locked = false;
  } else {
    levelinfo.locked = true;
  }
  console.log(levelinfo.locked);
  console.log(
    "Previous level complete?" + modulesList[2].levels[0].completionStatus
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <button onClick={() => navigate("/MThreeLvlOne")}>Previous Level</button>
      <h2>Module 3: Operators - Level 2: Addition/Subtraction</h2>
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
        questionId="module03_level02"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MThreeLvlThree")}>Next Level</button>
      )}
    </div>
  );
}

export default MThreeLvlTwo;
