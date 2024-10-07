import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThinksDto } from './dto/think';
import { UpdateThinkDto } from './dto/update-think.dto';
import { BaseRepository } from 'src/common/utils/base.repository';

import { ThinkEntity as Thinks } from 'src/common/entities/thinks.entity';
import { UserEntity } from 'src/common/entities/user.entity';

@Injectable()
export class ThinksService extends BaseRepository<Thinks> {
  constructor() {
    super(Thinks)
  }

  async createThink(createThinkDto: ThinksDto, user: UserEntity): Promise<Thinks> {
    const think = await this.create({
      ...createThinkDto,
      user
    })
    return await this.create(think)
  }

  async findAllThink(): Promise<Thinks[]> {
    return await this.findAll({
      relations: ['user'],
    });
  }

  async findOneThink(id: number): Promise<Thinks | null> {
    const think = await this.database.findOne({
      where: { id },
      relations: ['user'],
    });

    return think || null;
  }

  async updateThink(owner: number, id: number, updateThinkDto: UpdateThinkDto): Promise<Thinks | string> {
    const think = await this.findOneThink(id);

    if (!think) {
      throw new HttpException('Think not found', HttpStatus.NOT_FOUND);
    }

    if (think.user.id !== owner) {
      throw new HttpException('Not authorized', HttpStatus.FORBIDDEN);
    }

    Object.assign(think, updateThinkDto);
    const updatedThink = await this.update(think.id, think);

    return updatedThink;
  }

  async removeThink(owner: number, id: number): Promise<void> {
    const think = await this.findOneThink(id);

    if (!think) {
        throw new HttpException('Think not found', HttpStatus.NOT_FOUND);
    }

    if (!think.user || think.user.id !== owner) {
        throw new HttpException('Not authorized', HttpStatus.FORBIDDEN);
    }

    await this.delete(id);
}

}
