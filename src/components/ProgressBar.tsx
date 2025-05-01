
import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const ProgressBar: React.FC = () => {
  const { currentQuestionIndex, questions, isQuizCompleted } = useQuiz();
  
  const progressPercentage = isQuizCompleted ? 100 : ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full bg-secondary rounded-full h-2 mb-6">
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
