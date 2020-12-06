import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { map, pluck, switchMap } from 'rxjs/operators';

import { Course } from '../models';
import { CoursesService } from '../services/courses.service';
import { CoursesActions } from './courses.action-types';
import { allCoursesLoaded, courseAddedSuccess } from './courses.actions';

@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
  ) {}

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      switchMap(() => this.coursesService.findAllCourses()),
      map((courses: Course[]) => allCoursesLoaded({ courses }))
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.courseAdded),
      pluck('course'),
      switchMap((course: Course) => this.coursesService.saveCourse(null, course)),
      map((course: Course) => courseAddedSuccess({ course }))
    )
  );

  saveCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.courseUpdated),
      pluck('update'),
      switchMap((updated: Update<Course>) => this.coursesService.saveCourse(updated.id, updated.changes)),
    )
  , { dispatch: false });

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.courseDeleted),
      pluck('course'),
      switchMap((course: Course) => this.coursesService.deleteCourse(course)),
    )
  , { dispatch: false });
}
