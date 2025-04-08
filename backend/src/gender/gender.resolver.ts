import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenderService } from './gender.service';
import { Gender } from './entities/gender.entity';
import { CreateGenderInput } from './dto/create-gender.input';
import { UpdateGenderInput } from './dto/update-gender.input';

@Resolver(() => Gender)
export class GenderResolver {
  constructor(private readonly genderService: GenderService) {}

  // @Mutation(() => Gender)
  // createGender(@Args('createGenderInput') createGenderInput: CreateGenderInput) {
  //   return this.genderService.create(createGenderInput);
  // }

  @Query(() => [Gender], { name: 'genders' })
  findAll() {
    return this.genderService.findAll();
  }

  // @Query(() => Gender, { name: 'gender' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.genderService.findOne(id);
  // }

  // @Mutation(() => Gender)
  // updateGender(@Args('updateGenderInput') updateGenderInput: UpdateGenderInput) {
  //   return this.genderService.update(updateGenderInput.id, updateGenderInput);
  // }

  // @Mutation(() => Gender)
  // removeGender(@Args('id', { type: () => Int }) id: number) {
  //   return this.genderService.remove(id);
  // }
}
