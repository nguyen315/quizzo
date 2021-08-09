import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Response,
  Delete,
  Put,
  UseGuards
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('api/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':questionId')
  async create(
    @Request() req,
    @Response() res,
    @Body() createAnswerDto: CreateAnswerDto
  ) {
    const questionId = parseInt(req.params.questionId);
    try {
      const createdAnswer = await this.answerService.create(
        createAnswerDto,
        questionId
      );
      return res.json({ success: true, createdAnswer });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':questionId')
  async findAll(@Request() req, @Response() res) {
    try {
      const answers = await this.answerService.findAll();
      res.json({ success: true, answers: answers });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':questionId/:answerId')
  async findOne(@Request() req, @Response() res) {
    const answerId = req.params.answerId;
    try {
      const answer = await this.answerService.findOne(answerId);
      res.json({ success: true, answer: answer });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':questionId/:answerId')
  async update(
    @Request() req,
    @Response() res,
    @Body() updateAnswerQuestionDto: UpdateAnswerDto
  ) {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    try {
      const updatedAnswer = await this.answerService.update(
        answerId,
        updateAnswerQuestionDto,
        questionId
      );
      res.json({ success: true, updatedAnswer: updatedAnswer });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':questionId/:answerId')
  async remove(@Request() req, @Response() res) {
    const answerId = req.params.answerId;
    try {
      await this.answerService.remove(answerId);
      res.json({ success: true, message: 'Delete answer successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
}
