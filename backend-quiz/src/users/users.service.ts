import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async createUser(name: string) {
    return this.prisma.user.create({
      data: {
        name,
      },
    });
  }

  async findOne(userId: number) {
    const userQuestionsOptions = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        answers: {
          orderBy: { id: 'asc' },
          include: {
            question: {
              select: {
                id: true,
                question: true,
                options: {
                  select: { id: true, response: true, isCorrect: true },
                },
              },
            },
            option: { select: { id: true } },
          },
        },
      },
    });

    return UserMapper.toResponse(userQuestionsOptions);
  }
}
