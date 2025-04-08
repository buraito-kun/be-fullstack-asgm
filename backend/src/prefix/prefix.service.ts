import { Injectable, Logger } from '@nestjs/common';
import { CreatePrefixInput } from './dto/create-prefix.input';
import { UpdatePrefixInput } from './dto/update-prefix.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Prefix } from './entities/prefix.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrefixService {
  private logger = new Logger()

  constructor(@InjectRepository(Prefix) private prefixRepository: Repository<Prefix>) {}
  
  create(createPrefixInput: CreatePrefixInput) {
    return 'This action adds a new prefix';
  }

  async findAll() {
    try{
      const prefixs = await this.prefixRepository.createQueryBuilder().getMany()
      return prefixs
    }catch(err){
      this.logger.error(err.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} prefix`;
  }

  update(id: number, updatePrefixInput: UpdatePrefixInput) {
    return `This action updates a #${id} prefix`;
  }

  remove(id: number) {
    return `This action removes a #${id} prefix`;
  }
}
