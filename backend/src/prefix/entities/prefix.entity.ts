import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Prefix {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'The prefix id' })
  prefixid?: number;

  @Column('varchar', { length: 10, nullable: false })
  @Field(() => String, { description: 'The prefix name' })
  prefixname: string;
}
