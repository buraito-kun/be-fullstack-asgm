import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConfigModule } from './db-config/db-config.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { StudentModule } from './student/student.module';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentClassroomModule } from './student_classroom/student_classroom.module';
import { GenderModule } from './gender/gender.module';
import { GradelevelModule } from './gradelevel/gradelevel.module';
import { PrefixModule } from './prefix/prefix.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
    }),
    DbConfigModule,
    StudentModule,
    ClassroomModule,
    StudentClassroomModule,
    GenderModule,
    GradelevelModule,
    PrefixModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
