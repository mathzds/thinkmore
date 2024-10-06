import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import ExceptionsCommon from 'src/common/exceptions/exceptions.common';
import { BaseRepository } from 'src/common/utils/base.repository';

@Injectable()
export class UserService extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async createUser(data: UserDto): Promise<User> {
    try {
      return await this.create(data);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw ExceptionsCommon.uniqueConstraint();
      }
      throw error;
    }
  }

  async updateUser(id: number, data: UserDto): Promise<User | null> {
    return this.update(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.findOneById(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.findOneByEmail(email);
  }

  async findAllUsers(): Promise<User[]> {
    return this.findAll();
  }
}
