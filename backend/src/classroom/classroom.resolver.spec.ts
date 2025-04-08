import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomResolver } from './classroom.resolver';
import { ClassroomService } from './classroom.service';

describe('ClassroomResolver', () => {
  let resolver: ClassroomResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassroomResolver, ClassroomService],
    }).compile();

    resolver = module.get<ClassroomResolver>(ClassroomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
