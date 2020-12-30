import { Update } from '@ngrx/entity';
import { COURSES } from 'src/app/data/db.data';
import { Category, Course } from '../models';
import { allCoursesLoaded, courseAddedSuccess, courseDeleted, courseUpdated } from './courses.actions';
import { coursesReducer, initialCoursesState } from './courses.reducer';

interface Entity {
  [key: string]: Course;
}

const courses: Course[] = Object.values(COURSES) as Course[];
const entities: Entity = courses.reduce((acc: Entity, course: Course) => {
  return { ...acc, [course.id]: course };
}, {});

describe('CoursesReducer', () => {

  it('should return the default state', () => {
    const state = coursesReducer(undefined, {} as any);

    expect(state).toBe(initialCoursesState);
  });

  it('should set "courses"', () => {
    const state = coursesReducer(initialCoursesState, allCoursesLoaded({ courses }));

    expect(state.entities).toEqual(entities);
  });

  it('should add new course', () => {
    const state = coursesReducer({ ...initialCoursesState, entities }, courseAddedSuccess({ course: courses[0] }));

    expect(state.entities).toEqual({
      ...entities,
      [courses[0].id]: courses[0],
    });
  });

  it('should update existing course', () => {
    const update: Update<Course> = {
      id: 4,
      changes: {
        id: 4,
        description: 'NgRx (with NgRx Data) - updated',
        longDescription: 'Learn the modern Ngrx Ecosystem, including NgRx Data, Store, Effects, Router Store, Ngrx Entity, and Dev Tools.',
        iconUrl: 'https://angular-university.s3-us-west-1.amazonaws.com/course-images/ngrx-v2.png',
        category: Category.ADVANCED,
        lessonsCount: 10,
        seqNo: 0,
        url: 'ngrx-course'
      }
    };
    const state = coursesReducer({ ...initialCoursesState, entities }, courseUpdated({ update }));

    expect(state.entities).toEqual({
      ...entities,
      [update.id]: update.changes,
    });
  });

  it('should remove existing course', () => {
    const state = coursesReducer(initialCoursesState, courseDeleted({ course: courses[0] }));

    expect(state.entities).toEqual({});
  });
});
