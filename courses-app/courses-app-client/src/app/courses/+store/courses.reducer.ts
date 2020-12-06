import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { compareCourses, Course } from '../models';
import { CoursesActions } from './courses.action-types';

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const coursesAdapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState: CoursesState = coursesAdapter.getInitialState({
  allCoursesLoaded: false,
});

export const { selectAll } = coursesAdapter.getSelectors();

export const coursesReducer = createReducer<CoursesState>(
  initialCoursesState,
  on(CoursesActions.allCoursesLoaded, (state, action) => coursesAdapter.setAll(action.courses, { ...state, allCoursesLoaded: true })),
  on(CoursesActions.courseAddedSuccess, (state, action) => coursesAdapter.addOne(action.course, state)),
  on(CoursesActions.courseUpdated, (state, action) => coursesAdapter.updateOne(action.update, state)),
  on(CoursesActions.courseDeleted, (state, action) => coursesAdapter.removeOne(action.course.id, state)),
);
