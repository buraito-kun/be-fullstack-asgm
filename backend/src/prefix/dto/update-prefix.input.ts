import { CreatePrefixInput } from './create-prefix.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePrefixInput extends PartialType(CreatePrefixInput) {
  @Field(() => Int, { description: 'The prefix id' })
  prefixid: number;
}
