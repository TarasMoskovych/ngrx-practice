import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';

import { Course } from '../models';

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {

  constructor(http: HttpClient, httpUrlGenetator: HttpUrlGenerator) {
    super('Course', http, httpUrlGenetator);
  }

  add(course: Course): Observable<Course> {
    return this.http.post<Course>('/api/courses', course);
  }

  update(update: Update<Course>): Observable<Course> {
    return this.http.put<Course>(`/api/courses/${update.id}`, update.changes);
  }

  delete(id: string | number): Observable<string | number> {
    return this.http.delete<string>(`/api/courses/${id}`);
  }

}
