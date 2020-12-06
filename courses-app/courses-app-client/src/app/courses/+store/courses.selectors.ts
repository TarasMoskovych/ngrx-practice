import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Category, Course } from '../models';
import { coursesFeatureKey, CoursesState, selectAll } from './courses.reducer';

export const coursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectAllCourses = createSelector(
  coursesState,
  selectAll,
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.category === Category.BEGINNER),
);

export const selectIntermediateCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.category === Category.INTERMEDIATE),
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.category === Category.ADVANCED),
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.promo).length,
);

export const selectAllCoursesLoaded = createSelector(
  coursesState,
  (state: CoursesState) => state.allCoursesLoaded,
);
