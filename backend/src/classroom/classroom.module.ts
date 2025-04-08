import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomResolver } from './classroom.resolver';
import { Classroom } from './entities/classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom])],
  providers: [ClassroomResolver, ClassroomService],
})
export class ClassroomModule {}
