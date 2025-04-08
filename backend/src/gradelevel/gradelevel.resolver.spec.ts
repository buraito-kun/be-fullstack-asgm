import { Test, TestingModule } from '@nestjs/testing';
import { GradelevelResolver } from './gradelevel.resolver';
import { GradelevelService } from './gradelevel.service';

describe('GradelevelResolver', () => {
  let resolver: GradelevelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradelevelResolver, GradelevelService],
    }).compile();

    resolver = module.get<GradelevelResolver>(GradelevelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
