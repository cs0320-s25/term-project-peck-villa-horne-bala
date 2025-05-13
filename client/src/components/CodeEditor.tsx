import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { CompletionStatus, UserQuestionHashMap } from "../types";
import { useUser } from "@clerk/clerk-react";
import { CodeEditorProps } from "../types";
import { storeModuleList, updateModuleList } from "../home_screen/module_assembler/populate_modules/ModuleData";
import { Locked } from "../types";



const CodeEditor = (props: CodeEditorProps) => {
  const { isLoaded, user } = useUser();
  const [code, setCode] = useState(
    `public class Main {\n public static void main(String[] args) {\n ${props.initialCode} \n}      \n}`
  );
  const [output, setOutput] = useState("");
  console.log(`Level Completion Status: ${props.level.levelName}`, props.level.completionStatus);

  const handleRun = async () => {
    try {
      const response = await fetch(
        `http://localhost:3232/run?questionId=${props.questionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();
      setOutput(`✅ Passed: ${data.passed}\n🖨️ Output:\n${data.output}`);
      if (data.passed) {
        props.setLevelCompletionStatus?.(CompletionStatus.Complete);
        props.level.completionStatus = CompletionStatus.Complete;
        props.level.locked = Locked.Unlocked;
      } else {
        props.setLevelCompletionStatus?.(CompletionStatus.Incomplete);
        props.level.completionStatus = CompletionStatus.Incomplete;
        props.level.locked = Locked.Locked;
      }

    } catch (err) {
      setOutput(`❌ Error: ${err}`);
    }
    if (!isLoaded){
      console.log("User not loaded");
      return;
    }
    if (!user) {
      console.log("User not found");
      return;
    }
    updateModuleList(user.id);
  };

  return (
    <div>
      <Editor
        height="400px"
        language="java"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value ?? "")}
      />
      <button
        onClick={() =>
          setCode(
            `public class Main {\n public static void main(String[] args) {\n ${props.initialCode} \n}      \n}`
          )
        }
      >
        Clear Code
      </button>
      <button onClick={handleRun}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;
