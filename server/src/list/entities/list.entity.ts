import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Tasks} from "../../tasks/entities/tasks.entity";

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Tasks, (task) => task.list , {onDelete: "CASCADE"})
    tasks: Tasks[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}