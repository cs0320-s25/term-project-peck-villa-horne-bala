import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import { Locked } from "../../types";

export function MThreeLvlOne() {
   const levelinfo: LevelInfo = modulesList[2].levels[0];
   if (
     modulesList[1].levels[3].completionStatus === CompletionStatus.Complete
   ) {
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
      <h2>Module 3: Decision Making - Level 1: If Statement</h2>
      <p>
        In Java, an if statement is used to execute a block of code only if a
        specified condition is true. It allows you to make decisions in your
        code. . Should the program display a message? Is a number high enough to
        pass a test? These kinds of decisions are handled using control
        statements in Java. The if statement is the simplest control statement.
        It runs a block of code only if a condition is true. For example, if you
        want to check if a number is positive, you can use an if statement like
        this:
        <br></br> "if (number {">"} 0){" "}
        {"System.out.println(The number is positive!)"}".
        <br></br>
        <strong>
          Task: Create a variable “age” that is 18 and write a conditional
          statement that checks if the variable is 18 or greater. If they are
          then print “You are eligible to vote”.
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module03_level01"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MThreeLvlTwo")}>Next Level</button>
      )}
    </div>
  );
}

export default MThreeLvlOne;
