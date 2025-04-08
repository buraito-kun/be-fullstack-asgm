import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrefixService } from './prefix.service';
import { Prefix } from './entities/prefix.entity';
import { CreatePrefixInput } from './dto/create-prefix.input';
import { UpdatePrefixInput } from './dto/update-prefix.input';

@Resolver(() => Prefix)
export class PrefixResolver {
  constructor(private readonly prefixService: PrefixService) {}

  // @Mutation(() => Prefix)
  // createPrefix(@Args('createPrefixInput') createPrefixInput: CreatePrefixInput) {
  //   return this.prefixService.create(createPrefixInput);
  // }

  @Query(() => [Prefix], { name: 'prefixs' })
  findAll() {
    return this.prefixService.findAll();
  }

  // @Query(() => Prefix, { name: 'prefix' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.prefixService.findOne(id);
  // }

  // @Mutation(() => Prefix)
  // updatePrefix(@Args('updatePrefixInput') updatePrefixInput: UpdatePrefixInput) {
  //   return this.prefixService.update(updatePrefixInput.id, updatePrefixInput);
  // }

  // @Mutation(() => Prefix)
  // removePrefix(@Args('id', { type: () => Int }) id: number) {
  //   return this.prefixService.remove(id);
  // }
}
