import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OptionsService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.options.findMany({
      include: {
        question: true,
      },
    });
  }

  async createOption(response: string, questionId: number, isCorrect: boolean) {
    const exists = await this.prisma.questions.findUnique({
      where: { id: questionId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Question not exists');

    return this.prisma.options.create({
      data: {
        response,
        isCorrect,
        questionId,
      },
    });
  }
}
