import { Int, Field, ObjectType } from '@nestjs/graphql';
import { Classroom } from '../entities/classroom.entity';

@ObjectType()
export class ClassroomCount {
  @Field(() => Classroom)
  classroom: Classroom;

  @Field(() => Int)
  allPage: number;
}
