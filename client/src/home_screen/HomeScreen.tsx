import { useState, useEffect, FormEventHandler } from "react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


export function Homescreen() {
  const navigate= useNavigate();
  
  const takeSurvey =()=>{
    navigate("/survey");
  }
  return (
    <div className="home-screen">
      <div className="home-screen-head-bar">
        <h1> Home </h1>
        <UserButton></UserButton>
        <button onClick={takeSurvey}> take survey!</button>
      </div>
      <div className="home-screen-module-container"></div>
    </div>
  );
}

export default Homescreen;
