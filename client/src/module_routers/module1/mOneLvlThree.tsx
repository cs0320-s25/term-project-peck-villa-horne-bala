import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../survey/components/CodeEditor";

export function MOneLvlThree() {
  return (
    <div>
      <h2> Module 1: Variables & Primitives - Level 3: String Types</h2>
      <CodeEditor initialCode="" questionId="three" />
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
      <br></br>
    </div>
  );
}

export default MOneLvlThree;
