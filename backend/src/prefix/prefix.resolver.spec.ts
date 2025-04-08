import { Test, TestingModule } from '@nestjs/testing';
import { PrefixResolver } from './prefix.resolver';
import { PrefixService } from './prefix.service';

describe('PrefixResolver', () => {
  let resolver: PrefixResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrefixResolver, PrefixService],
    }).compile();

    resolver = module.get<PrefixResolver>(PrefixResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
