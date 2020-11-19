import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { Course } from './course.model';
import { CoursesService } from './courses.service';

@Controller('api/courses')
export class CoursesController {

  constructor(private coursesService: CoursesService) { }

  @Get()
  getAll(): Course[] {
    return this.coursesService.getAll();
  }

  @Get(':courseUrl')
  get(@Param('courseUrl') courseUrl: string): Course {
    return this.coursesService.get(courseUrl);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() course: Course): Course {
    return this.coursesService.update(id, course);
  }

  @Post()
  create(@Body() course: Course): Course {
    return this.coursesService.create(course);
  }
}
