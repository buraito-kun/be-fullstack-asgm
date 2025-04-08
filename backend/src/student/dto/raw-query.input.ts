import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Student } from "../entities/student.entity";
import { Gender } from "src/gender/entities/gender.entity";

@ObjectType()
class CustomClassroom {
  @Field(()=>Int, {nullable: true})
  classroomid?: number;

  @Field(()=>String, {nullable: true})
  homeroom_teacher?: string;

  @Field(()=>String, {nullable: true})
  classname?: string;
  
  @Field(()=>Int, {nullable: true})
  academic_year?: number;
}

@ObjectType()
export class RawQuery {
  @Field(()=>Student)
  student: Student

  @Field(()=>Gender)
  gender: Gender

  @Field(()=>CustomClassroom, {nullable: true})
  classroom?: {
    classroomid?: number;
    homeroom_teacher?: string;
    classname?: string;
    academic_year?: number;
  }
}
