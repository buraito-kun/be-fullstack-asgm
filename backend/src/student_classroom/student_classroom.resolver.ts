import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentClassroomService } from './student_classroom.service';
import { StudentClassroom } from './entities/student_classroom.entity';
import { CreateStudentClassroomInput } from './dto/create-student_classroom.input';
import { UpdateStudentClassroomInput } from './dto/update-student_classroom.input';
import { StudentClassroomJoin } from './dto/student_classroom-join.input';

@Resolver(() => StudentClassroom)
export class StudentClassroomResolver {
  constructor(private readonly studentClassroomService: StudentClassroomService) {}

  @Mutation(() => StudentClassroom)
  createStudentClassroom(@Args('createStudentClassroomInput') createStudentClassroomInput: CreateStudentClassroomInput) {
    return this.studentClassroomService.create(createStudentClassroomInput);
  }

  @Query(() => [StudentClassroom], { name: 'studentClassrooms' })
  findAll() {
    return this.studentClassroomService.findAll();
  }

  @Query(() => [StudentClassroomJoin], { name: 'studentClassroom' })
  findOne(@Args('classroomid', { type: () => Int }) classroomid: number) {
    return this.studentClassroomService.findOne(classroomid);
  }

  @Mutation(() => StudentClassroom)
  updateStudentClassroom(@Args('updateStudentClassroomInput') updateStudentClassroomInput: UpdateStudentClassroomInput) {
    return this.studentClassroomService.update(updateStudentClassroomInput.student_classroom_id, updateStudentClassroomInput);
  }

  @Mutation(() => StudentClassroom)
  removeStudentClassroom(@Args('student_classroom_id', { type: () => Int }) student_classroom_id: number) {
    return this.studentClassroomService.remove(student_classroom_id);
  }
}
