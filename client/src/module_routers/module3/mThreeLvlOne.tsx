import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";

export function MThreeLvlOne() {
  return (
    <div>
      <h2>Module 3: Decision Making - Level 1: If Statement</h2>
      <CodeEditor initialCode="" questionId="nine" />
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
          Task: Create two int variables, a = 100 and b = 5. Save the result of
          their sum in a variable called “sum” and save the result of their
          difference in a variable called “diff”. Print both variables! When
          printing you can use strings to separate variables like
          “System.out.println(variable1 + “ ” + variable2). This makes it
          possible to print both variables on one line with a space in the
          middle. Try it out!
        </strong>
      </p>
    </div>
  );
}

export default MThreeLvlOne;
