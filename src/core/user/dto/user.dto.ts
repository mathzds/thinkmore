import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Roles } from "../entities/user.entity"

export class UserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsOptional()
    role: Roles
}
