import { HttpException, HttpStatus } from "@nestjs/common";

export default class ExceptionsCommon {

    static uniqueConstraint(error: any) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            throw new HttpException("Email already exist", HttpStatus.BAD_REQUEST)
        }
    }
}