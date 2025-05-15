import { useEffect, useState } from "react";
import { LevelInfo } from "../../../types";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { FaLock, FaUnlock} from "react-icons/fa";
import { LevelProp } from "../../../types";
import { Locked } from "../../../types";
import { useUser } from "@clerk/clerk-react";
import "../../../styles/Level.css"


// returns the jsx component that is the level card, renders a lock based on the lock state of level info
export function Level(props: LevelProp){

    const navigate= useNavigate();

    const goToLesson =()=>{
        const path: string= props.level.routerPath;
        navigate(path);
    }
    
    return (
      <Card className="level-card">
        <span className="level-name">{props.level.levelName}</span>
        {props.level.locked === Locked.Locked ? (
          <FaLock className="lock-icon" size={30} />
        ) : (
          <FaUnlock className="lock-icon" size={30} />
        )}
        {props.level.locked === Locked.Unlocked && (
          <Button className="level-card-button" onClick={goToLesson}>
            Go to Lesson
          </Button>
        )}
      </Card>
    );

}

export default Level

