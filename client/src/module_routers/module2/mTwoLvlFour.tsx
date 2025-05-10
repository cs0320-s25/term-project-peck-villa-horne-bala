import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { LevelInfo } from "../../types";
import { CompletionStatus } from "../../types";
import { useNavigate } from "react-router-dom";

export function MTwoLvlFour() {
  const levelinfo: LevelInfo = modulesList[1].levels[3];
  if (modulesList[1].levels[2].completionStatus === CompletionStatus.Complete) {
    levelinfo.locked = false;
  } else {
    levelinfo.locked = true;
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
      <h2>Module 2: Operators - Level 3: Modulus</h2>
      <p>
        The modulus operator (%) is used to find the remainder of a division
        operation. It is useful for determining if a number is even or odd, or
        for performing calculations that involve remainders. For example, 10 % 3
        would give you 1, because when you divide 10 by 3, the remainder is 1.
        <br></br>
        <strong>
          Task: Use a % b to find the remainder of 7 divided by 3, 5 divided by
          1 and 4 divided by 18. Also come up with your own way of getting the
          remainder 9. Print the answer and think about what it means! Note: if
          the first number is less than the second then the modulus will always
          return the first numbers value.
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module02_level04"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
    </div>
  );
}

export default MTwoLvlFour;
