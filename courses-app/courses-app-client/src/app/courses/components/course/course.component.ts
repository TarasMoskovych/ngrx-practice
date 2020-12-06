import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { Course, Lesson } from '../../models';
import { CourseEntityService } from '../../services/course-entity.service';
import { LessonEntityService } from '../../services/lesson-entity.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  loading$: Observable<boolean> = this.lessonsService.loading$;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(
    private coursesService: CourseEntityService,
    private lessonsService: LessonEntityService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.coursesService.entities$
      .pipe(map((courses: Course[]) => courses.find((course: Course) => course.url === courseUrl)));

    this.lessons$ = this.lessonsService.entities$
      .pipe(
        withLatestFrom(this.course$),
        tap(([lessons, course]) => this.nextPage === 0 && this.loadLessonsPage(course)),
        map(([lessons, course]) => lessons.filter((lesson: Lesson) => lesson.courseId === course.id)),
      );
  }

  loadLessonsPage(course: Course) {
    this.lessonsService.getWithQuery({
      courseId: String(course.id),
      pageNumber: String(this.nextPage),
      pageSize: '3',
    });

    this.nextPage++;
  }

}
