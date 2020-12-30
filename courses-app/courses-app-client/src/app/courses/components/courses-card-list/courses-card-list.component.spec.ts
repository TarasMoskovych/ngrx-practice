import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';

import { defaultDialogConfig } from 'src/app/configs';
import { COURSES } from '../../../data/db.data';
import { Course } from '../../models';
import { CourseEntityService } from '../../services/course-entity.service';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { CoursesCardListComponent } from './courses-card-list.component';

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;
  let courseEntityServiceSpy: jasmine.SpyObj<CourseEntityService>;
  let dialog: MatDialog;

  beforeEach(async() => {
    courseEntityServiceSpy = jasmine.createSpyObj('CourseEntityService', ['delete']);

    await TestBed.configureTestingModule({
      declarations: [CoursesCardListComponent],
      imports: [
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
        MaterialModule,
      ],
      providers: [
        { provide: CourseEntityService, useValue: courseEntityServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCardListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render courses', () => {
    component.courses = Object.values(COURSES).slice(0, 5) as Course[];
    fixture.detectChanges();

    const cards: DebugElement[] = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy();
    expect(cards.length).toBe(5);
  });

  it('should correct render item', () => {
    const course: Course = COURSES[1] as Course;
    component.courses = [course];
    fixture.detectChanges();

    const card: DebugElement = el.query(By.css('.course-card')),
          title: string = card.query(By.css('mat-card-title')).nativeElement.textContent,
          imageSrc: string = card.query(By.css('img')).nativeElement.src,
          description: string = card.query(By.css('mat-card-content p')).nativeElement.textContent;

    expect(title).toBe(course.description);
    expect(imageSrc).toBe(course.iconUrl);
    expect(description).toBe(course.longDescription);
  });

  it('should edit course and emit changes when modal is closed', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
    spyOn(component.courseChanged, 'emit');

    const course: Course = COURSES[1] as Course;
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update',
    };

    component.courses = [course];
    fixture.detectChanges();
    component.editCourse(course);

    expect(dialog.open).toHaveBeenCalledOnceWith(EditCourseDialogComponent, dialogConfig);
    expect(component.courseChanged.emit).toHaveBeenCalledOnceWith();
  });

  it('should delete course', () => {
    const course: Course = COURSES[1] as Course;
    component.courses = [course];
    fixture.detectChanges();

    const button: DebugElement = el.query(By.css('button:nth-child(3) mat-icon'));
    button.triggerEventHandler('click', null);

    expect(courseEntityServiceSpy.delete).toHaveBeenCalledOnceWith(course);
  });
});
