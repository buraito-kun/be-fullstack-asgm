import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Gradelevel {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'The grade level id' })
  gradelevelid?: number;

  @Column('varchar', { length: 10, nullable: false })
  @Field(() => String, { description: 'The grade level name' })
  levelname: string;
}
