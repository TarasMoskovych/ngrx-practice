import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { defaultDialogConfig } from 'src/app/configs';
import { AppState } from 'src/app/reducers';
import { courseDeleted } from '../../+store';
import { Course } from '../../models';
import { CourseEntityService } from '../../services/course-entity.service';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CoursesCardListComponent {
  @Input() courses: Course[];

  @Output()
  courseChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private courseService: CourseEntityService,
  ) {}

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {
    // this.store.dispatch(courseDeleted({ course }));
    this.courseService.delete(course);
  }
}
