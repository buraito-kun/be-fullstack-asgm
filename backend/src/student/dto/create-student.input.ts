import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field(() => Int, { description: 'The prefix id' })
  prefixid: number;

  @Field(() => Int, { description: 'The gender id' })
  genderid: number;

  @Field(() => Int, { description: 'The grade level id' })
  gradelevelid: Number;

  @Field(() => String, { description: 'The student first name' })
  firstname: string;

  @Field(() => String, { description: 'The student last name' })
  lastname: string;

  @Field(() => String, { description: 'The student birthdate' })
  birthdate?: string;
}
