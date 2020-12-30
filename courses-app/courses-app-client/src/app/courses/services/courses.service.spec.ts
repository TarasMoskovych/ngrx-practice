import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { COURSES, LESSONS } from 'src/app/data/db.data';
import { Category, Course, Lesson } from '../models';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });
    service = TestBed.inject(CoursesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all courses', () => {
    service.findAllCourses()
      .subscribe((courses: Course[]) => {
        expect(courses).toBeTruthy();
        expect(courses.length).toBe(Object.values(COURSES).length);
      });

    const req = httpController.expectOne('/api/courses');

    expect(req.request.method).toBe('GET');
    req.flush(Object.values(COURSES));
  });

  it('should retrieve course by "courseUrl"', () => {
    service.findCourseByUrl('ngrx-course')
      .subscribe((course: Course) => {
        expect(course).toBeTruthy();
        expect(course).toEqual(COURSES[4] as Course);
      });

    const req = httpController.expectOne('/api/courses/ngrx-course');
    expect(req.request.method).toBe('GET');
    req.flush(COURSES[4]);
  });

  it('should add new course', () => {
    const payload: Partial<Course> = {
      description: 'NgRx (with NgRx Data) - The Complete Guide',
      longDescription: 'Learn the modern Ngrx Ecosystem, including NgRx Data, Store, Effects, Router Store, Ngrx Entity, and Dev Tools.',
      iconUrl: 'https://angular-university.s3-us-west-1.amazonaws.com/course-images/ngrx-v2.png',
      category: Category.BEGINNER,
      url: 'ngrx-course'
    };

    service.saveCourse(null, payload)
      .subscribe((course: Course) => {
        expect(course).toBeTruthy();
        expect(course).toEqual(COURSES[4] as Course);
      });

    const req = httpController.expectOne('/api/courses');
    expect(req.request.method).toBe('POST');
    req.flush(COURSES[4]);
  });

  it('should update existing course', () => {
    const payload = COURSES[4] as Partial<Course>;

    service.saveCourse(payload.id, payload)
      .subscribe((course: Course) => {
        expect(course).toBeTruthy();
        expect(course).toEqual({ ...COURSES[4], description: 'test' } as Course);
      });

    const req = httpController.expectOne(`/api/courses/${payload.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...COURSES[4], description: 'test' });
  });

  it('should remove existing course', () => {
    const payload = COURSES[4] as Course;

    service.deleteCourse(payload)
      .subscribe((course: Course) => {
        expect(course).toBeTruthy();
        expect(course).toEqual(payload);
      });

    const req = httpController.expectOne(`/api/courses/${payload.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(payload);
  });

  it('should return lessons for existing course', () => {
    service.findLessons(5)
      .subscribe((lessons: Lesson[]) => {
        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(3);
        expect(lessons[0]).toEqual(LESSONS[1]);
      });

    const req = httpController.expectOne(req => req.url === '/api/lessons');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('courseId')).toBe('5');
    expect(req.request.params.get('sortOrder')).toBe('asc');
    expect(req.request.params.get('pageNumber')).toBe('0');
    expect(req.request.params.get('pageSize')).toBe('3');
    req.flush(Object.values(LESSONS).filter((lesson: Lesson) => lesson.courseId === 5).slice(0, 3));
  });
});
