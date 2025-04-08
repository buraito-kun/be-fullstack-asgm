import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderResolver } from './gender.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  providers: [GenderResolver, GenderService],
})
export class GenderModule {}
