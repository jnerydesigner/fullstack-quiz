import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { OptionsService } from './options.service';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly optionsService: OptionsService,
  ) {}

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Post()
  createQuestions(@Body() body: { question: string }) {
    return this.questionsService.createQuestion(body.question);
  }

  @Get('/options')
  findAllOptions() {
    return this.optionsService.findAll();
  }

  @Post('/options')
  createOptions(@Body() body: InputOptions) {
    const { isCorrect, response, questionId } = body;
    return this.optionsService.createOption(response, questionId, isCorrect);
  }

  @Post('/user')
  createQuestionUser(@Body() body: InputUserQuestionOption) {
    return this.questionsService.createUserQuestionOption(
      body.userId,
      body.questionId,
      body.optionId,
    );
  }
}

interface InputUserQuestionOption {
  userId: number;
  questionId: number;
  optionId: number;
}

interface InputOptions {
  response: string;
  isCorrect: boolean;
  questionId: number;
}
