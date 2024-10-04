import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateThinkDto } from './dto/create-think.dto';
import { UpdateThinkDto } from './dto/update-think.dto';
import { Think } from './entities/think.entity';
import { AppDataSource } from 'src/app/database/handle.database';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ThinkService {
  constructor(private readonly jwtService: JwtService) { }

  async decodeToken(token: string): Promise<number> {
    const decoded = this.jwtService.verify(token);
    return decoded.sub;
  }

  async create(createThinkDto: CreateThinkDto, userId: number) {
    const think = AppDataSource.manager.create(Think, {
      user: { id: userId },
      ...createThinkDto
    });
    return AppDataSource.manager.save(Think, think);
  }

  async findAll() {
    return AppDataSource.manager.find(Think);
  }

  async findOne(id: number) {
    const think = await AppDataSource.manager.findOne(Think, { where: { id } });
    if (!think) {
      throw new NotFoundException(`Think with ID ${id} not found`);
    }
    return think;
  }

  async findOneOfUser(userId: number) {
    const think = await AppDataSource.manager.find(Think, { where: { user: { id: userId } } });
    if (!think) {
      throw new NotFoundException(`Think with userId ${userId} not found`);
    }
    return think;
  }

  async update(id: number, userId: number, updateThinkDto: UpdateThinkDto) {
    const think = await AppDataSource.manager.findOne(Think, { where: { id } });

    if (!think) return { message: `Not found` };
    if (think.user.id !== userId) return { message: `Unauthorized` };

    await AppDataSource.manager.update(Think, id, updateThinkDto);
    return { ...think, ...updateThinkDto };
  }

  async remove(id: number, userId: number) {
    const think = await AppDataSource.manager.findOne(Think, { where: { id } });
    if (!think) return { message: `Not found` };
    if (think.user.id !== userId) return { message: `Unauthorized` };

    await AppDataSource.manager.delete(Think, id);
    return { message: `Think with ID ${id} removed` };
  }
}
