import { EntityMetadataMap } from '@ngrx/data';

import { compareCourses, compareLessons } from './models';

export const entityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Lesson: {
    sortComparer: compareLessons,
  },
};
