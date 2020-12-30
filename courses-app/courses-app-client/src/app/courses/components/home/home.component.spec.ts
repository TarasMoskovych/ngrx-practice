import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { defaultDialogConfig } from 'src/app/configs';
import { COURSES } from 'src/app/data/db.data';

import { MaterialModule } from 'src/app/material/material.module';
import { Category, Course } from '../../models';
import { CourseEntityService } from '../../services/course-entity.service';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { HomeComponent } from './home.component';

const allCourses: Course[] = Object.values(COURSES) as Course[];

const filterCourses = (courses: Course[], category: Category): Course[] => {
  return courses.filter((course: Course) => course.category === category);
}

class CourseEntityServiceMock {
  static courses$: Observable<Course[]> = of([]);

  get entities$(): Observable<Course[]> {
    return CourseEntityServiceMock.courses$;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        CoursesCardListComponent,
      ],
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        MaterialModule,
      ],
      providers: [
        MatDialog,
        { provide: CourseEntityService, useClass: CourseEntityServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  const compile = (courses: Course[] = allCourses) => {
    CourseEntityServiceMock.courses$ = of(courses);
    TestBed.compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
    dialog = TestBed.inject(MatDialog);
  };

  it('should create', () => {
    compile();
    expect(component).toBeTruthy();
  });

  it('should display only "Beginners" tab', () => {
    const courses = filterCourses(allCourses, Category.BEGINNER);
    compile(courses);

    fixture.detectChanges();
    const labels: DebugElement[] = el.queryAll(By.css('.mat-tab-label'));

    expect(labels.length).toBe(1);
    expect(labels[0].nativeElement.textContent).toBe('Beginners');
    expect(el.queryAll(By.css('mat-card')).length).toBe(courses.length);
  });

  it('should display only "Intermedite" tab', () => {
    const courses = filterCourses(allCourses, Category.INTERMEDIATE);
    compile(courses);

    fixture.detectChanges();
    const labels: DebugElement[] = el.queryAll(By.css('.mat-tab-label'));

    expect(labels.length).toBe(1);
    expect(labels[0].nativeElement.textContent).toBe('Intermedite');
    expect(el.queryAll(By.css('mat-card')).length).toBe(courses.length);
  });

  it('should display only "Advanced" tab', () => {
    const courses = filterCourses(allCourses, Category.ADVANCED);
    compile(courses);

    fixture.detectChanges();
    const labels: DebugElement[] = el.queryAll(By.css('.mat-tab-label'));

    expect(labels.length).toBe(1);
    expect(labels[0].nativeElement.textContent).toBe('Advanced');
    expect(el.queryAll(By.css('mat-card')).length).toBe(courses.length);
  });

  it('should display all tabs', () => {
    compile();
    const labels: DebugElement[] = el.queryAll(By.css('.mat-tab-label'));

    expect(labels.length).toBe(3);
    expect(labels[0].nativeElement.textContent).toBe('Beginners');
    expect(labels[1].nativeElement.textContent).toBe('Intermedite');
    expect(labels[2].nativeElement.textContent).toBe('Advanced');
  });

  it('should display "promo" counter', () => {
    compile();
    expect(el.query(By.css('.counters p')).nativeElement.textContent).toBe('In Promo: 1');
  });

  it('should open "Add Course modal"', () => {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    compile();
    spyOn(dialog, 'open');

    const addBtn: DebugElement = el.query(By.css('.add-course-btn'));
    addBtn.triggerEventHandler('click', null);

    expect(dialog.open).toHaveBeenCalledOnceWith(EditCourseDialogComponent, dialogConfig);
  });

  it('should display different lists of courses when user clicks on specific tab', fakeAsync(() => {
    compile();

    const beginner: Course[] = filterCourses(allCourses, Category.BEGINNER);
    const intermediate: Course[] = filterCourses(allCourses, Category.INTERMEDIATE);
    const advanced: Course[] = filterCourses(allCourses, Category.ADVANCED);
    const tabs: DebugElement[] = el.queryAll(By.css('.mat-tab-label'));

    const tabClickHandler = (tab: DebugElement) => {
      tab.triggerEventHandler('click', null);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    };
    const asserts = (title: string, length: number) => {
      const cardTitles = el.queryAll(By.css('.mat-card-title'));
      expect(cardTitles.length).toBe(length);
      expect(cardTitles[0].nativeElement.textContent).toContain(title);
    };

    flush();
    asserts(beginner[0].description, beginner.length);

    tabClickHandler(tabs[2]);
    asserts(advanced[0].description, advanced.length);

    tabClickHandler(tabs[1]);
    asserts(intermediate[0].description, intermediate.length);

    tabClickHandler(tabs[0]);
    asserts(beginner[0].description, beginner.length);
  }));
});
