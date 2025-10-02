import { PrismaService } from '@/database/prisma.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class QuestionsService {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(QuestionsService.name);
  }

  async findAll() {
    const questions = await this.prisma.questions.findMany({
      include: {
        options: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    this.logger.log(JSON.stringify(questions));

    return questions;
  }

  async createQuestion(question: string) {
    return this.prisma.questions.create({
      data: {
        question,
      },
    });
  }

  async createUserQuestionOption(
    userId: number,
    questionId: number,
    optionId: number,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User Not exists');
    }

    const question = await this.prisma.questions.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      throw new NotFoundException('Question Not exists');
    }

    const option = await this.prisma.options.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!option) {
      throw new NotFoundException('Option Not exists');
    }

    return this.prisma.userAnswer.create({
      data: {
        userId: user.id,
        questionId: question.id,
        optionId: option.id,
      },
    });
  }
}
