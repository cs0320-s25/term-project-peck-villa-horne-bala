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
      <button onClick={() => navigate("/MFourLvlTwo")}>Previous Level</button>
      <h2>Module 4: Methods - Level 3: Return Types</h2>
      <p>
        Not all methods just print things but some return values. This means the
        method calculates something and gives you a result back.To do this, you
        change the return type from void to the type you're returning (like int,
        double, or String), and you use the return keyword.
        <code>public static int add(int a, int b) {`return a + b;`}</code>
        This method takes two integers, adds them, and returns the result. You
        can call it like this: int result = add(5, 3); and result will be 8.
        <br></br>
        <strong>
          Write a method called square(int number) that returns the square of a
          number. Print the result by calling the method in a print statement.
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module04_level03"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/Home")}>Congratulations! Return to Home</button>
      )}
    </div>
  );
}

export default MFourLvlThree;
