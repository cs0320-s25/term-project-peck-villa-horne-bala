import { FormatQ } from "../routers/SurveyManager";
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

// edit these
export const Q6: FormatQ = {
  id: 6,
  question: "Describe a situation where you would use an inner class.",
  answerChoices: [
    "When you need multiple main methods",
    "When the class is only useful inside its outer class",
    "When you want global access",
    "When you want the class to run first",
  ],
  correctAnswerContent: "When the class is only useful inside its outer class",
  correctAnswerIndex: 1,
};

export const Q7: FormatQ = {
  id: 7,
  question: "Which of the following statements about inheritance is false",
  answerChoices: [
    "Java supports single inheritance",
    "Java allows multiple class inheritance using extends",
    "Interfaces can be used to achieve multiple inheritance",
    "The super key can be used to invoke the parent class constructor",
  ],
  correctAnswerContent: "Java allows multiple class inheritance using extends",
  correctAnswerIndex: 1,
};

export const Q8: FormatQ = {
  id: 8,
  question: "What happens if you access an invalid index of an array in Java?",
  answerChoices: [
    "ArrayIndexOutOfBoundsException",
    "NullPointerException",
    "SegmentationFault",
    "No error",
  ],
  correctAnswerContent: "ArrayIndexOutOfBoundsException",
  correctAnswerIndex: 0,
};

export const Q9: FormatQ = {
  id: 9,
  question: "Can a Java constructor be private?",
  answerChoices: [
    "No, it is good design for them to be public",
    "Yes, and it can be accessed from anywhere",
    "No, Java ",
    "Yes, but the class cannot be instantiated outside the class",
  ],
  correctAnswerContent:
    "Yes, but the class cannot be instantiated outside the class",
  correctAnswerIndex: 3,
};

export const Q10: FormatQ = {
  id: 10,
  question: "Which of the following is true about custom exceptions?",
  answerChoices: [
    "Custom exceptions cannot estend the Exception class",
    "Custom exceptions are always checked exceptions",
    "Custom exceptions can extend Exception or RuntimeException",
    "Custom exceptions can only extend the Exception class",
  ],
  correctAnswerContent:
    "Custom exceptions can extend Exception or RuntimeException",
  correctAnswerIndex: 2,
};

export const Q11: FormatQ = {
  id: 11,
  question: "Which keyword is used to create an object in Java?",
  answerChoices: ["class", "this", "new", "create"],
  correctAnswerContent: "new",
  correctAnswerIndex: 2,
};

export const Q12: FormatQ = {
  id: 12,
  question: "What is the difference between break and return?",
  answerChoices: [
    "There is none, return and break both return out of a for loop",
    "There is none, return and break both return out of a while loop",
    "Break is used as a breaking point for debugging and return is not",
    "Break is used to exit a loop and return is used as the return value of a function",
  ],
  correctAnswerContent:
    "Break is used to exit a loop and return is used as the return value of a function",
  correctAnswerIndex: 3,
};
export const Q13: FormatQ = {
  id: 13,
  question: "Which list type can access a value at constant time?",
  answerChoices: ["Hashset", "LinkedList", "Array", "Hashmap"],
  correctAnswerContent: "Array",
  correctAnswerIndex: 2,
};

export const Q14: FormatQ = {
  id: 14,
  question: "What is the difference between a for each and for loop?",
  answerChoices: [
    "None, they are the same",
    "For each requires knowing the type of the iteration",
    "For each gives access to both the index and the object at that index",
    "For loop only has access to the object at the indexes",
  ],
  correctAnswerContent: "For each requires knowing the type of the iteration",
  correctAnswerIndex: 1,
};

export const Q15: FormatQ = {
  id: 15,
  question:
    "What algorithm provides the shortest path from node A to bode B assuming they are connected via multiple paths?",
  answerChoices: ["DFS", "Dijkstras", "BFS", "CFS"],
  correctAnswerContent: "BFS",
  correctAnswerIndex: 2,
};

export const Q16: FormatQ = {
  id: 16,
  question: "What is the difference between interfaces and abstract classes?",
  answerChoices: [
    "None, they are the same",
    "Interfaces cannot be instantiated",
    "Array",
    "Hashmap",
  ],
  correctAnswerContent: "Array",
  correctAnswerIndex: 2,
};
