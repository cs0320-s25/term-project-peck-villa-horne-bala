import { useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus } from "../../types";
import { useNavigate } from "react-router-dom";
import { modulesList } from "../../home_screen/module_assembler/populate_modules/ModuleData";
import "../../styles/Module.css";

export function MOneLvlOne() {
  const levelInfo = modulesList[0].levels[0];
  const [levelCompletionStatus, setLevelCompletionStatus] = useState<CompletionStatus>(levelInfo.completionStatus);
  const navigate = useNavigate();
  
  return (
    <div className="module-page">
      <header className="module-header">
        <button className="back-button" onClick={() => navigate("/Home")}>Back</button>
        <h1 className="module-title">Module 1: Variables & Primitives - Level 1: What is a variable?</h1>
      </header>
      
      <div className="content-container">
        <div className="instruction-box">
          <p>
            In Java, variables are containers that store data in memory.
            Understanding variables plays a very important role as it defines how
            data is stored, accessed, and manipulated. 
          </p>
          <p>
            The next module we will learn about types but for this demonstration we will start with the 
            <span className="code-inline">int</span> type which tells Java that you are trying to store 
            a non-decimal number.
          </p>
          <p>
            Example: <span className="code-inline">int age = 19;</span>, where:
          </p>
          <ul>
            <li><span className="text-highlight">int</span> is the type</li>
            <li><span className="text-highlight">age</span> is the name of the variable</li>
            <li><span className="text-highlight">19</span> is the value that the variable stores</li>
          </ul>
          <p>
            Remember that we use the equal sign to assign a value to a variable and almost every
            statement should end with a semicolon. Additionally, you can print any variable using 
            the command <span className="code-inline">System.out.println(variable)</span>.
          </p>
          
          <div className="task-highlight">
            <strong>Task:</strong> Try on your own creating an int type variable called num that stores
            the value 1000 and print it!
          </div>
        </div>
        
        <div className="editor-box">
          <div className="code-editor-container">
            <CodeEditor
              initialCode=""
              questionId="module01_level01"
              level={levelInfo}
              setLevelCompletionStatus={setLevelCompletionStatus}
            />
          </div>
          <div className="editor-actions">
            <button className="clear-button">Clear Code</button>
            <button className="run-button">Run Code</button>
          </div>
        </div>
      </div>
      
      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button className="next-button" onClick={() => navigate("/MOneLvlTwo")}>Next Level</button>
        </div>
      )}
    </div>
  );
}

export default MOneLvlOne;