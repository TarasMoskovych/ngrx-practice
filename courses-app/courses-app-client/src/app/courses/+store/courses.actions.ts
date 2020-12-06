import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Course } from '../models';

export const loadAllCourses = createAction(
  '[Courses] Load all Courses',
);

export const allCoursesLoaded = createAction(
  '[Courses] All Courses loaded',
  props<{ courses: Course[] }>(),
);

export const courseAdded = createAction(
  '[Courses] Course Added',
  props<{ course: Course }>(),
);

export const courseAddedSuccess = createAction(
  '[Courses] Course Added Success',
  props<{ course: Course }>(),
);

export const courseUpdated = createAction(
  '[Courses] Course Update',
  props<{ update: Update<Course> }>(),
);

export const courseDeleted = createAction(
  '[Courses] Course Delete',
  props<{ course: Course }>(),
);
