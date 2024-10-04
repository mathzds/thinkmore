import { IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Type as TypeDecorator } from "class-transformer"
import { Think } from "../../think/entities/think.entity"

export class CreateUserDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsOptional()
    @IsInt()
    publicId?: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    role: "member"

    @IsOptional()
    @TypeDecorator(() => Date)
    createdAt?: Date

    @IsOptional()
    @IsArray()
    @TypeDecorator(() => Think)
    thinks?: Think[]
}
