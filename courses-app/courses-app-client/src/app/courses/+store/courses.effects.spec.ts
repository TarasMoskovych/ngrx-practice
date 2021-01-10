import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { COURSES } from 'src/app/data/db.data';
import { Course } from '../models';
import { CoursesService } from '../services/courses.service';
import { allCoursesLoaded, courseAdded, courseAddedSuccess, courseDeleted, courseUpdated, loadAllCourses } from './courses.actions';
import { CoursesEffects } from './courses.effects';

const courses: Course[] = Object.values(COURSES) as Course[];

describe('CoursesEffects', () => {
  let actions$: Observable<Action>;
  let effects: CoursesEffects;
  let coursesService: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesEffects,
        CoursesService,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(CoursesEffects);
    coursesService = TestBed.inject(CoursesService);
  });

  describe('loadCourses$', () => {
    it('should work', () => {
      spyOn(coursesService, 'findAllCourses').and.returnValue(of(courses));

      const action = loadAllCourses();
      const completion = allCoursesLoaded({ courses });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadCourses$).toBeObservable(expected);
    });
  });

  describe('addCourse$', () => {
    it('should work', () => {
      spyOn(coursesService, 'saveCourse').and.returnValue(of(courses[0]));

      const action = courseAdded({ course: courses[0] });
      const completion = courseAddedSuccess({ course: courses[0] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.addCourse$).toBeObservable(expected);
    });
  });

  describe('saveCourse$', () => {
    it('should work', () => {
      spyOn(coursesService, 'saveCourse').and.returnValue(of(courses[0]));

      const update: Update<Course> = { id: courses[0].id, changes: courses[0] };
      actions$ = of(courseUpdated({ update }));
      effects.saveCourse$.subscribe();

      expect(coursesService.saveCourse).toHaveBeenCalledTimes(1);
      expect(coursesService.saveCourse).toHaveBeenCalledOnceWith(update.id, update.changes);
    });
  });

  describe('deleteCourse$', () => {
    it('should work', () => {
      spyOn(coursesService, 'deleteCourse').and.returnValue(of(courses[0]));

      actions$ = of(courseDeleted({ course: courses[0] }));
      effects.deleteCourse$.subscribe();

      expect(coursesService.deleteCourse).toHaveBeenCalledTimes(1);
      expect(coursesService.deleteCourse).toHaveBeenCalledOnceWith(courses[0]);
    });
  });
});
