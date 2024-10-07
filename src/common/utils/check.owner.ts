import { HttpException, HttpStatus } from "@nestjs/common";
import { ThinkEntity as Thinks } from "../entities/thinks.entity";

export default function checkOwner(owner: number, think: Thinks) {
    if (!think) {
        throw new HttpException('Think not found', HttpStatus.NOT_FOUND);
    }
    if (think.user.id !== owner) {
        throw new HttpException('Not authorized', HttpStatus.FORBIDDEN);
    }
}