import { Injectable, Logger } from '@nestjs/common';
import { CreateGenderInput } from './dto/create-gender.input';
import { UpdateGenderInput } from './dto/update-gender.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  private logger = new Logger()

  constructor(@InjectRepository(Gender) private genderRepository: Repository<Gender>) {}

  create(createGenderInput: CreateGenderInput) {
    return 'This action adds a new gender';
  }

  async findAll() {
    try{
      const gender = await this.genderRepository.createQueryBuilder().getMany()
      return gender
    }
    catch (err){
      this.logger.error(err.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} gender`;
  }

  update(id: number, updateGenderInput: UpdateGenderInput) {
    return `This action updates a #${id} gender`;
  }

  remove(id: number) {
    return `This action removes a #${id} gender`;
  }
}
