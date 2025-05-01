
import { Question } from "../contexts/QuizContext";

export const questions: Question[] = [
  {
    id: "q1",
    questionText: "What does JSX stand for in React?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "JavaScript Syntax",
      "Java Syntax Extension"
    ],
    correctIndex: 0,
    explanation: "JSX stands for JavaScript XML, which is a syntax extension for JavaScript recommended by React."
  },
  {
    id: "q2",
    questionText: "Which hook allows you to use state in functional components?",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useReducer"
    ],
    correctIndex: 1,
    explanation: "useState is the hook that lets you add state to functional components."
  },
  {
    id: "q3",
    questionText: "What method is used to update state in a React class component?",
    options: [
      "updateState()",
      "this.changeState()",
      "this.setState()",
      "this.modifyState()"
    ],
    correctIndex: 2,
    explanation: "this.setState() is the correct method to update state in class components."
  },
  {
    id: "q4",
    questionText: "What is a fragment in React?",
    options: [
      "A reusable component",
      "A way to return multiple elements without adding extra nodes",
      "A type of React element",
      "A browser API for React"
    ],
    correctIndex: 1,
    explanation: "Fragments let you group multiple elements without adding an extra node to the DOM."
  },
  {
    id: "q5",
    questionText: "In TypeScript, which type is used for arrays?",
    options: [
      "Array<type>",
      "type[]",
      "Both A and B",
      "Collection<type>"
    ],
    correctIndex: 2,
    explanation: "In TypeScript, you can use either Array<type> or type[] to define array types."
  },
  {
    id: "q6",
    questionText: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correctIndex: 2,
    explanation: "CSS stands for Cascading Style Sheets, used for styling web pages."
  },
  {
    id: "q7",
    questionText: "Which CSS property is used to change the text color?",
    options: [
      "color",
      "text-color",
      "font-color",
      "text-style"
    ],
    correctIndex: 0,
    explanation: "The 'color' property is used to change the color of text in CSS."
  },
  {
    id: "q8",
    questionText: "What is the correct HTML for creating a hyperlink?",
    options: [
      "<a href='http://example.com'>Example</a>",
      "<link href='http://example.com'>Example</link>",
      "<hyperlink url='http://example.com'>Example</hyperlink>",
      "<url>http://example.com</url>"
    ],
    correctIndex: 0,
    explanation: "The <a> tag with the href attribute is used to create hyperlinks in HTML."
  },
  {
    id: "q9",
    questionText: "Which statement creates a new array with the results of calling a function for every array element?",
    options: [
      "forEach()",
      "filter()",
      "map()",
      "reduce()"
    ],
    correctIndex: 2,
    explanation: "The map() method creates a new array with the results of calling a provided function on every element in the calling array."
  },
  {
    id: "q10",
    questionText: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Application Protocol Interface",
      "Automated Programming Interface",
      "Application Process Integration"
    ],
    correctIndex: 0,
    explanation: "API stands for Application Programming Interface, which allows different software applications to communicate with each other."
  }
];
