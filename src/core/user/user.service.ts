import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import ExceptionsCommon from 'src/common/exceptions/exceptions.common';
import { BaseRepository } from 'src/common/utils/base.repository';

import { UserEntity as User } from '../../common/entities/user.entity';

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
    try {
      return this.update(id, data);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw ExceptionsCommon.uniqueConstraint();
      }
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw ExceptionsCommon.uniqueConstraint();
      }
      throw error
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      return this.findOneById(id);
    } catch (error) {
      throw error
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return this.findOneByEmail(email);
    } catch (error) {
      throw error
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return this.findAll();
    } catch (error) {
      throw error
    }
  }
}
