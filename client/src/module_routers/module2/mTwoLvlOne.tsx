import { useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import { LevelInfo, Locked } from "../../types";
import { CompletionStatus } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";

export function MTwoLvlOne() {
  const levelinfo: LevelInfo = modulesList[1].levels[0];
  if (modulesList[0].levels[3].completionStatus === CompletionStatus.Complete
    && modulesList[0].levels[3].locked === Locked.Unlocked
  ) {
    levelinfo.locked = Locked.Unlocked;
     } else {
       levelinfo.locked = Locked.Locked;
  }
  console.log(levelinfo.locked);
  // console.log(
  //   "Previous level complete?" + modulesList[0].levels[4].completionStatus
  // );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <h2>Module 2: Operators - Level 1: Addition/Subtraction</h2>
      <p>
        We can use operators to add and subtract numbers. This is how we can
        calculate scores, totals, and more! In Java, “+” means addition and “-”
        means subtraction.
        <br></br>
        <strong>
          Task: Create two variables, a = 100 and b = 24.362. Save the result of
          their sum in a variable called “sum” and save the result of their
          difference in a variable called “diff”. Print both variables! When
          printing you can use strings to separate variables like
          “System.out.println(variable1 + “ and ” + variable2). This makes it
          possible to print both variables on one line with a space in the
          middle. Try it out!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module02_level01"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MTwoLvlTwo")}>Next Level</button>
      )}
      <br></br>
    </div>
  );
}

export default MTwoLvlOne;
