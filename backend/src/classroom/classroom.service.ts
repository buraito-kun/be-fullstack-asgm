import { Injectable, Logger } from '@nestjs/common';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomService {
  private logger = new Logger();

  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
  ) {}

  async create(createClassroomInput: CreateClassroomInput) {
    try {
      const classroom = await this.classroomRepository
        .createQueryBuilder()
        .insert()
        .into(Classroom)
        .values(createClassroomInput)
        .execute();
      return {
        ...createClassroomInput,
        classroomid: classroom.identifiers[0].classroomid,
      };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async findAll(search: string, limit: number, page: number) {
    try {
      const [classrooms, count] = await this.classroomRepository
        .createQueryBuilder()
        .where("classroomid LIKE :search", { search: `%${search}%`})
        .orWhere("homeroom_teacher LIKE :search", { search: `%${search}%`})
        .orWhere("classname LIKE :search", { search: `%${search}%`})
        .limit(limit)
        .offset((page-1)*limit)
        .getManyAndCount();
      
      return classrooms.map((classroom)=>({
        classroom: {
          classroomid: classroom.classroomid,
          homeroom_teacher: classroom.homeroom_teacher,
          classname: classroom.classname,
          academic_year: classroom.academic_year,
        },
        allPage: count
      }));
    } catch (err) {
      this.logger.error(err);
    }
  }

  async findOne(classroomid: number) {
    try {
      const classroom = await this.classroomRepository.findOne({
        where: { classroomid },
      });
      return classroom;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async update(
    classroomid: number,
    updateClassroomInput: UpdateClassroomInput,
  ) {
    try {
      const classroom = await this.classroomRepository.findOne({
        where: { classroomid },
      });
      // update classroom data
      updateClassroomInput.homeroom_teacher
        ? (classroom.homeroom_teacher = updateClassroomInput.homeroom_teacher)
        : null;
      updateClassroomInput.classname
        ? (classroom.classname = updateClassroomInput.classname)
        : null;
      updateClassroomInput.academic_year
        ? (classroom.academic_year = updateClassroomInput.academic_year)
        : null;

      await this.classroomRepository.save(classroom);
      return classroom;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async remove(classroomid: number) {
    try {
      const classroom = await this.classroomRepository.findOne({
        where: { classroomid },
      });
      await this.classroomRepository.remove(classroom);
      return { ...classroom, classroomid };
    } catch (err) {
      this.logger.error(err);
    }
  }
}
