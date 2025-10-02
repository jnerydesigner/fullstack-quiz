import { mapApiQuestions } from "@/data/mapApiQuestions";

const URL_BASE =
  process.env.NEXT_PUBLIC_BASE_API === undefined
    ? "http://localhost:6688"
    : process.env.NEXT_PUBLIC_BASE_API;

export const fetchAllQuestions = async () => {
  const response = await fetch(`${URL_BASE}/questions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar perguntas");
  }

  const apiResponse: QuestionsResponse[] = await response.json();

  return mapApiQuestions(apiResponse);
};

export interface QuestionsResponse {
  id: number;
  question: string;
  options: Option[];
}

export interface Option {
  id: number;
  response: string;
  isCorrect: boolean;
  questionId: number;
}
