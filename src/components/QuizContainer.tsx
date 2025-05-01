
import React, { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import QuizProgress from "./QuizProgress";
import ResultsScreen from "./ResultsScreen";
import DifficultySelector from "./DifficultySelector";
import FeedbackOverlay from "./FeedbackOverlay";

const QuizContainer: React.FC = () => {
  const { isQuizCompleted } = useQuiz();
  const [quizStarted, setQuizStarted] = useState(false);

  if (!quizStarted) {
    return (
      <div className="w-full" style={{ marginLeft: '50px' }}>
        <DifficultySelector onStart={() => setQuizStarted(true)} />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <ProgressBar />
      <FeedbackOverlay />
      
      {!isQuizCompleted ? (
        <>
          <QuizProgress />
          <QuestionCard />
        </>
      ) : (
        <ResultsScreen />
      )}
    </div>
  );
};

export default QuizContainer;
