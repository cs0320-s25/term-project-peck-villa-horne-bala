import { Dispatch, FormEventHandler, SetStateAction } from "react";
import { SurveyStatus } from "./survey/SurveyManager";

export interface CodeEditorProps {
  initialCode: string;
  questionId: string;
  level: LevelInfo;
  setLevelCompletionStatus: (status: CompletionStatus) => void;
}

export enum Locked {
  Locked = "Locked",
  Unlocked = "Unlocked",
}

export enum CompletionStatus {
  Complete = "Complete",
  Incomplete = "Incomplete",
  Loading="Loading"
}

export interface LevelProps {
  CompletionStatus: CompletionStatus;
  setCompletionStatus: (status: CompletionStatus) => void;
}

export type UserQuestionHashMap = {
  [questionId: string]: {
    status: CompletionStatus;
  };
};

export enum Status {
  Survey = "SURVEY",
  Homescreen = "HOMESCREEN",
  InBetween = "INBETWEEN",
}

export interface LevelInfo {
  levelName: string;
  routerPath: string;
  locked: Locked | null;
  completionStatus: CompletionStatus;
  jsonKey: string;
}

export interface ModuleInfo {
  name: string;
  levels: LevelInfo[];
}

export interface ModuleProps {
  module: ModuleInfo;
}

export interface LevelProp {
  level: LevelInfo;
}

export interface FormatQ {
  id: number;
  question: string;
  answerChoices: string[];
  correctAnswerContent: string;
  correctAnswerIndex: number;
}

export interface QuestionProps {
  currQ: FormatQ;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  selectedAnswer: number;
}

export interface SurveyManagerProps {
  setSurveyMode: Dispatch<SetStateAction<SurveyStatus>>;
}

const moduleNameArray: string[] = [
  "module01_level01",
  "module01_level02",
  "module01_level03",
  "module01_level04",
  "module02_level01",
  "module02_level02",
  "module02_level03",
  "module02_level04",
  "module03_level01",
  "module03_level02",
  "module03_level03",
  "module04_level01",
  "module04_level02",
  "module04_level03",
];

