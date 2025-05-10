import { useState } from "react";
import { LevelInfo } from "../../../types";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { FaLock, FaUnlock} from "react-icons/fa";
import { LevelProp } from "../../../types";
import { useUser } from "@clerk/clerk-react";

import "../../../styles/Card.css"



export function Level(props: LevelProp){

    const navigate= useNavigate();

    const goToLesson =()=>{
        const path: string= props.level.routerPath;
        navigate(path);
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

