import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GradelevelService } from './gradelevel.service';
import { Gradelevel } from './entities/gradelevel.entity';
import { CreateGradelevelInput } from './dto/create-gradelevel.input';
import { UpdateGradelevelInput } from './dto/update-gradelevel.input';

@Resolver(() => Gradelevel)
export class GradelevelResolver {
  constructor(private readonly gradelevelService: GradelevelService) {}

  // @Mutation(() => Gradelevel)
  // createGradelevel(@Args('createGradelevelInput') createGradelevelInput: CreateGradelevelInput) {
  //   return this.gradelevelService.create(createGradelevelInput);
  // }

  @Query(() => [Gradelevel], { name: 'gradelevels' })
  findAll() {
    return this.gradelevelService.findAll();
  }

  // @Query(() => Gradelevel, { name: 'gradelevel' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.gradelevelService.findOne(id);
  // }

  // @Mutation(() => Gradelevel)
  // updateGradelevel(@Args('updateGradelevelInput') updateGradelevelInput: UpdateGradelevelInput) {
  //   return this.gradelevelService.update(updateGradelevelInput.id, updateGradelevelInput);
  // }

  // @Mutation(() => Gradelevel)
  // removeGradelevel(@Args('id', { type: () => Int }) id: number) {
  //   return this.gradelevelService.remove(id);
  // }
}
