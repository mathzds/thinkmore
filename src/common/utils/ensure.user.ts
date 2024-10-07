import { HttpException, HttpStatus } from "@nestjs/common";
import { UserEntity as User } from "../entities/user.entity";

export default function ensureUser(user: User | null): User {
    if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
}
