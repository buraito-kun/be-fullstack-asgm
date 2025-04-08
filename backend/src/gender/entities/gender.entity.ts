import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Gender {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'The gender id' })
  genderid?: number;

  @Column('varchar', { length: 10, nullable: false })
  @Field(() => String, { description: 'The gender name' })
  gendername: string;
}
