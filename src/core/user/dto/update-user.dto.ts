import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Roles } from "../../../common/entities/user.entity"

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    role: Roles
}
