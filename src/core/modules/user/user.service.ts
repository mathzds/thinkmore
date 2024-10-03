import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { AppDataSource } from 'src/app/database/handle.database';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const user = await AppDataSource.manager.findOne(User, {
      where: {
        email: createUserDto.email
      }
    })

    if (user) {
      return { message: 'User already exists' }
    } else {
      const newUser = AppDataSource.manager.create(User, createUserDto)
      await AppDataSource.manager.save(newUser)
      return { message: "User created" }
    }
  }

  findAll() {
    const allUsers = AppDataSource.manager.find(User)

    return allUsers.then((users) => {
      return users.map((user) => {
        return {
          id: user.id,
          publicId: user.publicId,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      })
    })
  }

  findOne(idOrEmail: number | { email: string }) {
    if (typeof idOrEmail === 'number') {
      return AppDataSource.manager.findOne(User, { where: { id: idOrEmail } });
    } else {
      return AppDataSource.manager.findOne(User, { where: { email: idOrEmail.email } });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) return { message: "User id not found" };


    if (updateUserDto.email) {
      const userEmail = await AppDataSource.manager.findOne(User, { where: { email: updateUserDto.email } });
      if (userEmail && userEmail.id !== id) {
        return { message: "Email already exists" };
      }
    }

    await AppDataSource.manager.update(User, id, updateUserDto);
    return { message: "User updated" };
  }

  remove(id: number) {
    return AppDataSource.manager.delete(User, id)
  }


  login() {
    return { message: "Login" }
  }
}
