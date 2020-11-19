import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';

import { compareCourses, Course } from '../../models';
import { CoursesService } from '../../services';
import { defaultDialogConfig } from 'src/app/configs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;
  loading$: Observable<boolean>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    const courses$ = this.coursesService.findAllCourses()
      .pipe(
        map((courses: Course[]) => courses.sort(compareCourses)),
        shareReplay()
      );

    this.loading$ = courses$.pipe(map(courses => !!courses));
    this.beginnerCourses$ = courses$
      .pipe(
        map((courses: Course[]) => courses.filter(course => course.category == 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map((courses: Course[]) => courses.filter(course => course.category == 'ADVANCED'))
      );

    this.promoTotal$ = courses$
      .pipe(
        map((courses: Course[]) => courses.filter(course => course.promo).length)
      );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
