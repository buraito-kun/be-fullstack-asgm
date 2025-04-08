import { Test, TestingModule } from '@nestjs/testing';
import { StudentClassroomService } from './student_classroom.service';

describe('StudentClassroomService', () => {
  let service: StudentClassroomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentClassroomService],
    }).compile();

    service = module.get<StudentClassroomService>(StudentClassroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
