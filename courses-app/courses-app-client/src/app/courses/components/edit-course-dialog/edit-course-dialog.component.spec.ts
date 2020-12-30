import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {  StoreModule } from '@ngrx/store';

import { COURSES } from 'src/app/data/db.data';
import { MaterialModule } from 'src/app/material/material.module';
import { Category, Course } from '../../models';
import { CourseEntityService } from '../../services/course-entity.service';
import { EditCourseDialogComponent } from './edit-course-dialog.component';

const model: Partial<EditCourseDialogComponent> = {
  dialogTitle: 'Test',
  mode: 'create',
};

class MatDialogRefMock {
  close() {}
}

describe('EditCourseDialogComponent', () => {
  let component: EditCourseDialogComponent;
  let fixture: ComponentFixture<EditCourseDialogComponent>;
  let coursesServiceSpy: jasmine.SpyObj<CourseEntityService>;
  let el: DebugElement;
  let dialogRef: MatDialogRef<EditCourseDialogComponent>;

  const overrideDialogData = (mode: 'create' | 'update' = 'create', course?: Course) => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: { ...model, mode, course } });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(EditCourseDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    coursesServiceSpy = jasmine.createSpyObj('coursesServiceSpy', ['update', 'add']);

    await TestBed.configureTestingModule({
      declarations: [ EditCourseDialogComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        MaterialModule,
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: CourseEntityService, useValue: coursesServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: model },
      ]
    })
    .compileComponents();
  });

  it('should create', () => {
    overrideDialogData();
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    overrideDialogData();
    const h2: DebugElement = el.query(By.css('h2'));

    expect(h2.nativeElement.textContent).toBe(model.dialogTitle);
  });

  it('should close the dialog', () => {
    overrideDialogData();
    spyOn(dialogRef, 'close');

    const closeBtn: DebugElement = el.query(By.css('button:first-child'));
    closeBtn.triggerEventHandler('click', null);

    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

  it('should not trigger "onSubmit" when form is invalid', () => {
    overrideDialogData();
    const closeBtn: DebugElement = el.query(By.css('button:last-child'));
    closeBtn.nativeElement.click();

    expect(closeBtn.nativeElement.disabled).toBeTrue();
    expect(coursesServiceSpy.add).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onSubmit" and "add" new course', () => {
    const course: Course = {
      description: 'Angular Core Deep Dive',
      longDescription: 'A detailed walk-through of the most important part of Angular - the Core and Common modules',
      iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png',
      category: Category.ADVANCED,
      url: 'angular-core-course',
      promo: false,
    } as Course;

    overrideDialogData();
    spyOn(dialogRef, 'close');

    component.form.patchValue({ ...course });
    fixture.detectChanges();

    const closeBtn: DebugElement = el.query(By.css('button:last-child'));
    closeBtn.nativeElement.click();

    expect(closeBtn.nativeElement.disabled).toBeFalse();
    expect(coursesServiceSpy.add).toHaveBeenCalledOnceWith(course);
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

  it('should trigger "onSubmit" and "edit" current course', () => {
    overrideDialogData('update', COURSES[1] as Course);
    spyOn(dialogRef, 'close');

    component.form.patchValue({ promo: true, category: Category.ADVANCED });
    fixture.detectChanges();

    const closeBtn: DebugElement = el.query(By.css('button:last-child'));
    closeBtn.nativeElement.click();

    expect(closeBtn.nativeElement.disabled).toBeFalse();
    expect(coursesServiceSpy.update).toHaveBeenCalledOnceWith({ ...COURSES[1], promo: true, category: Category.ADVANCED });
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

  it('should have empty controls when mode is "create"', () => {
    overrideDialogData();

    Object.keys(component.form.controls).forEach((control: string) => {
      expect(component.form.controls[control].value).toBeFalsy();
    });
  });

  it('should have patched controls when mode is "update"', () => {
    const course: Course = COURSES[1] as Course;
    overrideDialogData('update', course);

    Object.keys(course).forEach((key: string) => {
      if (component.form.controls[key]) {
        expect(component.form.controls[key].value).toBe(course[key]);
      }
    });
  });
});
