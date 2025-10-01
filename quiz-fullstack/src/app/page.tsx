"use client";

import QuizApp from "@/component/QuizApp";
import Scoreboard from "@/component/Scoreboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col items-center justify-center gap-8 p-6">
      <QuizApp />
    </div>
  );
}
