import { Injectable, Logger } from '@nestjs/common';
import { CreateStudentClassroomInput } from './dto/create-student_classroom.input';
import { UpdateStudentClassroomInput } from './dto/update-student_classroom.input';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentClassroom } from './entities/student_classroom.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';

@Injectable()
export class StudentClassroomService {
  private logger = new Logger();

  constructor(
    @InjectRepository(StudentClassroom)
    private studentClassroomRepository: Repository<StudentClassroom>,
  ) {}

  async create(createStudentClassroomInput: CreateStudentClassroomInput) {
    try{
      const studentClassroom = await this.studentClassroomRepository.createQueryBuilder()
      .insert()
      .into(StudentClassroom)
      .values(createStudentClassroomInput)
      .execute()
      return {
        ...createStudentClassroomInput,
        student_classroom_id: studentClassroom.identifiers[0].student_classroom_id
      }
    }catch(err){
      this.logger.error(err);
    }
  }

  findAll() {
    return `This action returns all studentClassroom`;
  }

  async findOne(classroomid: number) {
    try{
      const studentClassroom = await this.studentClassroomRepository.query(`
        SELECT * FROM student_classroom INNER JOIN student ON student.studentid = student_classroom.studentid
        INNER JOIN classroom ON classroom.classroomid = student_classroom.classroomid
        WHERE student_classroom.classroomid = ${classroomid}
        `)
      
      return studentClassroom.map((data)=>({
        studentClassroom: {
          student_classroom_id: data.student_classroom_id,
          studentid: data.studentid,
          classroomid: data.classroomid
        },
        student: {
          studentid: data.studentid,
          prefixid: data.prefixid,
          genderid: data.genderid,
          gradelevelid: data.gradelevelid,
          firstname: data.firstname,
          lastname: data.lastname,
          birthdate: data.birthdate.toISOString()
        },
        classroom: {
          classroomid: data.classroomid,
          homeroom_teacher: data.homeroom_teacher,
          classname: data.classname,
          academic_year: data.academic_year
        }
      }))
    }catch(err){
      this.logger.error(err);
    }
  }

  update(student_classroom_id: number, updateStudentClassroomInput: UpdateStudentClassroomInput) {
    return `This action updates a #${student_classroom_id} studentClassroom`;
  }

  async remove(student_classroom_id: number) {
    try{
      const studentClassroom = await this.studentClassroomRepository.findOne({
        where: { student_classroom_id },
      });
      await this.studentClassroomRepository.remove(studentClassroom);
      return { ...studentClassroom, student_classroom_id };
    }
    catch(err){
      this.logger.error(err);
    }
  }
}
