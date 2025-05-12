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
     console.log(
       "Previous level complete?" + modulesList[0].levels[2].completionStatus
     );
     const [levelCompletionStatus, setLevelCompletionStatus] =
       useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <h2> Module 1: Variables & Primitives - Level 4: Boolean Types</h2>
      <p>
        {/* ...instructions... */}
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
