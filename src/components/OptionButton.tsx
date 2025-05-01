
import React from "react";
import { useQuiz } from "../contexts/QuizContext";
import { cn } from "@/lib/utils";

interface OptionButtonProps {
  option: string;
  index: number;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, index }) => {
  const { 
    selectAnswer, 
    selectedAnswer, 
    isAnswered, 
    questions, 
    currentQuestionIndex,
  } = useQuiz();

  const isSelected = selectedAnswer === index;
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = index === currentQuestion.correctIndex;

  const handleClick = () => {
    if (!isAnswered) {
      selectAnswer(index);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAnswered}
      className={cn(
        "relative w-full text-left p-4 mb-3 border-2 rounded-lg transition-all duration-200 transform hover:translate-y-[-2px]",
        "flex items-center justify-between",
        !isAnswered && "cursor-pointer hover:shadow-md hover:border-primary",
        isAnswered && "cursor-default",
        "text-black", // always keep text black
        // ✅ Default background white for all
        "bg-white",
        // ✅ Add green/red border ONLY to selected correct/wrong answers
        isAnswered && isCorrect && isSelected && "border-green-500 bg-green-100/10",
        isAnswered && !isCorrect && isSelected && "border-red-500 bg-red-100/10"
      )}                  
    >
      <div className="flex items-center">
        <div className={cn(
          "flex items-center justify-center w-8 h-8 mr-3 rounded-full text-foreground font-medium",
          !isAnswered && "bg-secondary",
          isAnswered && isCorrect && "bg-green-500/20 text-green-500",
          isAnswered && !isCorrect && isSelected && "bg-red-500/20 text-red-500",
          isAnswered && !isCorrect && !isSelected && "bg-secondary"
        )}>
          {String.fromCharCode(65 + index)}
        </div>
        <span className="font-medium">{option}</span>
      </div>
    </button>
  );
};

export default OptionButton;
