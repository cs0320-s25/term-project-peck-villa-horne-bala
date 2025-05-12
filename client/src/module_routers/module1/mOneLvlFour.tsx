import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";


export function MOneLvlFour() {
  const moduleIndex = 0;
  const levelIndex = 3;

  const isLevelUnlocked = (moduleIndex: number, levelIndex: number): boolean => {
    if (levelIndex === 0) return true;
    return (
      modulesList[moduleIndex].levels[levelIndex - 1].completionStatus ===
      CompletionStatus.Complete
    );
  };

  const levelinfo: LevelInfo = modulesList[moduleIndex].levels[levelIndex];
  levelinfo.locked = !isLevelUnlocked(moduleIndex, levelIndex);

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
