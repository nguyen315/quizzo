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
  Response,
  Query,
  DefaultValuePipe,
  ParseIntPipe
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Question } from './entities/question.entity';
import { CurrentUser } from 'src/User/user.decorator';

@Controller('api/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user,
    @Response() res,
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    try {
      const createdQuestion = await this.questionService.create(
        createQuestionDto,
        user.id
      );
      res.json({ success: true, createdQuestion: createdQuestion });
    } catch (error) {
      console.log(error);
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
      const user = req.user;
      const questions = await this.questionService.findAll(user.id);
      res.json({ success: true, questions: questions });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('paginate')
  async PaginativeFindAll(
    @Response() res,
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ) {
    limit = limit > 100 ? 100 : limit;

    try {
      const content = await this.questionService.findAllWithPagination(
        {
          page,
          limit
        },
        req.user.id
      );
      const previous = page === 1 ? 1 : page - 1;
      const last = Math.ceil(content.total / limit);
      const next = page === last ? 0 : page + 1;
      res.json({
        success: true,
        content,
        totalPage: last,
        links: {
          previousLink:
            page === 1
              ? ``
              : `/api/questions/paginate?page=${previous}&limit=${limit}`,
          nextLink:
            next === 0
              ? ``
              : `/api/questions/paginate?page=${next}&limit=${limit}`
        }
      });
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
      console.log(error);
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
