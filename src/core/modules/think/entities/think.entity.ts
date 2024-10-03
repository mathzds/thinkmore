import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";


@Entity()
export class Think {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 255 })
    title: string

    @Column({ type: "varchar", length: 3000 })
    content: string

    @ManyToOne(() => User, (user) => user.thinks)
    user: User

    // @OneToMany(() => ResponseModel, (response) => response.tought)
    // responses!: ResponseModel[];

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date

    @Column({ type: "datetime", nullable: true })
    deletedAt: Date
}
