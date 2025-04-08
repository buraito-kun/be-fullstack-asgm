import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from '../entities/student.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Gradelevel } from 'src/gradelevel/entities/gradelevel.entity';
import { Prefix } from 'src/prefix/entities/prefix.entity';

@ObjectType()
export class StudentJoin {
  @Field(() => Student)
  student: Student;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => Gradelevel)
  gradelevel: Gradelevel;

  @Field(() => Prefix)
  prefix: Prefix;
}
