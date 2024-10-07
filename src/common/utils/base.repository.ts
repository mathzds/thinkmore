import { AppDataSource } from "src/common/database/handle.database";
import { Repository, FindOptionsWhere, FindManyOptions } from "typeorm";

interface BaseEntity {
    id: number;
    email?: string
}

export abstract class BaseRepository<T extends BaseEntity> {
    protected readonly database: Repository<T>;

    constructor(private readonly entity: new () => T) {
        this.database = AppDataSource.getRepository<T>(this.entity);
    }

    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.database.find(options);
    }

    async findOneById(id: number): Promise<T | null> {
        return this.database.findOneBy({ id } as FindOptionsWhere<T>);
    }

    async findOneByEmail(email: string): Promise<T | null> {
        return this.database.findOneBy({ email } as FindOptionsWhere<T>);
    }

    async create(data: Partial<T>): Promise<T> {
        const instance = Object.assign(new this.entity(), data);
        return this.database.save(instance);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const instance = await this.findOneById(id);
        if (!instance) return null;
        Object.assign(instance, data);
        return this.database.save(instance);
    }

    async delete(id: number): Promise<void> {
        await this.database.delete(id);
    }
}
