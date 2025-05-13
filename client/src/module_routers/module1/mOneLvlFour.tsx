import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import { Locked } from "../../types";

export function MOneLvlFour() {
   const levelinfo: LevelInfo = modulesList[0].levels[3];
    if (modulesList[0].levels[2].completionStatus === CompletionStatus.Complete) {
      levelinfo.locked = Locked.Unlocked;
       } else {
         levelinfo.locked = Locked.Locked;
    }
     console.log(levelinfo.locked);
     const [levelCompletionStatus, setLevelCompletionStatus] =
       useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <h2> Module 1: Variables & Primitives - Level 4: Boolean Types</h2>
      <p>
      A boolean is the simplest type of data that it can only be true or false.
      We use booleans when our program needs to make yes/no or on/off decisions.
      Task: Create a boolean called isJavaFun and set it to true. Print it to show your excitement for coding!

      </p>
      <CodeEditor
        initialCode=""
        questionId="module01_level04"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MTwoLvlOne")}>Continue</button>
      )}
    </div>
  );
}


export default MOneLvlFour;
