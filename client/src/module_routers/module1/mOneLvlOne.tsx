import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../../survey/components/CodeEditor";

export function MoneLvlOne() {
  return (
   <div>
      <h1> Module 1: Variables & Primitives - Level 1: What is a variable?</h1>
      <p>
        In Java, variables are containers that store data in memory.
        Understanding variables plays a very important role as it defines how
        data is stored, accessed, and manipulated. The next module we will learn
        about types but for this demonstration we will start with the “int” type
        which tells java that you are trying to store a non decimal number. Ex:
        “int age = 19;”, where int is the type, age in the name of the variable
        and 19 is value that the variable is storing. Also remember that we use
        the equal sign to assign a value to a variable and almost every
        statement should end with a semicolon.
        <br></br>{" "}
        <strong>
          {" "}
          Task: Try on your own creating an int type variable called num that stores
          the value 1000!{" "}
        </strong>
      </p>
      <CodeEditor initialCode="" questionId="1" />
   </div>
  );
}

export default MoneLvlOne;
