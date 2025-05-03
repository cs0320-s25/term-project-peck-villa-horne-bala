import { useState } from "react";
import { ModuleInfo } from "../populate_modules/ModulePopulator";
import Level from "./Level";

import Card from "react-bootstrap/Card";
import "../../../styles/Card.css";

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
