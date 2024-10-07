import { IsNotEmpty, IsString } from "class-validator"

export class ThinksDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    content: string

}
