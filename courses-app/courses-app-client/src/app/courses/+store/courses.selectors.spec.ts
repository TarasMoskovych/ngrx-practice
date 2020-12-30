import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { COURSES } from 'src/app/data/db.data';
import { AppState } from 'src/app/reducers';
import { Category, compareCourses, Course } from '../models';
import { allCoursesLoaded } from './courses.actions';
import { coursesFeatureKey, coursesReducer } from './courses.reducer';
import { selectAdvancedCourses, selectAllCourses, selectAllCoursesLoaded, selectBeginnerCourses, selectIntermediateCourses, selectPromoTotal } from './courses.selectors';

const courses: Course[] = Object.values(COURSES) as Course[];
const sorted: Course[] = courses.sort(compareCourses);

describe('CoursesSelectors', () => {
  let store$: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(coursesFeatureKey, coursesReducer),
      ],
    });

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch').and.callThrough();
  });

  it('should return selectAllCourses$', () => {
    let result: Course[];

    store$
      .select(selectAllCourses)
      .subscribe((courses: Course[]) => result = courses);

    expect(result).toEqual([]);

    store$.dispatch(allCoursesLoaded({ courses }));
    expect(result).toEqual(sorted);
  });

  it('should return selectBeginnerCourses$', () => {
    let result: Course[];

    store$
      .select(selectBeginnerCourses)
      .subscribe((courses: Course[]) => result = courses);

    expect(result).toEqual([]);

    store$.dispatch(allCoursesLoaded({ courses }));
    expect(result).toEqual(sorted.filter((course: Course) => course.category === Category.BEGINNER));
  });

  it('should return selectIntermediateCourses$', () => {
    let result: Course[];

    store$
      .select(selectIntermediateCourses)
      .subscribe((courses: Course[]) => result = courses);

    expect(result).toEqual([]);

    store$.dispatch(allCoursesLoaded({ courses }));
    expect(result).toEqual(sorted.filter((course: Course) => course.category === Category.INTERMEDIATE));
  });

  it('should return selectAdvancedCourses$', () => {
    let result: Course[];

    store$
      .select(selectAdvancedCourses)
      .subscribe((courses: Course[]) => result = courses);

    expect(result).toEqual([]);

    store$.dispatch(allCoursesLoaded({ courses }));
    expect(result).toEqual(sorted.filter((course: Course) => course.category === Category.ADVANCED));
  });

  it('should return selectPromoTotal$', () => {
    let result: number = 0;

    store$
      .select(selectPromoTotal)
      .subscribe((total: number) => result = total);

    expect(result).toBe(0);

    store$.dispatch(allCoursesLoaded({ courses }));
    expect(result).toEqual(sorted.filter((course: Course) => course.promo).length);
  });

  it('should return selectAllCoursesLoaded$', () => {
    let result: boolean;

    store$
      .select(selectAllCoursesLoaded)
      .subscribe((loaded: boolean) => result = loaded);

    expect(result).toBeFalse();

    store$.dispatch(allCoursesLoaded({ courses }));
    expect(result).toBeTrue();
  });
});
