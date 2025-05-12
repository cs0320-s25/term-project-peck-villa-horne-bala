import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import { Locked } from "../../types";

export function MThreeLvlTwo() {
  const levelinfo: LevelInfo = modulesList[2].levels[1];
  if (modulesList[2].levels[0].completionStatus === CompletionStatus.Complete) {
    levelinfo.locked = Locked.Unlocked;
     } else {
       levelinfo.locked = Locked.Locked;
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
      <h2>Module 3: Operators - Level 2: Else Statements</h2>
      <p>
        Else statements are used to execute a block of code if the condition in
        the if statement is false. This allows you to create more complex
        decision-making in your code. Additionally, there is another type of
        else statement called else-if that does take a condition and runs the
        code if the previous conditions were false. Always starting with an if
        statement, you can chain else-if statements to check different
        conditions. But remember that a regular else statement but always be
        placed last because it runs if all the previous conditions were false.
        <br></br>
        <strong>
          First create a variable “score” with the value 82. Then create a
          conditional chain where each conditional checks if your grade is a A
          (90 or above): print “Grade:A”, B (80 or above): print “Grade:B”, C
          (70 or above): print “Grade:C, lastly if all of those are false print
          “Grade:Incomplete”. You can use the else if statement to check for the other
          conditions. Try it out!
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
