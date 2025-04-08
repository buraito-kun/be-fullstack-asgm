import { Injectable, Logger } from '@nestjs/common';
import { CreateGradelevelInput } from './dto/create-gradelevel.input';
import { UpdateGradelevelInput } from './dto/update-gradelevel.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Gradelevel } from './entities/gradelevel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradelevelService {
  private logger = new Logger()

  constructor(@InjectRepository(Gradelevel) private gradelevelRepository: Repository<Gradelevel>) {}

  create(createGradelevelInput: CreateGradelevelInput) {
    return 'This action adds a new gradelevel';
  }

  async findAll() {
    try{
      const gradelevels = await this.gradelevelRepository.createQueryBuilder().getMany()
      return gradelevels
    }
    catch (err){
      this.logger.error(err.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} gradelevel`;
  }

  update(id: number, updateGradelevelInput: UpdateGradelevelInput) {
    return `This action updates a #${id} gradelevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} gradelevel`;
  }
}
