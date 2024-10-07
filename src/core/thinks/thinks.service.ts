import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThinksDto } from './dto/think';
import { UpdateThinkDto } from './dto/update-think.dto';
import { BaseRepository } from 'src/common/utils/base.repository';

import { ThinkEntity as Thinks } from 'src/common/entities/thinks.entity';
import { UserEntity } from 'src/common/entities/user.entity';
import checkOwner from 'src/common/utils/check.owner';

@Injectable()
export class ThinksService extends BaseRepository<Thinks> {
  constructor() {
    super(Thinks)
  }

  async createThink(createThinkDto: ThinksDto, user: UserEntity): Promise<Thinks> {
    return await this.create({ ...createThinkDto, user })
  }

  async findAllThink(): Promise<Thinks[]> {
    return await this.findAll({
      relations: ['user'],
    });
  }

  async findOneThink(id: number): Promise<Thinks | null> {
    return await this.database.findOne({ where: { id }, relations: ['user'] });
  }

  async updateThink(owner: number, id: number, updateThinkDto: UpdateThinkDto): Promise<Thinks> {
    const think = await this.findOneThink(id);
    checkOwner(owner, think);

    Object.assign(think, updateThinkDto);
    return await this.update(think.id, think);
  }

  async removeThink(owner: number, id: number): Promise<void> {
    const think = await this.findOneThink(id);

    checkOwner(owner, think);
    await this.delete(id);
  }
}
