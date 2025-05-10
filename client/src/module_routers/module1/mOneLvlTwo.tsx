import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { LevelInfo } from "../../types";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";

export function MOneLvlTwo() {
  const levelinfo: LevelInfo = modulesList[0].levels[1];
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();
  return (
    <div>
      <h2> Module 1: Variables & Primitives - Level 2: Int vs Double</h2>
      <button onClick={() => navigate("/Home")}>Back</button>
      <button onClick={() => navigate("/MOneLvlOne")}>Previous Level</button>
      <p>
        Java is a statically typed language which means most things need a type.
        You can create your own types but some types are already created in the
        language which are called primitive types. Last level we talked about
        int which is a primitive type for storing not decimal numbers. Another
        type is a double which is for storing decimal values. If you try to
        store a decimal in an int then java will return an error so make sure to
        always have a type and stick to it.
        <br></br>
        <strong>
          Task: Try creating a variable called “amount” that stores the value
          123 and a variable called “price” that stores the value 19.99. Print
          out price value!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module01_level02"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MoneLvlThree")}>Next Level</button>
      )}
    </div>
  );
}

export default MOneLvlTwo;
