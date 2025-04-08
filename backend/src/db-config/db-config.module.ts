import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Gradelevel } from 'src/gradelevel/entities/gradelevel.entity';
import { Prefix } from 'src/prefix/entities/prefix.entity';
import { Student } from 'src/student/entities/student.entity';
import { StudentClassroom } from 'src/student_classroom/entities/student_classroom.entity';
config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.HOST_DB,
        port: parseInt(process.env.PORT_DB),
        username: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: 'quizdev_bb',
        entities: [
          Classroom,
          Gender,
          Gradelevel,
          Prefix,
          Student,
          StudentClassroom,
        ],
        synchronize: false,
        retryAttempts: 10,
        retryDelay: 3000,
        autoLoadEntities: true,
        poolSize: 50,
        timezone: "+00:00"
      }),
    }),
  ],
})
export class DbConfigModule {}
