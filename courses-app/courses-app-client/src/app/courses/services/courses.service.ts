import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course, Lesson } from '../models';

@Injectable()
export class CoursesService {

  constructor(private http: HttpClient) { }

  findAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses');
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseUrl}`);
  }

  findLessons(
    courseId: number,
    pageNumber = 0, pageSize = 3): Observable<Lesson[]> {

    return this.http.get<Lesson[]>('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('sortOrder', 'asc')
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  saveCourse(courseId: number | string, changes: Partial<Course>) {
    if (courseId) {
      return this.http.put('/api/courses/' + courseId, changes);
    }
    return this.http.post('/api/courses', changes);
  }
}
