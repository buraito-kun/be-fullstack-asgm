import { Test, TestingModule } from '@nestjs/testing';
import { StudentClassroomResolver } from './student_classroom.resolver';
import { StudentClassroomService } from './student_classroom.service';

describe('StudentClassroomResolver', () => {
  let resolver: StudentClassroomResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentClassroomResolver, StudentClassroomService],
    }).compile();

    resolver = module.get<StudentClassroomResolver>(StudentClassroomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
