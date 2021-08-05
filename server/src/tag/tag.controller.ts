import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Response,
  Put
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(
    @Request() req,
    @Response() res,
    @Body() createTagDto: CreateTagDto
  ) {
    try {
      const createdTag = await this.tagService.create(createTagDto);
      res.json({ success: true, createdTag: createdTag });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Get()
  async findAll(@Request() req, @Response() res) {
    try {
      const tags = await this.tagService.findAll();
      res.json({ success: true, tags: tags });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Get('findByQuestionId/:questionId')
  async findByQuestionId(@Request() req, @Response() res) {
    try {
      const question_id = req.params.questionId;
      const tags = await this.tagService.findTagByQuestionId(question_id);
      res.json({ success: true, tags: tags });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Put(':tagId')
  async update(
    @Request() req,
    @Response() res,
    @Body() updateTagDto: UpdateTagDto
  ) {
    try {
      const tag_id = req.params.tagId;
      const updatedTag = await this.tagService.update(tag_id, updateTagDto);
      res.json({ success: true, updatedTag: updatedTag });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Delete(':tagId')
  async remove(@Request() req, @Response() res) {
    const tag_id = req.params.tagId;
    try {
      await this.tagService.remove(tag_id);
      res.json({ success: true, message: 'Delete tag successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
}
