import { LESSONS } from 'src/app/data/db.data';
import { compareLessons } from './lesson.model';

describe('LessonModel', () => {

  it('should compare lessons by "courseId" and return "1"', () => {
    expect(compareLessons(LESSONS[11], LESSONS[10])).toBe(1);
  });

  it('should compare lessons by "courseId" and return "-1"', () => {
    expect(compareLessons(LESSONS[10], LESSONS[11])).toBe(-1);
  });

  it('should compare lessons by "seqNo"', () => {
    expect(compareLessons(LESSONS[1], LESSONS[2])).toBe(-1);
  });
});
