import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Think } from "../../think/entities/think.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int", default: 0, unique: true })
    publicId: number

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "varchar", length: 255, unique: true })
    email: string

    @Column({ type: "varchar", length: 255 })
    password: string

    @Column({ type: "varchar", length: 255 })
    role: "member"

    @OneToMany(() => Think, (think) => think.user)
    thinks: Think[]
}