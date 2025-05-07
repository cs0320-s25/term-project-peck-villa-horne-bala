import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("public class Main {\n public static void main(String[] args) {\n System.out.println(\"Hello, World!\"); \n}      \n}");
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    try {
      const response = await fetch("http://localhost:3232/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(`✅ Passed: ${data.passed}\n🖨️ Output:\n${data.output}`);
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
      <button onClick={handleRun}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;
