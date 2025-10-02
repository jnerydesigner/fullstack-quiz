"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { questions as questionsMock } from "@/data/questions";
import { useQuiz } from "@/context/QuizContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllQuestions } from "@/api/fetch-questions";
import { QuestionsTypeFull } from "@/data/questions";

export default function QuizApp() {
  const { addResult } = useQuiz();

  const query = useQuery<QuestionsTypeFull[]>({
    queryKey: ["all-questions"],
    queryFn: fetchAllQuestions,
    staleTime: 1000 * 60,
  });

  // fallback: se a API não respondeu, usa mock
  const questions = query.data || questionsMock;

  // estados do quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [username, setUsername] = useState("");

  // responder questão
  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore((s) => s + 1);
    }
  };

  // avançar questão
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  // resetar quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setUsername("");
  };

  // tela de loading
  if (query.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg font-semibold">Carregando perguntas...</h2>
      </div>
    );
  }

  // tela de resultado
  if (showResult) {
    const percentage = (score / questions.length) * 100;

    const handleSaveResult = () => {
      if (!username.trim()) return;
      addResult({ name: username, score, percentage });
      resetQuiz();
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4">
              {percentage.toFixed(0)}%
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Quiz Finalizado!
            </h2>
            <p className="text-gray-600 text-lg">
              Você acertou{" "}
              <span className="font-bold text-purple-600">{score}</span> de{" "}
              <span className="font-bold">{questions.length}</span> perguntas
            </p>
          </div>

          <div className="mb-6">
            {percentage >= 80 && (
              <p className="text-green-600 font-semibold text-lg">
                🎉 Excelente trabalho!
              </p>
            )}
            {percentage >= 50 && percentage < 80 && (
              <p className="text-blue-600 font-semibold text-lg">
                👍 Bom trabalho!
              </p>
            )}
            {percentage < 50 && (
              <p className="text-orange-600 font-semibold text-lg">
                💪 Continue praticando!
              </p>
            )}
          </div>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full mb-4 text-center text-amber-800"
          />

          <button
            onClick={handleSaveResult}
            disabled={!username.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 mx-auto disabled:opacity-50"
          >
            <RotateCcw size={20} />
            Salvar Resultado e Jogar Novamente
          </button>
        </div>
      </div>
    );
  }

  // questão atual
  const question = questions[currentQuestion];

  console.log("Question", question);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              Pergunta {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              Pontos: {score}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrect = answered && isCorrect;
            const showIncorrect = answered && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between
                  ${
                    !answered &&
                    "hover:border-purple-400 hover:bg-purple-50 cursor-pointer"
                  }
                  ${!answered && "border-gray-200 bg-white"}
                  ${showCorrect && "border-green-500 bg-green-50"}
                  ${showIncorrect && "border-red-500 bg-red-50"}
                  ${answered && !isSelected && !isCorrect && "opacity-50"}
                  ${answered && "cursor-not-allowed"}
                `}
              >
                <span className="font-medium text-gray-800">
                  {option.response}
                </span>
                {showCorrect && (
                  <CheckCircle className="text-green-500" size={24} />
                )}
                {showIncorrect && (
                  <XCircle className="text-red-500" size={24} />
                )}
              </button>
            );
          })}
        </div>

        {answered && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            {currentQuestion < questions.length - 1
              ? "Próxima Pergunta"
              : "Ver Resultado"}
          </button>
        )}
      </div>
    </div>
  );
}
