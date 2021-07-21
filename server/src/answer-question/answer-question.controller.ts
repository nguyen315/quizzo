import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';
import { CreateAnswerQuestionDto } from './dto/create-answer-question.dto';
import { UpdateAnswerQuestionDto } from './dto/update-answer-question.dto';

@Controller('api/answers/:questionId')
export class AnswerQuestionController {
  constructor(private readonly answerQuestionService: AnswerQuestionService) {}

  @Post()
  create(@Body() createAnswerQuestionDto: CreateAnswerQuestionDto) {
    return this.answerQuestionService.create(createAnswerQuestionDto);
  }

  @Get()
  findAll() {
    return this.answerQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerQuestionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnswerQuestionDto: UpdateAnswerQuestionDto
  ) {
    return this.answerQuestionService.update(+id, updateAnswerQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerQuestionService.remove(+id);
  }
}
