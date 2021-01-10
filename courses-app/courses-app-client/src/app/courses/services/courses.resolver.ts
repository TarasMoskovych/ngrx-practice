import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { AppState } from 'src/app/reducers';
import { loadAllCourses, selectAllCoursesLoaded } from '../+store';
import { Course } from '../models';
import { CourseEntityService } from './course-entity.service';

@Injectable()
// export class CoursesResolver implements Resolve<AppState> {

//   constructor(private store: Store<AppState>) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppState> {
//     return this.store.pipe(
//       take(1),
//       select(selectAllCoursesLoaded),
//       tap((loaded: boolean) => !loaded && this.store.dispatch(loadAllCourses())),
//     );
//   }

// }

export class CoursesResolver implements Resolve<boolean> {

  constructor(private coursesService: CourseEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.coursesService.loaded$
      .pipe(
        tap((loaded: boolean) => !loaded && this.coursesService.getAll()),
        filter((loaded: boolean) => !!loaded),
        take(1),
      )
  }
}
