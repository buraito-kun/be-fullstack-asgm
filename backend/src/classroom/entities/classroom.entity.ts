import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StudentClassroom } from 'src/student_classroom/entities/student_classroom.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Classroom {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'The classroom id' })
  classroomid?: number;

  @Column('varchar', { length: 100, nullable: false })
  @Field(() => String, { description: 'The homeroom teacher name' })
  homeroom_teacher: string;

  @Column('varchar', { length: 50, nullable: false })
  @Field(() => String, { description: 'The classroom name' })
  classname: string;

  @Column('year', { nullable: false })
  @Field(() => Int, { description: 'The classroom year' })
  academic_year: number;

  @OneToMany(
    (type) => StudentClassroom,
    (student_classroom) => student_classroom.classroomid,
  )
  student_classroom: StudentClassroom[];
}
