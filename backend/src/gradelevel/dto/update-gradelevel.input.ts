import { CreateGradelevelInput } from './create-gradelevel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGradelevelInput extends PartialType(CreateGradelevelInput) {
  @Field(() => Int, { description: 'The grade level id' })
  gradelevelid: number;
}
