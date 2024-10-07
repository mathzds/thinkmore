import "reflect-metadata"
import { DataSource } from "typeorm"

import { UserEntity as User } from "src/common/entities/user.entity"
import { ThinkEntity as Think } from "../entities/thinks.entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User, Think],
})

export const handleDatabase = async () => {
    await AppDataSource.initialize()
}