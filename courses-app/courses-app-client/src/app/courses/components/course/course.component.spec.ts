import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { COURSES, LESSONS } from 'src/app/data/db.data';
import { MaterialModule } from 'src/app/material/material.module';
import { Course, Lesson } from '../../models';
import { CourseEntityService } from '../../services/course-entity.service';
import { LessonEntityService } from '../../services/lesson-entity.service';

import { CourseComponent } from './course.component';

const selectedCourse: Course = COURSES[4] as Course;

const lessons: Lesson[] = Object.values(LESSONS)
  .filter((lesson: Lesson) => lesson.courseId === selectedCourse.id)
  .sort((l1, l2) => l1.id - l2.id)
  .slice(0, 3);

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let el: DebugElement;
  let coursesServiceSpy: jasmine.SpyObj<CourseEntityService>;
  let lessonServiceSpy: jasmine.SpyObj<LessonEntityService>;

  beforeEach(async () => {
    coursesServiceSpy = jasmine.createSpyObj('CourseEntityService', [], {
      'entities$': of(Object.values(COURSES))
    });

    lessonServiceSpy = jasmine.createSpyObj('LessonEntityService', ['getWithQuery'], {
      'entities$': of(Object.values(lessons)),
    });

    await TestBed.configureTestingModule({
      declarations: [
        CourseComponent,
      ],
      imports: [
        MaterialModule,
      ],
      providers: [
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                courseUrl: selectedCourse.url,
              }),
            },
          },
        },
        { provide: CourseEntityService, useValue: coursesServiceSpy },
        { provide: LessonEntityService, useValue: lessonServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render selected course', () => {
    expect(el.query(By.css('h2')).nativeElement.textContent).toBe(selectedCourse.description);
    expect(el.query(By.css('img')).nativeElement.src).toBe(selectedCourse.iconUrl);
  });

  it('should render first three lessons', () => {
    const rows: DebugElement[] = el.queryAll(By.css('mat-row'));

    expect(component.nextPage).toBe(1);
    expect(lessonServiceSpy.getWithQuery).toHaveBeenCalledOnceWith({
      courseId: String(selectedCourse.id),
      pageNumber: '0',
      pageSize: '3',
    });
    expect(rows.length).toBe(3);
    expect(rows[0].query(By.css('mat-cell:nth-child(2)')).nativeElement.textContent).toBe(lessons[0].description);
  });

  it('should load more lessons when "Load More" button is clicked', () => {
    const btn: DebugElement = el.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    expect(component.nextPage).toBe(2);
    expect(lessonServiceSpy.getWithQuery).toHaveBeenCalledWith({
      courseId: String(selectedCourse.id),
      pageNumber: '1',
      pageSize: '3',
    });

    btn.triggerEventHandler('click', null);
    expect(component.nextPage).toBe(3);
    expect(lessonServiceSpy.getWithQuery).toHaveBeenCalledWith({
      courseId: String(selectedCourse.id),
      pageNumber: '2',
      pageSize: '3',
    });
  });
});
