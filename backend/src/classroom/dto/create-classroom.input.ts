import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomInput {
  @Field(() => String, { description: 'The homeroom teacher name' })
  homeroom_teacher: string;

  @Field(() => String, { description: 'The classroom name' })
  classname: string;

  @Field(() => Int, { description: 'The classroom year' })
  academic_year: number;
}
