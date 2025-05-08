import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { CompletionStatus, UserQuestionHashMap } from "../types";
import { useUser } from "@clerk/clerk-react";

interface CodeEditorProps {
  initialCode: string;
  questionId: string;
  setCompletionStatus?: (status: CompletionStatus) => void;
}

const CodeEditor = (props: CodeEditorProps) => {
  const [code, setCode] = useState(
    `public class Main {\n public static void main(String[] args) {\n ${props.initialCode} \n}      \n}`
  );
  const [output, setOutput] = useState("");
  const { user } = useUser();
  const progressMap: UserQuestionHashMap = {};

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
      // if (data.passed) {
      //   props.setCompletionStatus?.(CompletionStatus.Complete);
      //   if (user) {
      //   localStorage.setItem(user?.id, progressMap[props.questionId].status);
      //   }
      // } else {
      //   props.setCompletionStatus?.(CompletionStatus.Incomplete);
      // }
    } catch (err) {
      setOutput(`❌ Error: ${err}`);
    }
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
