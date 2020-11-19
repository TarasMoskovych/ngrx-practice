export interface LessonEntity {
  [key: number]: Lesson;
}

export interface Lesson {
  id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
}

export interface LessonFilter {
  courseId: string;
  filter?: string;
  sortOrder?: string;
  pageNumber?: string,
  pageSize?: string;
}
