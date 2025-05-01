
import React, { useMemo } from "react";
import { useQuiz } from "../contexts/QuizContext";
import { Button } from "@/components/ui/button";
import Confetti from "./Confetti";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, Award, ThumbsUp, ThumbsDown, Book, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const ResultsScreen: React.FC = () => {
  const { score, questions, userAnswers, timePerQuestion, restartQuiz, difficulty, setDifficulty } = useQuiz();
  
  const percentageScore = Math.round((score / questions.length) * 100);
  const averageTime = timePerQuestion.reduce((a, b) => a + b, 0) / questions.length;

  const { message, icon } = useMemo(() => {
    if (percentageScore === 100) {
      return { 
        message: "SUUUU!!!! Perfect Score! You're a Quiz Champion!", 
        icon: <Award size={32} className="text-primary" /> 
      };
    } else if (percentageScore >= 80) {
      return { 
        message: "Great job! You're almost there!", 
        icon: <ThumbsUp size={32} className="text-primary" /> 
      };
    } else if (percentageScore >= 50) {
      return { 
        message: "You can do it!!!! Keep practicing!", 
        icon: <ThumbsUp size={32} className="text-primary" /> 
      };
    } else {
      return { 
        message: "Uff, better luck next time. Don't give up!", 
        icon: <ThumbsDown size={32} className="text-primary" /> 
      };
    }
  }, [percentageScore]);
  
  const incorrectQuestions = questions.filter((_, index) => {
    return userAnswers[index] !== questions[index].correctIndex;
  });

  const handleRestart = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    restartQuiz();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-lg p-8 animate-fade-in">
      {percentageScore >= 80 && <Confetti />}
      
      <h2 className="text-3xl font-bold text-center mb-2">Quiz Completed!</h2>
      <p className="text-center text-muted-foreground mb-4">
        You scored {score} out of {questions.length}
      </p>
      
      <div className="flex items-center justify-center mb-8 bg-primary/10 p-4 rounded-lg">
        {icon}
        <p className="text-xl font-bold ml-2">{message}</p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Score</span>
          <span className="font-medium">{percentageScore}%</span>
        </div>
        <Progress value={percentageScore} className="h-3" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border p-4 rounded-lg flex flex-col items-center">
          <CheckCircle className="text-correct mb-2" size={24} />
          <span className="text-2xl font-bold">{score}</span>
          <span className="text-muted-foreground">Correct</span>
        </div>
        
        <div className="bg-card border border-border p-4 rounded-lg flex flex-col items-center">
          <XCircle className="text-incorrect mb-2" size={24} />
          <span className="text-2xl font-bold">{questions.length - score}</span>
          <span className="text-muted-foreground">Incorrect</span>
        </div>
        
        <div className="bg-card border border-border p-4 rounded-lg flex flex-col items-center">
          <Clock className="text-primary mb-2" size={24} />
          <span className="text-2xl font-bold">{averageTime.toFixed(1)}</span>
          <span className="text-muted-foreground">Avg seconds</span>
        </div>
      </div>
      
      {incorrectQuestions.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Review Incorrect Answers</h3>
          <div className="space-y-4">
            {incorrectQuestions.map((question, idx) => (
              <div key={idx} className="bg-card border border-border p-4 rounded-lg">
                <p className="font-medium mb-2">{question.questionText}</p>
                <p className="text-incorrect mb-1">
                  Your answer: {question.options[userAnswers[questions.findIndex(q => q.id === question.id)] || 0]}
                </p>
                <p className="text-correct">
                  Correct answer: {question.options[question.correctIndex]}
                </p>
                {question.explanation && (
                  <p className="text-muted-foreground mt-2 text-sm">{question.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-xl font-bold mb-4">Try Again?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleRestart("beginner")}
            className={cn(
              "flex flex-col items-center justify-center py-6 px-4 rounded-lg border-2 transition-all hover:translate-y-[-2px]",
              difficulty === "beginner" 
                ? "bg-card border-primary" 
                : "bg-card/50 border-border hover:border-primary"
            )}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-2">
              <Book size={24} className="text-primary" />
            </div>
            <span className="font-medium">Beginner</span>
            <span className="text-xs text-muted-foreground mt-1">No time limit</span>
          </button>

          <button
            onClick={() => handleRestart("topper")}
            className={cn(
              "flex flex-col items-center justify-center py-6 px-4 rounded-lg border-2 transition-all hover:translate-y-[-2px]",
              difficulty === "topper" 
                ? "bg-card border-primary" 
                : "bg-card/50 border-border hover:border-primary"
            )}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-2">
              <GraduationCap size={24} className="text-primary" />
            </div>
            <span className="font-medium">Topper</span>
            <span className="text-xs text-muted-foreground mt-1">15 seconds/question</span>
          </button>

          <button
            onClick={() => handleRestart("genius")}
            className={cn(
              "flex flex-col items-center justify-center py-6 px-4 rounded-lg border-2 transition-all hover:translate-y-[-2px]",
              difficulty === "genius" 
                ? "bg-card border-primary" 
                : "bg-card/50 border-border hover:border-primary"
            )}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-2">
              <Award size={24} className="text-primary" />
            </div>
            <span className="font-medium">Genius</span>
            <span className="text-xs text-muted-foreground mt-1">8 seconds/question</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          className="bg-card border border-border text-foreground hover:bg-card/80"
          onClick={() => {
            try {
              navigator.share({
                title: 'Quiz Results',
                text: `I scored ${score} out of ${questions.length} (${percentageScore}%) on this quiz!`,
              });
            } catch (err) {
              alert('Web Share API not supported.');
            }
          }}
        >
          Share Results
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
