import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../survey/components/CodeEditor";

export function MTwoLvlTwo() {
  return (
    <div>
      <h2>Module 2: Operators - Level 2: Multiplication/Divison</h2>
      <CodeEditor initialCode="" questionId="six" />
      <p>
        Multiplying (*) and dividing (/) numbers lets us solve more kinds of
        problems like calculating the area of a rectangle or splitting a bill.
        Note: If you save the result of division in an int it will only save the
        non-decimal value. For example if you do int div = 5/2 then it will only
        save 2 instead of 2.5. If you do double div = 5/2 then it will save as
        2.5. This is because int is a whole number and double is a decimal
        number. So if you want to save the decimal value you need to use double
        instead of int. For example, double div = 5.0/2.0 will save the value as
        2.5.
        <br></br>
        <strong>
          Task: Create three variables that equal, 10, 7, and 2. Print the
          multiplication of 10 and 7 as an int, and the division of 7 and 2 as
          an int and double. Print it in the similar format as the last level,
          all on one line separated by spaces!
        </strong>
      </p>
    </div>
  );
}

export default MTwoLvlTwo;
