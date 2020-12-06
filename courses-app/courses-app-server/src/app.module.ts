import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoursesModule, LessonsModule, AuthModule],
})
export class AppModule {}
