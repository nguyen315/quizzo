import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  Response
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('api/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Response() res,
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    const user = req.user;
    try {
      const createdQuestion = await this.questionService.create(
        createQuestionDto,
        user.id
      );
      res.json({ success: true, createdQuestion: createdQuestion });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req, @Response() res) {
    try {
      const questions = await this.questionService.findAll();
      res.json({ success: true, questions: questions });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':questionId')
  async findOne(@Request() req, @Response() res) {
    const question_id = req.params.questionId;
    try {
      const question = await this.questionService.findOne(+question_id);
      res.json({ success: true, question: question });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':questionId')
  async update(
    @Request() req,
    @Response() res,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    const question_id = req.params.questionId;
    try {
      const updatedQuestion = await this.questionService.update(
        +question_id,
        updateQuestionDto
      );
      res.json({ success: true, updatedQuestion: updatedQuestion });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':questionId')
  async remove(@Request() req, @Response() res) {
    const question_id = parseInt(req.params.questionId);
    try {
      await this.questionService.remove(question_id);
      res.json({ success: true, message: 'Delete question successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}
