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
  ParseIntPipe,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Question } from './entities/question.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { CurrentUser } from 'src/User/user.decorator';

let imageID = uuidv4();

const storage = {
  storage: diskStorage({
    destination: './uploads/image',
    filename: (req, file, cb) => {
      const filename: string =
        imageID + path.parse(file.originalname).name.replace(/\s/g, '');
      const extention: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extention}`);
    }
  })
};
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
      if (createQuestionDto.image !== '')
        createQuestionDto.image = imageID + createQuestionDto.image;
      const createdQuestion = await this.questionService.create(
        createQuestionDto,
        user.id
      );
      res.json({ success: true, question: createdQuestion });
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', storage))
  uploadFile(@UploadedFile() file) {
    return { imagePath: file.filename };
  }

  @Get('upload/:imgName')
  findImangeName(@Request() req, @Response() res) {
    const imgName = req.params.imgName;
    return res.sendFile(join(process.cwd(), 'uploads/image/' + imgName));
  }
}
