
import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const QuizProgress: React.FC = () => {
  const { currentQuestionIndex, questions } = useQuiz();

  return (
    <div className="flex justify-between items-center mb-6 text-gray-600">
      <div className="font-medium">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  );
};

export default QuizProgress;
