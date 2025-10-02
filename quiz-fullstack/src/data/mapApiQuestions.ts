import { QuestionsResponse } from "@/api/fetch-questions";
import { OptionsTypeFull, QuestionsTypeFull } from "@/data/questions";

export const mapApiQuestions = (
  apiData: QuestionsResponse[]
): QuestionsTypeFull[] => {
  return apiData.map((q) => {
    const options = q.options.map((o: OptionsTypeFull) => {
      return {
        id: o.id,
        response: o.response,
        isCorrect: o.isCorrect,
        questionId: o.questionId,
      };
    });

    const correctIndex = q.options.findIndex((o: any) => o.isCorrect);

    return {
      id: q.id,
      question: q.question,
      options,
      correct: correctIndex,
    };
  });
};
