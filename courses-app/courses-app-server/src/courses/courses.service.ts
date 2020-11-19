import { Injectable } from '@nestjs/common';

import { COURSES } from 'src/data/db.data';
import { Course } from './course.model';

@Injectable()
export class CoursesService {
  private counter = 100;

  getAll(): Course[] {
    return Object.values(COURSES);
  }

  get(courseUrl: string): Course {
    return Object.values(COURSES).find((course: Course) => course.url === courseUrl);
  }

  create(payload: Course): Course {
    const id = this.counter;
    const course: Course = { ...payload, id, seqNo: id };
    COURSES[course.id] = course;
    this.counter++;
    return course;
  }

  update(id: string, payload: Course): Course {
    COURSES[id] = { ...COURSES[id], ...payload };
    return COURSES[id];
  }
}
