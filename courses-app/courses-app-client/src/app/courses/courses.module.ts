import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from './entity.metadata';
import { coursesFeatureKey, coursesReducer, CoursesEffects } from './+store';

import { CourseComponent } from './components/course/course.component';
import { CoursesCardListComponent, EditCourseDialogComponent, HomeComponent } from './components';

import { MaterialModule } from '../material/material.module';
import { CoursesResolver } from './services/courses.resolver';
import { CoursesService } from './services/courses.service';
import { CourseEntityService } from './services/course-entity.service';
import { CoursesDataService } from './services/courses-data.service';
import { LessonEntityService } from './services/lesson-entity.service';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      courses: CoursesResolver,
    }
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
    resolve: {
      courses: CoursesResolver,
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(coursesRoutes),
    // StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    // EffectsModule.forFeature([CoursesEffects]),
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesService,
    CoursesResolver,
    CourseEntityService,
    CoursesDataService,
    LessonEntityService,
  ],
})
export class CoursesModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    coursesDataService: CoursesDataService,
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Course', coursesDataService);
  }
}
