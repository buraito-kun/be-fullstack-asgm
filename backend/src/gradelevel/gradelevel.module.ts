import { Module } from '@nestjs/common';
import { GradelevelService } from './gradelevel.service';
import { GradelevelResolver } from './gradelevel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gradelevel } from './entities/gradelevel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gradelevel])],
  providers: [GradelevelResolver, GradelevelService],
})
export class GradelevelModule {}
