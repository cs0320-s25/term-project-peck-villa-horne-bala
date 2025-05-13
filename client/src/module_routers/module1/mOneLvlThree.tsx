import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus, Locked } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { LevelInfo } from "../../types";
import { useNavigate } from "react-router-dom";

export function MOneLvlThree() {
  const levelinfo: LevelInfo = modulesList[0].levels[2];
  if (modulesList[0].levels[1].completionStatus === CompletionStatus.Complete) {
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
      <button onClick={() => navigate("/MOneLvlOne")}>Previous Level</button>;
      <h2> Module 1: Variables & Primitives - Level 3: String Types</h2>
      <p>
        In Java, a string is a sequence of characters. Strings are used to
        represent text and can be created using double quotes. For example,
        "Hello, World!" is a string. Strings are immutable, meaning that once
        they are created, their values cannot be changed. However, you can
        create new strings based on existing ones.
        <br></br>
        <strong>
          Task: Task: Create a “String” variable called greeting and set it to
          "Hello, Java!". Print it in the sandbox!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module01_level03"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MOneLvlFour")}>Next Level</button>
      )}
      <br></br>
    </div>
  );
}

export default MOneLvlThree;
