import { useState} from "react";
import {ModuleInfo} from "./ModulePopulator";
import Level from "./Level";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import "../../styles/Card.css";

interface ModuleProps {
  module: ModuleInfo;
}

export function Module(props: ModuleProps) {
  return (
    <Card className="module-card">
      <Card.Title className="module-title">{props.module.name}</Card.Title>
      <Card.Body>
        {props.module.levels.map((lvl, index) => (
          <Level level={lvl}></Level>
        ))}
      </Card.Body>
    </Card>
  );
}
export default Module;
