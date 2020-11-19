export interface CourseEntity {
  [key: number]: Course;
}

export interface Course {
  id: number;
  description: string;
  longDescription: string;
  iconUrl: string;
  category: string;
  lessonsCount?: number;
  seqNo: number;
  url: string;
}
