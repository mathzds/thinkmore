import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import ExceptionsCommon from 'src/common/exceptions/exceptions.common';
import { BaseRepository } from 'src/common/utils/base.repository';

import { UserEntity as User } from '../../common/entities/user.entity';
import ensureUser from 'src/common/utils/ensure.user';

@Injectable()
export class UserService extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async createUser(data: UserDto): Promise<User> {
    try {
      return await this.create(data);
    } catch (error) {
      throw ExceptionsCommon.uniqueConstraint(error);
    }
  }

  async updateUser(id: number, data: UserDto): Promise<User | null> {
    try {
      return this.update(id, data);
    } catch (error) {
      throw ExceptionsCommon.uniqueConstraint(error);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      throw ExceptionsCommon.uniqueConstraint(error);
    }
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return ensureUser(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.findOneByEmail(email);
    return ensureUser(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.findAll();
  }
}
