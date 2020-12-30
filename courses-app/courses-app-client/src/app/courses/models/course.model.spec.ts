import { COURSES } from 'src/app/data/db.data';
import { compareCourses, Course } from './course.model';

describe('CourseModel', () => {

  it('should compare courses and return "1"', () => {
    expect(compareCourses(COURSES[2] as Course, COURSES[4] as Course)).toBe(1);
  });

  it('should compare courses and return "-1"', () => {
    expect(compareCourses(COURSES[4] as Course, COURSES[2] as Course)).toBe(-1);
  });

  it('should compare courses and return "0"', () => {
    expect(compareCourses(COURSES[2] as Course, COURSES[2] as Course)).toBe(0);
  });
});
