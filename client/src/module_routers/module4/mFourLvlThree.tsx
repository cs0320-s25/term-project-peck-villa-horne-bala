import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../survey/components/CodeEditor";

export function MThreeLvlFour() {
  return (
    <div>
      <h2>Module 2: Operators - Level 1: Addition/Subtraction</h2>
      <CodeEditor initialCode="" questionId="five" />
      <p>
        We can use operators to add and subtract numbers. This is how we can
        calculate scores, totals, and more! In Java, “+” means addition and “-”
        means subtraction.
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

export default MFourLvlFour;
