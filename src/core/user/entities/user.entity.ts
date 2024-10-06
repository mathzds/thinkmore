import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export enum Roles {
    member = "member",
    admin = "super"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    name: string

    @Column({ type: "varchar", unique: true })
    email: string

    @Column({ type: "varchar", default: "member" })
    role: Roles

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "datetime", nullable: true })
    updatedAt: Date

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date()
    }
}

