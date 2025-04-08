import { Injectable, Logger } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Gender } from 'src/gender/entities/gender.entity';
import { Gradelevel } from 'src/gradelevel/entities/gradelevel.entity';
import { Prefix } from 'src/prefix/entities/prefix.entity';

@Injectable()
export class StudentService {
  private logger = new Logger();

  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentInput: CreateStudentInput) {
    try {
      const student = await this.studentRepository
        .createQueryBuilder()
        .insert()
        .into(Student)
        .values(createStudentInput)
        .execute();
      return {
        ...createStudentInput,
        studentid: student.identifiers[0].studentid,
      };
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  async findAll(search: string, limit: number, page: number) {
    try {
      const count = await this.studentRepository.createQueryBuilder("student")
      .innerJoin(Gradelevel, "gradelevel", "student.gradelevelid = gradelevel.gradelevelid")
      .where(`student.firstname LIKE "%${search}%" OR student.lastname LIKE "%${search}%" OR student.studentid LIKE "%${search}%" OR gradelevel.levelname LIKE "%${search}%"`)
      .getCount();
      const students = await this.studentRepository.query(
        `
        SELECT * 
        FROM \`student\` \`student\` 
        INNER JOIN prefix 
        INNER JOIN gradelevel 
        INNER JOIN gender 
        ON student.prefixid = prefix.prefixid 
        AND student.gradelevelid = gradelevel.gradelevelid 
        AND student.genderid = gender.genderid
        WHERE student.firstname LIKE ?
        OR student.lastname LIKE ?
        OR student.studentid LIKE ?
        OR gradelevel.levelname LIKE ?
        ORDER BY student.studentid ASC
        LIMIT ?
        OFFSET ?
        `,
        ["%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", limit, (page-1)*limit],
      );
      return students.map(
        (student: Student & Gender & Gradelevel & Prefix) => ({
          student: {
            studentid: student.studentid,
            prefixid: student.prefixid,
            genderid: student.genderid,
            gradelevelid: student.gradelevelid,
            firstname: student.firstname,
            lastname: student.lastname,
            birthdate: student.birthdate.toISOString(),
          },
          gender: {
            genderid: student.genderid,
            gendername: student.gendername,
          },
          gradelevel: {
            gradelevelid: student.gradelevelid,
            levelname: student.levelname,
          },
          prefix: {
            prefixid: student.prefixid,
            prefixname: student.prefixname,
          },
          allPage: count
        }),
      );
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  async findOne(studentid: number) {
    try {
      const student: [Student & Gender & Gradelevel & Prefix] =
        await this.studentRepository.query(
          `
        SELECT * 
        FROM \`student\` \`student\` 
        INNER JOIN prefix 
        INNER JOIN gradelevel 
        INNER JOIN gender 
        ON student.prefixid = prefix.prefixid 
        AND student.gradelevelid = gradelevel.gradelevelid 
        AND student.genderid = gender.genderid
        WHERE student.studentid = ?
        `,
          [studentid],
        );
      return {
        student: {
          studentid: student[0].studentid,
          prefixid: student[0].prefixid,
          genderid: student[0].genderid,
          gradelevelid: student[0].gradelevelid,
          firstname: student[0].firstname,
          lastname: student[0].lastname,
          birthdate: student[0].birthdate.toISOString(),
        },
        gender: {
          genderid: student[0].genderid,
          gendername: student[0].gendername,
        },
        gradelevel: {
          gradelevelid: student[0].gradelevelid,
          levelname: student[0].levelname,
        },
        prefix: {
          prefixid: student[0].prefixid,
          prefixname: student[0].prefixname,
        },
      };
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  async rawQuery() {
    try{
      const students = await this.studentRepository.query(`
        SELECT *, student.studentid AS sID
        FROM student
        INNER JOIN gender ON student.genderid = gender.genderid
        LEFT JOIN student_classroom ON student.studentid = student_classroom.studentid
        LEFT JOIN classroom ON student_classroom.classroomid = classroom.classroomid
        WHERE gender.gendername = "ชาย" AND YEAR(now())-YEAR(birthdate) BETWEEN 10 AND 12
        `)
      
      return students.map((student: {
        sID: number,
        prefixid: number,
        genderid: number,
        gradelevelid: number,
        firstname: string,
        lastname: string,
        birthdate: Date,
        gendername: string,
        classroomid: number,
        homeroom_teacher: string,
        classname: string,
        academic_year: number
      })=>({
        student: {
          studentid: student.sID,
          prefixid: student.prefixid,
          genderid: student.genderid,
          gradelevelid: student.gradelevelid,
          firstname: student.firstname,
          lastname: student.lastname,
          birthdate: student.birthdate.toISOString(),
        },
        gender: {
          genderid: student.genderid,
          gendername: student.gendername
        },
        classroom: {
          classroomid: student.classroomid,
          homeroom_teacher: student.homeroom_teacher,
          classname: student.classname,
          academic_year: student.academic_year
        }
      }))
    }catch(err){
      this.logger.error(err.message);
    }
  }

  async update(studentid: number, updateStudentInput: UpdateStudentInput) {
    try {
      const student = await this.studentRepository.findOne({
        where: { studentid },
      });
      // update student data
      updateStudentInput.prefixid
        ? (student.prefixid = updateStudentInput.prefixid)
        : null;
      updateStudentInput.genderid
        ? (student.genderid = updateStudentInput.genderid)
        : null;
      updateStudentInput.gradelevelid
        ? (student.gradelevelid = updateStudentInput.gradelevelid)
        : null;
      updateStudentInput.firstname
        ? (student.firstname = updateStudentInput.firstname)
        : null;
      updateStudentInput.lastname
        ? (student.lastname = updateStudentInput.lastname)
        : null;
      updateStudentInput.birthdate
        ? (student.birthdate = new Date(updateStudentInput.birthdate))
        : null;

      await this.studentRepository.save(student);
      return student;
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  async remove(studentid: number) {
    try {
      const student = await this.studentRepository.findOne({
        where: { studentid },
      });
      await this.studentRepository.remove(student);
      return { ...student, studentid };
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
