import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGradelevelInput {
  @Field(() => String, { description: 'The grade level name' })
  levelname: string;
}
