import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import { CompletionStatus, Locked } from "../../types";
import { LevelInfo } from "../../types";
import {
  getModuleListLocalStorage,
  populateModuleList,
} from "../../home_screen/module_assembler/populate_modules/ModuleData";
import { useNavigate } from "react-router-dom";
import "../../styles/Module.css";
import { useUser } from "@clerk/clerk-react";
import { ModuleInfo } from "../../types";

export function MFourLvlTwo() {
    const { user } = useUser();
    const [modulesList, setModuleList] = useState<ModuleInfo[]>([]);
    const [levelInfo, setLevelInfo] = useState<LevelInfo>(
      populateModuleList()[3].levels[1]
    );

    const [levelCompletionStatus, setLevelCompletionStatus] =
      useState<CompletionStatus>(CompletionStatus.Incomplete);

    useEffect(() => {
      if (user?.id) {
        const modules = getModuleListLocalStorage(user.id);
        setModuleList(modules);
        console.log("module list in module 4 lvl 2: ", modules);
      }
    }, [user]);

    useEffect(() => {
      if (modulesList.length > 0) {
        const levelinfo: LevelInfo = modulesList[3].levels[1];
        if (
          modulesList[2].levels[2].completionStatus ===
          CompletionStatus.Complete
        ) {
          levelinfo.locked = Locked.Unlocked;
        } else {
          levelinfo.locked = Locked.Locked;
        }
        setLevelInfo(levelinfo);
        setLevelCompletionStatus(levelinfo.completionStatus);
      }
    }, [modulesList]);
    
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/Home")}>Back</button>
      <button onClick={() => navigate("/MFourLvlOne")}>Previous Level</button>
      <h2>Module 4: Methods - Level 2: Method Syntax</h2>
      <p>
        Sometimes you want your method to do something based on input: that’s
        where parameters come in! A parameter is like a variable you pass into
        the method. When you create a method you can define what type of
        variable must be passed in.
        <code>
          public static void greetUser(){" "}
          {` System.out.println("Hello, " + name + "!");
`}
        </code>
        Here the “String name” portion in the parenthesis is telling Java that
        to call this method you must put in a string and that string will be
        used in the method to print out a name. When you call
        greetUser("Alex");, it prints: Hello, Alex!
        <br></br>
        <strong>
          Task: Write a method printAge(int age) that prints: "You are X years
          old." Replace X with the age value passed in. Try calling it with ages
          21, 42, and 78!
        </strong>
      </p>
      <CodeEditor
        initialCode=""
        questionId="module04_level02"
        level={levelInfo}
        modules={modulesList}
        setLevelCompletionStatus={setLevelCompletionStatus}
      />
      {levelCompletionStatus === CompletionStatus.Complete && (
        <div className="nav-buttons">
          <button
            className="previous-button"
            onClick={() => navigate("/MFourLvlTwo")}
          >
            Previous Level
          </button>
          <button className="next-button" onClick={() => navigate("/Home")}>
            Congratulations! Return to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default MFourLvlTwo;
