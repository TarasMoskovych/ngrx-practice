import { Controller, Get, Query } from '@nestjs/common';

import { Lesson, LessonFilter } from './lesson.model';
import { LessonsService } from './lessons.service';

@Controller('api/lessons')
export class LessonsController {

  constructor(private lessonsService: LessonsService) { }

  @Get()
  getAll(@Query() filter: LessonFilter): Lesson[] {
    return this.lessonsService.getAll(filter);
  }
}
