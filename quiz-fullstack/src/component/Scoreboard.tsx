"use client";
import { useQuiz } from "@/context/QuizContext";

export default function Scoreboard() {
  const { results } = useQuiz();

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">🏆 Placar do Quiz</h2>
      {results.length === 0 ? (
        <p className="text-gray-500">Ainda não há resultados</p>
      ) : (
        <ul className="space-y-2">
          {results.map((r, i) => (
            <li
              key={i}
              className="flex justify-between bg-purple-50 p-3 rounded-lg"
            >
              <span className="font-semibold">{r.name}</span>
              <span>{r.percentage.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
