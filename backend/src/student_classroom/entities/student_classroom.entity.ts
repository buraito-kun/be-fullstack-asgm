import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { Student } from 'src/student/entities/student.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class StudentClassroom {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'The student classroom id' })
  student_classroom_id?: number;

  @ManyToOne((type) => Student, (student) => student.studentid, {
    nullable: false,
  })
  @JoinColumn({ name: 'studentid' })
  @Field(() => Int, { description: 'The student id' })
  studentid: number;

  @ManyToOne((type) => Classroom, (classroom) => classroom.classroomid, {
    nullable: false,
  })
  @JoinColumn({ name: 'classroomid' })
  @Field(() => Int, { description: 'The classroom id' })
  classroomid: number;
}
