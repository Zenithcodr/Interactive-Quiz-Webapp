import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from "react";

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export type DifficultyLevel = "beginner" | "topper" | "genius";

interface DifficultyConfig {
  autoAdvance: boolean;
  timeLimit: number; // seconds
  name: string;
}

const DIFFICULTY_SETTINGS: Record<DifficultyLevel, DifficultyConfig> = {
  beginner: {
    autoAdvance: false,
    timeLimit: 0, // unlimited
    name: "Beginner"
  },
  topper: {
    autoAdvance: true,
    timeLimit: 15, // 15 seconds per question
    name: "Topper"
  },
  genius: {
    autoAdvance: true,
    timeLimit: 8, // 8 seconds per question
    name: "Genius"
  }
};

interface QuizContextType {
  currentQuestionIndex: number;
  score: number;
  userAnswers: (number | null)[];
  selectedAnswer: number | null;
  questions: Question[];
  isAnswered: boolean;
  isQuizCompleted: boolean;
  timePerQuestion: number[];
  startTimer: () => void;
  selectAnswer: (answerIndex: number) => void;
  goToNextQuestion: () => void;
  restartQuiz: () => void;
  isCorrectAnswer: boolean | null;
  showFeedback: boolean;
  timeRemaining: number | null;
  difficulty: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;
  getDifficultyName: (level: DifficultyLevel) => string;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
  questions: Question[];
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>(Array(questions.length).fill(0));
  const [timerStart, setTimerStart] = useState<number | null>(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set up timer based on difficulty
  useEffect(() => {
    if (isAnswered || isQuizCompleted) {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }
      return;
    }

    const config = DIFFICULTY_SETTINGS[difficulty];
    
    if (config.timeLimit > 0) {
      setTimeRemaining(config.timeLimit);
      
      questionTimerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            // Time's up, auto-select an answer (wrong)
            if (!isAnswered) {
              selectAnswer(-1); // -1 indicates timeout
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeRemaining(null);
    }

    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }
    };
  }, [currentQuestionIndex, difficulty, isAnswered, isQuizCompleted]);

  const startTimer = () => {
    setTimerStart(Date.now());
  };

  const stopTimer = () => {
    if (timerStart) {
      const timeTaken = (Date.now() - timerStart) / 1000; // in seconds
      const newTimePerQuestion = [...timePerQuestion];
      newTimePerQuestion[currentQuestionIndex] = timeTaken;
      setTimePerQuestion(newTimePerQuestion);
      setTimerStart(null);
    }
  };

  const selectAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    stopTimer();
    
    // Clear question timer if it exists
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
    }

    // Check if answer is correct
    const isCorrect = answerIndex === questions[currentQuestionIndex].correctIndex;
    setIsCorrectAnswer(isCorrect);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
    
    // If autoAdvance is enabled or it's the last question
    if (DIFFICULTY_SETTINGS[difficulty].autoAdvance || answerIndex === -1) {
      // Auto-advance after 5 seconds
      timerRef.current = setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestionIndex === questions.length - 1) {
          setIsQuizCompleted(true);
        } else {
          goToNextQuestion();
        }
      }, 5000);
    }
  };

  const goToNextQuestion = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setShowFeedback(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrectAnswer(null);
      startTimer();
    } else {
      setIsQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers(Array(questions.length).fill(null));
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimePerQuestion(Array(questions.length).fill(0));
    setIsQuizCompleted(false);
    setIsCorrectAnswer(null);
    setShowFeedback(false);
    startTimer();
  };

  const getDifficultyName = (level: DifficultyLevel): string => {
    return DIFFICULTY_SETTINGS[level].name;
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        score,
        userAnswers,
        selectedAnswer,
        questions,
        isAnswered,
        isQuizCompleted,
        timePerQuestion,
        startTimer,
        selectAnswer,
        goToNextQuestion,
        restartQuiz,
        isCorrectAnswer,
        showFeedback,
        timeRemaining,
        difficulty,
        setDifficulty,
        getDifficultyName,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
