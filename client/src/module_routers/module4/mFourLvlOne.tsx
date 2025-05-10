import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";

export function MFourLvlOne() {
  const levelinfo: LevelInfo = modulesList[3].levels[0];
  if (modulesList[2].levels[2].completionStatus === CompletionStatus.Complete) {
    levelinfo.locked = false;
  } else {
    levelinfo.locked = true;
  }
  console.log(levelinfo.locked);
  console.log(
    "Previous level complete?" + modulesList[2].levels[2].completionStatus
  );
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <h2>Module 4: Methods - Level 1: Method Syntax</h2>
      <p>
        Methods in Java are like mini-programs inside your program. They help
        you break your code into smaller, reusable parts. Instead of repeating
        code, you can write a method once and "call" it whenever you need it.
        This makes your programs easier to read, debug, and maintain.
        <code>
          public static void sayHello() {`System.out.println("Hello");`}
        </code>
        public static – Keywords you'll use for now (we’ll dive deeper later).
        void – The return type (in this case, it returns nothing because its
        void). sayHello() – The method name and parentheses.
        {} – The body of the method, where the code goes. So you can call this
        method in Java by doing sayHello() in main and it will print “Hello”
        when it runs Task: Create a method called greet that prints “Welcome to
        Java” and call it in main
        <br></br>
        <strong>
          Task: Create two int variables, a = 100 and b = 5. Save the result of
          their sum in a variable called “sum” and save the result of their
          difference in a variable called “diff”. Print both variables! When
          printing you can use strings to separate variables like
          “System.out.println(variable1 + “ ” + variable2). This makes it
          possible to print both variables on one line with a space in the
          middle. Try it out!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module04_level01"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MFourLvlTwo")}>Next Level</button>
      )}
    </div>
  );
}

export default MFourLvlOne;
