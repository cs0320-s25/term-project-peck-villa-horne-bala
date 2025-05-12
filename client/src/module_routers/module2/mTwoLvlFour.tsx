import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { LevelInfo } from "../../types";
import { CompletionStatus } from "../../types";
import { useNavigate } from "react-router-dom";
import { Locked } from "../../types";

export function MTwoLvlFour() {
  const levelinfo: LevelInfo = modulesList[1].levels[3];
  if (modulesList[1].levels[2].completionStatus === CompletionStatus.Complete) {
     levelinfo.locked = Locked.Unlocked;
      } else {
        levelinfo.locked = Locked.Locked;
  }
  console.log(levelinfo.locked);
  console.log(
    "Previous level complete?" + modulesList[1].levels[2].completionStatus
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <button onClick={() => navigate("/MTwoLvlThree")}>Previous Level</button>
      <br></br>
      <h2>Module 2: Operators - Level 4: Order of Operations</h2>
      <p>
        Order of operations is the order in which calculations are performed
        when evaluating an expression. In Java, the order of operations is as
        follows: Parentheses, Exponents, Multiplication and Division (from left
        to right), and Addition and Subtraction (from left to right). This means
        that if you have an expression like 2 + 3 * 4, the multiplication will
        be performed first, resulting in 2 + 12 = 14. If you want to change the
        order of operations, you can use parentheses to group expressions. For
        example, (2 + 3) * 4 will be evaluated as 5 * 4 = 20. This is important
        because it allows you to control how calculations are performed and
        ensure that you get the correct result.
        <br></br>
        <strong>
          Task: Create a variable result and set it equal to 5 + 2 * 3. Print
          result to see what happens! Then create another variable fixedResult
          that uses parentheses to change the order like this: (5 + 2) * 3.
          Print result and fixedResult with a comma inbetween!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module02_level04"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MThreeLvlOne")}>Continue</button>
      )}
      <br></br>
    </div>
  );
}

export default MTwoLvlFour;
