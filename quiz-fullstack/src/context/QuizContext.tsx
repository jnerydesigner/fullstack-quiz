"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Result = {
  name: string;
  score: number;
  percentage: number;
};

type QuizContextType = {
  results: Result[];
  addResult: (result: Result) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Result[]>([]);
  const channel = new BroadcastChannel("quiz-channel");

  useEffect(() => {
    channel.onmessage = (e) => {
      if (e.data.type === "update") {
        setResults(e.data.payload);
      }
    };
    return () => channel.close();
  }, []);

  const addResult = (result: Result) => {
    setResults((prev) => {
      const updated = [...prev, result];
      // avisa outras abas
      channel.postMessage({ type: "update", payload: updated });
      return updated;
    });
  };

  return (
    <QuizContext.Provider value={{ results, addResult }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context)
    throw new Error("useQuiz deve ser usado dentro de QuizProvider");
  return context;
}
