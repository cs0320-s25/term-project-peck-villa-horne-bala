import { FormatQ } from "../SurveyManager";
export const Q1: FormatQ = {
  id: 1,
  question:
    "What is the difference between == and .equals() when comparing strings?",
  answerChoices: [
    "== compares content, .equals() compares memory",
    "== compares memory, .equals() compares content",
    "They are the same",
    ".equals() works only for strings/characters",
  ],
  correctAnswerContent: "== compares memory, .equals() compares content",
  correctAnswerIndex: 1,
};

export const Q2: FormatQ = {
  id: 2,
  question: "What is the difference between ArrayList and LinkedList?",
  answerChoices: [
    "ArrayList is better for index-based access; LinkedList is better for insertions/deletions",
    "LinkedList stores primitives; ArrayList does not",
    "They are exactly the same",
    "ArrayList is the only one that adds to the end of the data structure at constant time",
  ],
  correctAnswerContent:
    "ArrayList is better for index-based access; LinkedList is better for insertions/deletions",
  correctAnswerIndex: 0,
};
export const Q3: FormatQ = {
  id: 3,
  question:
    "What does the final keyword do when applied to a variable or method?",
  answerChoices: [
    "Prevents further modification or overriding",
    "Allows overriding",
    "Makes the code faster",
    "Only used in interfaces",
  ],
  correctAnswerContent: "Prevents further modification or overriding",
  correctAnswerIndex: 0,
};

export const Q4: FormatQ = {
  id: 4,
  question: "Explain the difference between abstract class and interface.",
  answerChoices: [
    "They serve the same purpose",
    "Interfaces cannot have methods",
    "Abstract classes can have concrete methods; interfaces cannot",
    "Interfaces cannot be instantiated; abstract classes can",
  ],
  correctAnswerContent:
    "Abstract classes can have concrete methods; interfaces cannot",
  correctAnswerIndex: 2,
};

export const Q5: FormatQ = {
  id: 5,
  question: "What are generics in Java?",
  answerChoices: [
    "A way to specify types when defining classes or methods",
    "Allows for abstract classes to have flexibility",
    "A wrapper for other objects",
    "A specified object for returns",
  ],
  correctAnswerContent:
    "A way to specify types when defining classes or methods",
  correctAnswerIndex: 0,
};
