import { Injectable } from '@nestjs/common';

import { LESSONS } from 'src/data/db.data';
import { Lesson, LessonFilter } from './lesson.model';

@Injectable()
export class LessonsService {

  getAll(lessonFilter: LessonFilter): Lesson[] {
    const courseId = parseInt(lessonFilter.courseId);
    const filter = lessonFilter.filter || '';
    const sortOrder = lessonFilter.sortOrder || 'asc';
    const pageNumber = parseInt(lessonFilter.pageNumber) || 0;
    const pageSize = parseInt(lessonFilter.pageSize) || 10;
    const initialPos = pageNumber * pageSize;

    console.log(typeof courseId);

    let lessons = Object.values(LESSONS).filter((lesson: Lesson) => lesson.courseId === courseId).sort((l1, l2) => l1.id - l2.id);

    if (filter) {
      lessons = lessons.filter((lesson: Lesson) => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder == 'desc') {
      lessons = lessons.reverse();
    }

    return lessons.slice(initialPos, initialPos + pageSize);
  }
}
