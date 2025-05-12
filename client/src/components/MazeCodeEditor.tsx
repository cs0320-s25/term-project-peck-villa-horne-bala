import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { CompletionStatus, UserQuestionHashMap } from "../types";
import { useUser } from "@clerk/clerk-react";
import { CodeEditorProps } from "../types";
import { storeModuleList } from "../home_screen/module_assembler/populate_modules/ModuleData";
import { Locked } from "../types";
import Maze from "../components/maze";


const MazeCodeEditor = (props: CodeEditorProps) => {
  const { isLoaded, user } = useUser();
  const [code, setCode] = useState(
    `public class Main {\n public static void main(String[] args) {\n ${props.initialCode} \n}      \n}`
  );
  const [output, setOutput] = useState("");
    console.log(`Level Completion Status: ${props.level.levelName}`, props.level.completionStatus);
  const [playerPosition, setPlayerPosition] = useState({ row: 12, col: 7 }); // Start at 'S'

  type Cell = 0 | 1 | 'S' | 'E';
  
  const maze: Cell[][] = [
    [1,'E',1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,1,1,1,0,1,1,1],
    [1,0,1,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,1,1,1,0,1,0,1,0,1],
    [1,1,0,1,1,0,0,0,0,1,0,1],
    [1,1,0,1,1,0,1,1,1,1,0,1],
    [1,1,0,0,1,0,1,1,1,1,1,1],
    [1,1,1,0,1,0,1,1,1,0,1,1],
    [1,1,1,0,1,0,0,0,1,0,1,1],
    [1,1,1,0,1,1,1,0,1,0,1,1],
    [1,1,1,0,0,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,'S',1,1,1,1]
  ];

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

      const result = parseCommand(data.output);
      if(result){
        movePlayer(result)
      }
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
    console.log("Storing modules for user:", user.id);
    storeModuleList(user.id);
    
  };

  return (
    <div>
    <div className="container">
      <Editor
        height="400px"
        language="java"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value ?? "")}
      />
      <Maze playerPosition={playerPosition} grid={maze} />
    </div>
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
  function parseCommand(input: string): string[] {
    return input.split(",").map(item => item.trim());
}
function movePlayer(commands: string[]) {
  let row = 12;
  let col = 7;

  commands.forEach((command) => {
    const match = command.trim().match(/^(UP|DOWN|LEFT|RIGHT)\s+(\d+)$/);
    if (!match) {
      console.log("******** Command: " + command)
      console.log("Incorrect command format!");
      return;
    }

    const [, dir, stepsStr] = match;
    const steps = parseInt(stepsStr, 10);

    for (let i = 0; i < steps; i++) {
      let nextRow = row;
      let nextCol = col;

      switch (dir) {
        case "UP": nextRow--; break;
        case "DOWN": nextRow++; break;
        case "LEFT": nextCol--; break;
        case "RIGHT": nextCol++; break;
      }

      if (
        nextRow >= 0 && nextRow < maze.length &&
        nextCol >= 0 && nextCol < maze[0].length &&
        maze[nextRow][nextCol] !== 1
      ) {
        row = nextRow;
        col = nextCol;
      } else {
        break;
      }
    }
  });

  setPlayerPosition({ row, col }); // only update once at the end
}
};



export default MazeCodeEditor;
