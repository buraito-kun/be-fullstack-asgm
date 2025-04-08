import { InputType, Int, Field } from '@nestjs/graphql';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { Student } from 'src/student/entities/student.entity';

@InputType()
export class CreateStudentClassroomInput {
  @Field(() => Int, { description: 'The student id' })
  studentid: number;

  @Field(() => Int, { description: 'The classroom id' })
  classroomid: number;
}
