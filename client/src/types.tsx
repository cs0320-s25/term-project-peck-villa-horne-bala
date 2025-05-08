export enum CompletionStatus {
    Complete = "Complete",
    Incomplete = "Incomplete"
}

export interface LevelProps  { 
  CompletionStatus: CompletionStatus;
  setCompletionStatus: (status: CompletionStatus) => void;
}

export type UserQuestionHashMap = {
        [questionId: string]: {
            status: CompletionStatus;
            answer?: string;
        };
    };

export enum Status {
  Survey = "SURVEY",
  Homescreen = "HOMESCREEN",
  InBetween = "INBETWEEN",
}

