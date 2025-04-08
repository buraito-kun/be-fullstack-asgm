import { CreateStudentClassroomInput } from './create-student_classroom.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentClassroomInput extends PartialType(CreateStudentClassroomInput) {
  @Field(() => Int, { description: 'The student classroom id' })
  student_classroom_id: number;
}
