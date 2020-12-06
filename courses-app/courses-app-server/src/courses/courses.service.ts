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
    const course: Course = { ...payload, id, seqNo: id, iconUrl: this.checkIconUrl(payload.iconUrl) };
    COURSES[course.id] = course;
    this.counter++;
    return course;
  }

  update(id: string, payload: Course): Course {
    COURSES[id] = { ...COURSES[id], ...payload, iconUrl: this.checkIconUrl(payload.iconUrl) };
    return COURSES[id];
  }

  delete(id: string): Course {
    const course = COURSES[id];
    delete COURSES[id];
    return course;
  }

  private checkIconUrl(src: string): string {
    if (!src.match(/(https?:\/\/[^\s]+)/g)) {
      src = 'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201811/online-3412498_1920-770x1280.jpg?Q.PE.jaSjTnNR5DSGBmjgkI4_R1cCOCO';
    }

    return src;
  }
}
