import { Module } from '@nestjs/common';
import { PrefixService } from './prefix.service';
import { PrefixResolver } from './prefix.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prefix } from './entities/prefix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prefix])],
  providers: [PrefixResolver, PrefixService],
})
export class PrefixModule {}
