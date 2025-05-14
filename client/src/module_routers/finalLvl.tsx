import { useState , useEffect} from "react";
import MazeCodeEditor from "../components/MazeCodeEditor";
import { CompletionStatus } from "../types";
import { LevelInfo } from "../types";
import {
  getModuleListLocalStorage,
  populateModuleList,
} from "../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../styles/Maze.css";
import "../styles/Module.css";import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../types";


export function finalLvl() {
  const moduleIndex = 1;
  const levelIndex = 1;
  const {user}= useUser();
  const[modulesList, setModulesList]= useState<ModuleInfo[]>(populateModuleList());
  
  useEffect(() => {
    if (user?.id) {
      const modules = getModuleListLocalStorage(user.id);
      setModulesList(modules);
    }
  }, [user]);

  const levelInfo: LevelInfo = modulesList[1].levels[3];
  const [levelCompletionStatus, setLevelCompletionStatus] =
    useState<CompletionStatus>(levelInfo.completionStatus);
  const navigate = useNavigate();
  
  return (
    <div className="module-page">
      <div className="module-header">
        <button onClick={() => navigate("/Home")} className="back-button">
          Back to Home
        </button>
        <h1 className="module-title">Final Challenge: Maze Navigation</h1>
      </div>
      
      <div className="instruction-box">
        <h2>Welcome to the Final Level!</h2>
        <p>
          On the right, you'll see a maze with:
        </p>
        <ul>
          <li>The <span className="text-highlight">green square</span> is the starting point (S)</li>
          <li>The <span className="text-highlight">yellow square</span> is the end goal (E)</li>
          <li>The <span className="text-highlight">red circle</span> represents the player</li>
          <li>Black cells are walls, blue cells are water, and white cells are paths</li>
        </ul>
        
        <div className="task-highlight">
          <p>Your objective is to guide the player from the start to the end by writing a method that prints out a sequence of movement commands.</p>
        </div>
        
        <h3>Command Format:</h3>
        <p>Each command must appear on its own line and follow this specific format:</p>
        <pre className="code-inline">ACTION DIRECTION STEPS</pre>
        
        <ul>
          <li><strong>ACTION:</strong> Use <span className="code-inline">WALK</span> for regular path tiles or <span className="code-inline">SWIM</span> for water tiles</li>
          <li><strong>DIRECTION:</strong> Must be in all capital letters - <span className="code-inline">UP</span>, <span className="code-inline">DOWN</span>, <span className="code-inline">LEFT</span>, or <span className="code-inline">RIGHT</span></li>
          <li><strong>STEPS:</strong> The number of tiles to move in that direction</li>
        </ul>
        
        <div className="task-highlight">
          <p>Examples:</p>
          <p><span className="code-inline">WALK LEFT 4</span> - Move left by 4 tiles on regular ground</p>
          <p><span className="code-inline">SWIM UP 2</span> - Move upward through 2 tiles of water</p>
        </div>
        
        <p>Only valid, properly formatted moves will be executed. If a command is not in the correct format or attempts to move the player out of bounds or into a wall, it will be ignored.</p>
        
        <div className="task-highlight">
          <p><strong>Important:</strong> For your answer to be considered valid, you should create your own method called <span className="code-inline">move</span> that features multiple parameters and conditionals.</p>
        </div>
      </div>

      <div className="container">
        <div className="fixed-box">
          <MazeCodeEditor
            initialCode=""
            questionId="finalLvl"
            level={levelInfo}
            setLevelCompletionStatus={setLevelCompletionStatus}
          />
          
          {levelCompletionStatus === CompletionStatus.Complete && (
            <div className="nav-buttons">
              <button 
                onClick={() => navigate("/Home")} 
                className="next-button"
              >
                Complete Challenge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default finalLvl;