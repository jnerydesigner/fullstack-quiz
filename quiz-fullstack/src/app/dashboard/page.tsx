"use client";
import { useQuiz } from "@/context/QuizContext";

export default function DashboardPage() {
  const { results } = useQuiz();

  // Ordena do maior para o menor
  const sortedResults = [...results].sort(
    (a, b) => b.percentage - a.percentage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          🏆 Placar do Quiz
        </h1>

        {sortedResults.length === 0 ? (
          <p className="text-center text-gray-500">Ainda não há resultados.</p>
        ) : (
          <ul className="space-y-3">
            {sortedResults.map((r, i) => (
              <li
                key={i}
                className={`flex justify-between items-center p-4 rounded-lg shadow 
                  ${
                    i === 0
                      ? "bg-yellow-100 border-2 border-yellow-400"
                      : "bg-gray-50"
                  }
                `}
              >
                <span className="font-semibold text-gray-800">
                  {i === 0 && "🥇 "}
                  {i === 1 && "🥈 "}
                  {i === 2 && "🥉 "}
                  {r.name}
                </span>
                <span className="font-bold text-purple-600">
                  {r.percentage.toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
