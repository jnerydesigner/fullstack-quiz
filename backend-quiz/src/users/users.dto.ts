export type UserDto = {
  id?: number;
  name: string;
  answers: UserAnswerType[];
};

export type UserAnswerType = {
  id: number;
  userId: number;
  questionId: number;
  optionId: number;
  createdAt: Date;
};
