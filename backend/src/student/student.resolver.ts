import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentJoin } from './dto/student-join.input';
import { StudentJoinCount } from './dto/student-join-count.input';
import { RawQuery } from './dto/raw-query.input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [StudentJoinCount], { name: 'students' })
  findAll(@Args("search") search: string, @Args("limit") limit: number, @Args("page") page: number) {
    return this.studentService.findAll(search, limit, page);
  }

  @Query(() => StudentJoin, { name: 'student' })
  findOne(@Args('studentid', { type: () => Int }) studentid: number) {
    return this.studentService.findOne(studentid);
  }

  @Query(()=> [RawQuery], {name: "rawQuery"})
  rawQuery(){
    return this.studentService.rawQuery()
  }

  @Mutation(() => Student)
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentService.update(updateStudentInput.studentid, updateStudentInput);
  }

  @Mutation(() => Student)
  removeStudent(@Args('studentid', { type: () => Int }) studentid: number) {
    return this.studentService.remove(studentid);
  }
}
