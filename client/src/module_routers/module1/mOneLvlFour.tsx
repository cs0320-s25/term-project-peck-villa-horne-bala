import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelProps } from "../../types";
import { useNavigate } from "react-router-dom";

export function MOneLvlFour() {
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>(
    CompletionStatus.Incomplete
  );
  const navigate = useNavigate();
  return (
    <div>
      <h2> Module 1: Variables & Primitives - Level 4: Boolean Types</h2>
      <p>
        In Java, a boolean is a data type that can hold one of two values: true
        or false. It is commonly used for conditional statements and logical
        operations. For example, you can use a boolean variable to check if a
        condition is met or to control the flow of a program. Booleans are
        essential for making decisions in your code, such as in if statements or
        loops. This variable can then be used in conditional statements to
        determine the flow of your program. Booleans are often used in
        conjunction with comparison operators (like ==, !=, {">"}, {"<"}) to
        evaluate conditions and make decisions based on the results. For
        instance, you can check if a number is greater than another number and
        store the result in a boolean variable: "boolean isGreater = (5 {">"}{" "}
        3);".
        <br></br>
        <strong>
          Task: Create a boolean called isJavaFun and set it to true. Print it
          to show your excitement for coding!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="four"
        setCompletionStatus={setCompletionStatus}
      />
      {completionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/Home")}>Continue</button>
      )}
    </div>
  );
}

export default MOneLvlFour;
