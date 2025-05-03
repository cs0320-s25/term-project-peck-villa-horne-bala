import { useState } from "react";
import { LevelInfo } from "../populate_modules/ModulePopulator";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { FaLock, FaUnlock} from "react-icons/fa";

import "../../../styles/Card.css"

interface LevelProp {
  level: LevelInfo;
}

export function Level(props: LevelProp){
    const navigate= useNavigate();

    const goToLesson =()=>{
        const path: string= props.level.routerPath;
        navigate(path)
    }

    return (
     
      <Card className="module-inner-card">
          <span>{props.level.levelName}</span>
          {props.level.locked ? (
            <FaLock size={30}  />
          ) : (
            <FaUnlock size={30} />
          )}
          {!props.level.locked && (
            <Button className="module-inner-card-button" onClick={goToLesson}>
              Go to Lesson
            </Button>
          )}
      </Card>
    );

}

export default Level

