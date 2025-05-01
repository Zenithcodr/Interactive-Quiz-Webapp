
import React, { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";
import OptionButton from "./OptionButton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

const QuestionCard: React.FC = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    startTimer,
    isAnswered,
    goToNextQuestion,
    timeRemaining,
    difficulty
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];
  const showTimer = difficulty !== "beginner";

  useEffect(() => {
    startTimer();
  }, [currentQuestionIndex, startTimer]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 w-full max-w-3xl mx-auto animate-fade-in">
      {showTimer && timeRemaining !== null && (
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-1" />
              <span>{timeRemaining} seconds</span>
            </div>
          </div>
          <Progress 
            value={timeRemaining / (difficulty === "topper" ? 15 : 8) * 100} 
            className="h-2" 
          />
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{currentQuestion.questionText}</h2>
      </div>
      
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <OptionButton 
            key={index} 
            option={option} 
            index={index} 
          />
        ))}
      </div>

      {isAnswered && currentQuestion.explanation && (
        <div className="mt-6 p-4 bg-secondary rounded-lg text-gray-700 animate-fade-in">
          <p><span className="font-bold">Explanation:</span> {currentQuestion.explanation}</p>
        </div>
      )}
      
      {isAnswered && (
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={goToNextQuestion} 
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            type="button"
          >
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
