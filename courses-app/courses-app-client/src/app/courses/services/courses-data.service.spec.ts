import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';

import { COURSES } from 'src/app/data/db.data';
import { Course } from '../models';
import { CoursesDataService } from './courses-data.service';

const courses: Course[] = Object.values(COURSES) as Course[];

class HttpUrlGeneratorMock {
  entityResource() {}
  collectionResource() {}
}

describe('CoursesDataService', () => {
  let service: CoursesDataService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CoursesDataService,
        { provide: HttpUrlGenerator, useClass: HttpUrlGeneratorMock },
      ],
    });

    service = TestBed.inject(CoursesDataService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should add new course', () => {
    service.add(courses[0])
      .subscribe((course: Course) => {
        expect(course).toBeTruthy();
        expect(course).toEqual(courses[0]);
      });

    const req = httpController.expectOne('/api/courses');
    expect(req.request.method).toEqual('POST');
    req.flush(courses[0]);
  });

  it('should update existed course', () => {
    const update: Update<Course> = { id: courses[0].id, changes: courses[0] };

    service.update(update)
      .subscribe((course: Course) => {
        expect(course).toBeTruthy();
        expect(course).toEqual(courses[0]);
      });

    const req = httpController.expectOne(`/api/courses/${courses[0].id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(courses[0]);
  });

  it('should delete existed course', () => {
    service.delete(courses[0].id)
      .subscribe((courseId: string | number) => {
        expect(courseId).toBeTruthy();
        expect(courseId).toEqual(courses[0].id);
      });

    const req = httpController.expectOne(`/api/courses/${courses[0].id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(courses[0].id);
  });
});
