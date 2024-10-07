import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ThinkEntity } from "./thinks.entity";

export enum Roles {
    member = "member",
    admin = "super"
}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar", default: Roles.member })
    role: Roles;

    @OneToMany(() => ThinkEntity, (think) => think.user)
    thinks: ThinkEntity[];

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "datetime", nullable: true })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}