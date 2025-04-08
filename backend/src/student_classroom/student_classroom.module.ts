import { Module } from '@nestjs/common';
import { StudentClassroomService } from './student_classroom.service';
import { StudentClassroomResolver } from './student_classroom.resolver';
import { StudentClassroom } from './entities/student_classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudentClassroom])],
  providers: [StudentClassroomResolver, StudentClassroomService],
})
export class StudentClassroomModule {}
