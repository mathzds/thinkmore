import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class ThinkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.thinks, { onDelete: 'CASCADE' })
    user: UserEntity;

    @Column({ type: "varchar", length: 100 })
    title: string;

    @Column({ type: "varchar", length: 100 })
    description: string;

    @Column({ type: "varchar" })
    content: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "datetime", nullable: true })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}