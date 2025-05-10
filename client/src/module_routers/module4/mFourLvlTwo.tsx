import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";

export function MFourLvlTwo() {
  const levelinfo: LevelInfo = modulesList[3].levels[1];
  if (modulesList[3].levels[0].completionStatus === CompletionStatus.Complete) {
    levelinfo.locked = false;
  } else {
    levelinfo.locked = true;
  }
  console.log(levelinfo.locked);
  console.log(
    "Previous level complete?" + modulesList[3].levels[0].completionStatus
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <button onClick={() => navigate("/MFourLvlOne")}>Previous Level</button>
      <h2>Module 4: Methods - Level 1: Method Syntax</h2>
      <p>
        Sometimes you want your method to do something based on input: that’s
        where parameters come in! A parameter is like a variable you pass into
        the method. When you create a method you can define what type of
        variable must be passed in.
        <code>
          public static void greetUser(){" "}
          {` System.out.println("Hello, " + name + "!");
`}
        </code>
        Here the “String name” portion in the parenthesis is telling Java that
        to call this method you must put in a string and that string will be
        used in the method to print out a name. When you call
        greetUser("Alex");, it prints: Hello, Alex!
        <br></br>
        <strong>
          Task: Write a method printAge(int age) that prints: "You are X years old."
          Replace X with the age value passed in. Try calling it with different
          ages!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module04_level02"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MFourLvlThree")}>Next Level</button>
      )}
    </div>
  );
}

export default MFourLvlTwo;
