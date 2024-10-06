import { HttpException, HttpStatus } from "@nestjs/common";

export default class ExceptionsCommon {

    static uniqueConstraint() {
        throw new HttpException("Email already exist", HttpStatus.BAD_REQUEST)
    }
}