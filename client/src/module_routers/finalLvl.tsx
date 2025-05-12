import { useState, useEffect, FormEventHandler } from "react";
import CodeEditor from "../components/CodeEditor";
import Maze from "../components/maze";
import { CompletionStatus } from "../types";
import { LevelInfo } from "../types";
import { modulesList } from "../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../styles/Maze.css"


export function finalLvl() {
  const moduleIndex = 1;
  const levelIndex = 1;

  const levelinfo: LevelInfo = modulesList[1].levels[3];
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelinfo.completionStatus);
  const navigate = useNavigate();

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
  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <h2> Final Level</h2>
      <p>
        Welcome to the Final Level! This level should challenge everything you have learned thus far. 
        To the right you can see a maze and the goal of this level to solve it. To solve the maze you must create a method that can print out
        directions and the amount of tiles you want to cross.
         Each command MUST be in the format direction in all caps with a space and then a number
        for the amount, like "LEFT 4" will tell the computer that you want your person to move left 4 spaces. 
        The directions are UP, DOWN, LEFT, RIGHT. Only valid moves with be registered so if it a command is not in the correct format or moves 
        in an out of bound region then it is consdered incorrect. 

      </p>
      <div className="container">
        <div className="fixed-box">
        <CodeEditor
        initialCode=""
        questionId="finalLvl"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
        </div>
        <Maze grid={maze} />
      </div>
      {/* {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MTwoLvlOne")}>Continue</button>
      )} */}
    </div>
  );
}


export default finalLvl;
