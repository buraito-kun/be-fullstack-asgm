import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenderInput {
  @Field(() => String, { description: 'The gender name' })
  gendername: string;
}
