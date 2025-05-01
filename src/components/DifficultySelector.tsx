
import React from "react";
import { useQuiz } from "../contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { DifficultyLevel } from "../contexts/QuizContext";
import { Book, GraduationCap, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DifficultySelectorProps {
  onStart: () => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onStart }) => {
  const { difficulty, setDifficulty, getDifficultyName } = useQuiz();

  const difficultyOptions: { level: DifficultyLevel; icon: React.ReactNode; description: string }[] = [
    { 
      level: "beginner", 
      icon: <Book size={24} />, 
      description: "Take your time, no pressure. Perfect for learning."
    },
    { 
      level: "topper", 
      icon: <GraduationCap size={24} />, 
      description: "15 seconds per question. Good balance of time and challenge."
    },
    { 
      level: "genius", 
      icon: <Award size={24} />, 
      description: "Only 8 seconds per question. For those who really know their stuff!"
    },
  ];

  return (
    <div className="bg-card rounded-xl shadow-lg p-8 max-w-3xl w-full animate-fade-in border border-border">
      <h2 className="text-3xl font-bold text-center mb-2">Choose Your Difficulty</h2>
      <p className="text-center text-muted-foreground mb-8">
        Select how challenging you want this quiz to be
      </p>
      
      <div className="space-y-4 mb-8">
        {difficultyOptions.map((option) => (
          <button
            key={option.level}
            onClick={() => setDifficulty(option.level)}
            className={cn(
              "flex items-center w-full p-4 rounded-lg border-2 transition-all hover:shadow-md",
              difficulty === option.level
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            )}
          >
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              {option.icon}
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">{getDifficultyName(option.level)}</div>
              <div className="text-muted-foreground text-sm">{option.description}</div>
            </div>
            {option.level !== "beginner" && (
              <div className="ml-auto flex items-center text-primary">
                <Clock size={18} className="mr-1" />
                {option.level === "topper" ? "15s" : "8s"}
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-lg py-6"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default DifficultySelector;
