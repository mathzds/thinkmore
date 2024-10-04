import { IsNotEmpty, IsString } from "class-validator";

export class CreateThinkDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
