import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { CompletionStatus, UserQuestionHashMap } from "../types";
import { useUser } from "@clerk/clerk-react";
import { CodeEditorProps } from "../types";
import { storeModuleList } from "../home_screen/module_assembler/populate_modules/ModuleData";
import { Locked } from "../types";
import Maze from "../components/maze";
import { ModuleInfo } from "../types";
import { populateModuleList, getModuleListLocalStorage } from "../home_screen/module_assembler/populate_modules/ModuleData";


const MazeCodeEditor = (props: CodeEditorProps) => {
  const [modulesList, setModuleList] =
    useState<ModuleInfo[]>(populateModuleList());
  
  const { isLoaded, user } = useUser();
  const [code, setCode] = useState(
    `public class Main {\n public static void main(String[] args) {\n ${props.initialCode} \n}      \n}`
  );
  const [output, setOutput] = useState("");
  const [playerPosition, setPlayerPosition] = useState({ row: 12, col: 7 }); // Start at 'S'

  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModuleList(modules);
      console.log("module list in final project: ", modulesList);
    }
  }, [user]);

  type Cell = 0 | 1 | 2 | 3 | 'S' | 'E';
  
  const maze: Cell[][] = [
    [1,'E',1,1,1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1,1,0,1,1,1],
    [1,2,2,2,2,2,2,2,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,2,1,1,1,0,1,0,1,0,1],
    [1,1,2,1,1,2,0,0,0,1,0,1],
    [1,1,2,1,1,2,1,1,1,1,0,1],
    [1,1,0,0,1,2,1,1,1,1,1,1],
    [1,1,1,0,1,2,1,1,1,0,1,1],
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
    storeModuleList(user.id, modulesList);
    
  };

  return (
    <>
      <div className="maze-container">
        {/* Maze visualization above code editor */}
        <Maze playerPosition={playerPosition} grid={maze} />
        
        {/* Code editor */}
        <div className="editor-container">
          <Editor
            height="400px"
            language="java"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value ?? "")}
          />
        </div>
      </div>
      
      {/* Control buttons */}
      <div className="control-buttons">
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
      </div>
      
      {/* Output display */}
      <pre className="output-display">{output}</pre>
    </>
  );
  function parseCommand(input: string): string[] {
    return input.split(",").map(item => item.trim());
  }

  async function movePlayer(commands: string[]) {
    let row = 12;
    let col = 7;
    const filtered = commands.filter(item => item.trim() !== "");
    for (const command of filtered) {
      console.log("******COMMAND: " + command);
      
      const match = command.trim().match(/^(SWIM|WALK)\s+(UP|DOWN|LEFT|RIGHT)\s+(\d+)$/);
      if (!match) {
        setOutput(`❌ Error: Invalid command format: "${command}"`);
        return;
      }

      const [, action, dir, stepsStr] = match;
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

        // Check bounds
        if (
          nextRow < 0 || nextRow >= maze.length ||
          nextCol < 0 || nextCol >= maze[0].length
        ) {
          setOutput("❌ Error: Out of bounds");
          return;
        }

        const cellType = maze[nextRow][nextCol];

        // Check movement rules
        if (cellType === 1) {
          setOutput("❌ Error: Hit a wall");
          return;
        } else if (cellType === 2 && action !== "SWIM") {
          setOutput("❌ Error: You must SWIM over water");
          return;
        } else if ((cellType === 0 || cellType === 'S' || cellType === 'E') && action !== "WALK") {
          setOutput("❌ Error: You must WALK on land");
          return;
        }

        // Valid move
        row = nextRow;
        col = nextCol;
        setPlayerPosition({ row, col });
        await new Promise(res => setTimeout(res, 300));
      }
    }
  }
};

export default MazeCodeEditor;