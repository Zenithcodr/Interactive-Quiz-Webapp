
import React from "react";
import { questions } from "../data/questions";
import { QuizProvider } from "../contexts/QuizContext";
import QuizContainer from "../components/QuizContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-primary/10 rounded-full mix-blend-lighten filter blur-3xl opacity-70 animate-blob animation-delay-2000 top-0 -left-4"></div>
        <div className="absolute w-96 h-96 bg-primary/10 rounded-full mix-blend-lighten filter blur-3xl opacity-70 animate-blob top-0 -right-4"></div>
        <div className="absolute w-96 h-96 bg-primary/10 rounded-full mix-blend-lighten filter blur-3xl opacity-70 animate-blob animation-delay-4000 bottom-0 left-20"></div>
      </div>
      
      {/* Content */}
      <div className="text-center mb-8 relative z-10 w-full max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Wizard Arcade</h1>
        <p className="text-muted-foreground">Test your knowledge with fun interactive quizzes</p>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <QuizProvider questions={questions}>
          <QuizContainer />
        </QuizProvider>
      </div>
    </div>
  );
};

export default Index;
