import { Test, TestingModule } from '@nestjs/testing';
import { GradelevelService } from './gradelevel.service';

describe('GradelevelService', () => {
  let service: GradelevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradelevelService],
    }).compile();

    service = module.get<GradelevelService>(GradelevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
