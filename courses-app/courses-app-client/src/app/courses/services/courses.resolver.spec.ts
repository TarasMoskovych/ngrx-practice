import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CoursesResolver } from './courses.resolver';
import { CourseEntityService } from './course-entity.service';
import { Course } from '../models';
import { COURSES } from 'src/app/data/db.data';

class CourseEntityServiceMock {
  getAll() {}
  get loaded$(): Observable<boolean> {
    return of(true);
  };
}

describe('CoursesResolver', () => {
  let resolver: CoursesResolver;
  let route: ActivatedRouteSnapshot;
  let coursesService: CourseEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesResolver,
        { provide: CourseEntityService, useClass: CourseEntityServiceMock },
      ],
    });
    route = new ActivatedRouteSnapshot();
    resolver = TestBed.inject(CoursesResolver);
    coursesService = TestBed.inject(CourseEntityService);

    spyOn(coursesService, 'getAll').and.returnValue(of(Object.values(COURSES) as Course[]));
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve', () => {
    resolver.resolve(route, null).subscribe((resolved: boolean) => {
      expect(resolved).toBeTruthy();
    });

    expect(coursesService.getAll).toHaveBeenCalledTimes(0);
  });

  it('should resolve and call "getAll"', () => {
    spyOnProperty(coursesService, 'loaded$').and.returnValue(of(false));
    resolver.resolve(route, null).subscribe();

    expect(coursesService.getAll).toHaveBeenCalledTimes(1);
  });
});
