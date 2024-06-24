import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {List} from "../../list/entities/list.entity";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    term: Date;

    @Column()
    priority: string;

    @ManyToOne(() => List, (list) => list.tasks)
    @JoinColumn({name: 'listId'})
    list: List;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}