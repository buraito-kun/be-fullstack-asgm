import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePrefixInput {
  @Field(() => String, { description: 'The prefix name' })
  prefixname: string;
}
