import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { TagQuestionService } from './tag-question.service';
import { CreateTagQuestionDto } from './dto/create-tag-question.dto';
import { UpdateTagQuestionDto } from './dto/update-tag-question.dto';

@Controller('tag-question')
export class TagQuestionController {
  constructor(private readonly tagQuestionService: TagQuestionService) {}

  @Post()
  create(@Body() createTagQuestionDto: CreateTagQuestionDto) {
    return this.tagQuestionService.create(createTagQuestionDto);
  }

  @Get()
  findAll() {
    return this.tagQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagQuestionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTagQuestionDto: UpdateTagQuestionDto
  ) {
    return this.tagQuestionService.update(+id, updateTagQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagQuestionService.remove(+id);
  }
}
