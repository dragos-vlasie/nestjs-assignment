import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsEntity } from './cats.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatsEntity)
    private readonly catsRepository: Repository<CatsEntity>,
  ) { }

  async getOneById(id: number): Promise<CatsEntity> {
    const cat = await this.catsRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }

  async create(cat: Cat) {
    return await this.catsRepository.save(cat);
  }

  async findAll(): Promise<CatsEntity[]> {
    return this.catsRepository.find();
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<CatsEntity> {
    const cat = await this.getOneById(id);
    // Update cat properties based on updateCatDto
    if (updateCatDto.name) cat.name = updateCatDto.name;
    if (updateCatDto.breed) cat.breed = updateCatDto.breed;
    if (updateCatDto.age) cat.age = updateCatDto.age;
    // Save the updated cat
    return this.catsRepository.save(cat);
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }


}