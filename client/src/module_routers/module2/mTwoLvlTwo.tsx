import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { LevelInfo } from "../../types";
import { CompletionStatus } from "../../types";
import { useNavigate } from "react-router-dom";

export function MTwoLvlTwo() {
  const levelinfo: LevelInfo = modulesList[1].levels[1];
  if (modulesList[1].levels[0].completionStatus === CompletionStatus.Complete) {
    levelinfo.locked = false;
  } else {
    levelinfo.locked = true;
  }
  console.log(levelinfo.locked);
  console.log(
    "Previous level complete?" + modulesList[1].levels[0].completionStatus
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <button onClick={() => navigate("/MTwoLvlOne")}>Previous Level</button>
      <h2>Module 2: Operators - Level 2: Multiplication/Divison</h2>
      <p>
        Multiplying (*) and dividing (/) numbers lets us solve more kinds of
        problems like calculating the area of a rectangle or splitting a bill.
        Note: If you save the result of division in an int it will only save the
        non-decimal value. For example if you do int div = 5/2 then it will only
        save 2 instead of 2.5. If you do double div = 5/2 then it will save as
        2.5. This is because int is a whole number and double is a decimal
        number. So if you want to save the decimal value you need to use double
        instead of int. For example, double div = 5.0/2.0 will save the value as
        2.5.
        <br></br>
        <strong>
          Task: Create three variables that equal, 10, 7, and 2. Print the
          multiplication of 10 and 7 as an int, and the division of 7 and 2 as
          an int and double. Print it in the similar format as the last level,
          all on one line separated by spaces!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module02_level02"
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

export default MTwoLvlTwo;
