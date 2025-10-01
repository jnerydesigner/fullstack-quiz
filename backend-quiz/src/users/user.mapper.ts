import { Prisma } from '@prisma/client';

// 1) Defina os args de consulta com Prisma.validator (garante tipos corretos)
export const userWithAnswersArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    answers: {
      orderBy: { createdAt: 'desc' },
      include: {
        question: {
          select: {
            id: true,
            question: true,
            options: {
              select: { id: true, response: true, isCorrect: true }, // << tudo boolean
            },
          },
        },
        option: { select: { id: true } },
      },
    },
  },
});

// 2) Derive o tipo do payload a partir dos args
export type UserWithAnswers = Prisma.UserGetPayload<typeof userWithAnswersArgs>;

// 3) Tipos de resposta para a API
export type UserResponse = {
  id: number;
  name: string;
  qtdCorrectAnswers?: number;
  answers: AnswersResponse[];
};

export type AnswersResponse = {
  id: number; // id da UserAnswer
  question: string;
  questionId: number;
  options: OptionsResponse[];
  selectedOptionId: number; // você usa isso no mapper, então inclua no type
};

export type OptionsResponse = {
  id: number;
  response: string;
  isCorrect: boolean;
};

// 4) Mapper
export class UserMapper {
  static toResponse(user: UserWithAnswers | null): UserResponse | null {
    if (!user) return null;

    const answers = user.answers.map((a) => {
      const selectedOptionId = a.option.id;
      const selected = a.question.options.find(
        (opt) => opt.id === selectedOptionId,
      );

      return {
        id: a.id,
        question: a.question.question,
        options: a.question.options.map((opt) => ({
          id: opt.id,
          response: opt.response,
          isCorrect: opt.isCorrect,
        })),
        selectedOptionId,
        isCorrect: selected?.isCorrect ?? false, // <- adiciona flag direto
      };
    });

    const qtdCorrectAnswers = answers.reduce(
      (acc, a) => (a.isCorrect ? acc + 1 : acc),
      0,
    );

    console.log('Qtd Corrects ' + qtdCorrectAnswers);
    return {
      id: user.id,
      name: user.name,
      qtdCorrectAnswers,
      answers: user.answers.map((a) => ({
        id: a.id,
        questionId: a.questionId,
        question: a.question.question,
        options: a.question.options.map((opt) => ({
          id: opt.id,
          response: opt.response,
          isCorrect: opt.isCorrect,
        })),
        selectedOptionId: a.option.id,
      })),
    };
  }
}
