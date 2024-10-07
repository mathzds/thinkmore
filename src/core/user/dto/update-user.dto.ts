import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Roles, UserEntity } from "../../../common/entities/user.entity"
import { PartialType } from "@nestjs/mapped-types"

export class UpdateUserDto extends PartialType(UserEntity) {
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
