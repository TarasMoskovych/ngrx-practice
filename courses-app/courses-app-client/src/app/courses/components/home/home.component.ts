import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

import { Category, Course } from '../../models';
import { defaultDialogConfig } from 'src/app/configs';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { selectAdvancedCourses, selectBeginnerCourses, selectIntermediateCourses, selectPromoTotal } from '../../+store';
import { CourseEntityService } from '../../services/course-entity.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // promoTotal$: Observable<number>            = this.store.select(selectPromoTotal);
  // beginnerCourses$: Observable<Course[]>     = this.store.select(selectBeginnerCourses);
  // intermediateCourses$: Observable<Course[]> = this.store.select(selectIntermediateCourses);
  // advancedCourses$: Observable<Course[]>     = this.store.select(selectAdvancedCourses);

  promoTotal$: Observable<number>            = this.coursesService.entities$.pipe(map((courses: Course[]) => courses.filter((course: Course) => course.promo).length));
  beginnerCourses$: Observable<Course[]>     = this.coursesService.entities$.pipe(map(this.filterCourses.bind(this, Category.BEGINNER)));
  intermediateCourses$: Observable<Course[]> = this.coursesService.entities$.pipe(map(this.filterCourses.bind(this, Category.INTERMEDIATE)));
  advancedCourses$: Observable<Course[]>     = this.coursesService.entities$.pipe(map(this.filterCourses.bind(this, Category.ADVANCED)));

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private coursesService: CourseEntityService,
  ) {}

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }

  private filterCourses(category: Category, courses: Course[]): Course[] {
    return courses.filter((course: Course) => course.category === category);
  }
}
