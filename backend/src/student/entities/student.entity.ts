import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StudentClassroom } from 'src/student_classroom/entities/student_classroom.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Student {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'The student id' })
  studentid?: number;

  @Column('int', { nullable: false })
  @Field(() => Int, { description: 'The prefix id' })
  prefixid: number;

  @Column('int', { nullable: false })
  @Field(() => Int, { description: 'The gender id' })
  genderid: number;

  @Column('int', { nullable: false })
  @Field(() => Int, { description: 'The grade level id' })
  gradelevelid: Number;

  @Column('varchar', { length: 50, nullable: false })
  @Field(() => String, { description: 'The student first name' })
  firstname: string;

  @Column('varchar', { length: 50, nullable: false })
  @Field(() => String, { description: 'The student last name' })
  lastname: string;

  @Column('date', { nullable: true, default: null })
  @Field(() => String, { description: 'The student birthdate' })
  birthdate?: Date;

  @OneToMany(
    (type) => StudentClassroom,
    (student_classroom) => student_classroom.studentid,
    { nullable: false },
  )
  student_classroom: StudentClassroom[];
}
