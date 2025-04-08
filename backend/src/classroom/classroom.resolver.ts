import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassroomService } from './classroom.service';
import { Classroom } from './entities/classroom.entity';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { ClassroomCount } from './dto/classroom-count.input';

@Resolver(() => Classroom)
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Mutation(() => Classroom)
  createClassroom(@Args('createClassroomInput') createClassroomInput: CreateClassroomInput) {
    return this.classroomService.create(createClassroomInput);
  }

  @Query(() => [ClassroomCount], { name: 'classrooms' })
  findAll(@Args("search") search: string, @Args("limit") limit: number, @Args("page") page: number) {
    return this.classroomService.findAll(search, limit, page);
  }

  @Query(() => Classroom, { name: 'classroom' })
  findOne(@Args('classroomid', { type: () => Int }) classroomid: number) {
    return this.classroomService.findOne(classroomid);
  }

  @Mutation(() => Classroom)
  updateClassroom(@Args('updateClassroomInput') updateClassroomInput: UpdateClassroomInput) {
    return this.classroomService.update(updateClassroomInput.classroomid, updateClassroomInput);
  }

  @Mutation(() => Classroom)
  removeClassroom(@Args('classroomid', { type: () => Int }) classroomid: number) {
    return this.classroomService.remove(classroomid);
  }
}
