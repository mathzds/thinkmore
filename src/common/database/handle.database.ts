import "reflect-metadata"
import { DataSource } from "typeorm"

import { User } from "src/core/user/entities/user.entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User],
})

export const handleDatabase = async () => {
    await AppDataSource.initialize()
}