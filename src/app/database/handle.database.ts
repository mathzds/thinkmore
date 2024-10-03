import "reflect-metadata"
import { DataSource } from "typeorm"

import { Think } from "src/core/modules/think/entities/think.entity"
import { User } from "src/core/modules/user/entities/user.entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Think, User],
    migrations: ["src/database/migrations/*{.ts}"],
    subscribers: [],
    migrationsRun: true    
})

export const handleDatabase = async () => {
    await AppDataSource.initialize()
}