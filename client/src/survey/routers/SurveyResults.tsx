import { useState, useEffect, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

export function SurveyResults(){
    const navigate = useNavigate();

    const goHome =()=>{
        navigate("/");
    }
    return (
      <div>
        {" "}
        survey results!!
        <button onClick={goHome}>home</button>
      </div>
    );
}

export default SurveyResults;