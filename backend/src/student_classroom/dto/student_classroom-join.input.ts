import { Int, Field, ObjectType } from '@nestjs/graphql';
import { StudentClassroom } from '../entities/student_classroom.entity';
import { Student } from 'src/student/entities/student.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';

@ObjectType()
export class StudentClassroomJoin {
  @Field(() => StudentClassroom)
  studentClassroom: StudentClassroom;

  @Field(() => Student)
  student: Student;

  @Field(() => Classroom)
  classroom: Classroom;
}
