import { useState, useEffect, FormEventHandler } from "react";
import MazeCodeEditor from "../components/MazeCodeEditor";
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
  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <h2> Final Level</h2>
      <p>
      Welcome to the Final Level!  
      On the right, you'll see a maze with the start being the green square, the end being the yellow square, and the circle being the player. 
      Your objective is to guide the player from the start to the end by writing a method that prints out a sequence of movement commands. 
      Each command must appear on its own line and follow a specific format: an action, a direction, and a number of steps followed by another comma.
      The action should be either WALK or SWIM, depending on the type of terrain. Regular path tiles can be crossed using the WALK command. 
      However, if the tile contains water, you must use the SWIM command to move through it. The direction must be in all capital letters and can be one of the following: UP, DOWN, LEFT, or RIGHT. 
      After the direction, include a space and then the number of tiles you wish to move in that direction. 
      For example, "WALK LEFT 4" means the player should move left by 4 tiles on regular ground, while "SWIM UP 2" would move the player upward through 2 tiles of water.
      Only valid, properly formatted moves will be executed. 
      If a command is not in the correct format or attempts to move the player out of bounds or into a wall, it will be ignored. Good luck!
      Note: For your answer to be considered valid you should create your own method called move that features multiple parameters and conditionals.

      </p>
      <div className="container">
        <div className="fixed-box">
        <MazeCodeEditor
        initialCode=""
        questionId="finalLvl"
        level={levelinfo}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
        </div>
      </div>
      {/* {levelCompletionStatus === CompletionStatus.Complete && (
        <button onClick={() => navigate("/MTwoLvlOne")}>Continue</button>
      )} */}
    </div>
  );
}


export default finalLvl;
