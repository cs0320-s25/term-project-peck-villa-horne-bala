import { useState } from "react";
import { ModuleInfo } from "../../../types";
import Level from "./Level";
import { ModuleProps } from "../../../types";

import Card from "react-bootstrap/Card";
import "../../../styles/HomescreenModule.css"



export function Module(props: ModuleProps) {
  return (
    <Card className="module-card" >
      <Card.Title className="module-title">{props.module.name}</Card.Title>
      <Card.Body>
        {props.module.levels.map((lvl, index) => (
          <Level key={index} level={lvl}></Level>
        ))}
      </Card.Body>
    </Card>
  );
}
export default Module;
